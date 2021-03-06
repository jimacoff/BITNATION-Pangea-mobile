/* eslint-disable */
// TODO: Convert this to typescript per Mark and launch using ts-node

const fs = require('fs');
const os = require('os');
const nodeutil = require('util'); // prefixed with node as 'utils' is our own utils script
const process = require('process');
const childProcess = require('child_process');
const readline = require('readline');
const utils = require('../lib/utils');

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

const DIR = __dirname;

//Sanity check
utils.RunShellScript('check-env.sh', 'run single adb_present');
utils.RunShellScript('check-env.sh', 'run single android_home');
utils.RunShellScript('check-env.sh', 'run single dev_config');
utils.RunShellScript('check-env.sh', 'run single env_config');

const statusFilePath = `${utils.RepositoryRootDir}/data/android-status.json`;
cfg = utils.GetDevConfig().launcher;
androidcfg = cfg.android;

class StatusDoc {
    constructor() {
        this.timeLaunched = Date.now();
        this.appPid = 0;
    }
}



// List of sub processes kept for proper cleanup
const children = {};

async function asyncPoint(ms, callback = () => {}) {
  return await new Promise(resolve => setTimeout(() => {
    resolve(callback());
  }, ms));
}

async function sighandle() {
    console.log(os.EOL + 'Closing...');
    Object.values(children).forEach(child => child.kill('SIGTERM'));
    await asyncPoint(1000);
    process.exit(0);
}

function setSigHandler() {
    process.on('SIGINT', sighandle);
    process.on('SIGTERM', sighandle);
}
setSigHandler();

async function fork(name, cmd, args, {readyRegex, failedRegex, timeout, echo, logStream} = {}, opts) {
    cmdfull = cmd + " " + args.join(' ');
    result = {
        command: cmdfull,
        success: false
    };
    console.log(cmdfull);
    
    return new Promise((resolve) => {
        const finishedWithError = () => {
            //console.debug('fork close: ' + name)
            delete children[name];
            result.success = false;
            resolve(result);
        };

        finishedSuccessfully = () => {
            delete children[name];
            result.success = true;
            resolve(result);
        }

        if(timeout) {
            setTimeout(() => {
                if (children[name] === undefined)
                    return;
                console.log("Timed out waiting for command " + name + " to finish.");
                finishedWithError();
            }, timeout);
        }

        const child = childProcess.spawn(
            cmd,
            args,
            opts !== undefined ? opts : {
                silent: false,
                stdio: [null, 'pipe', 'pipe'],
                shell: utils.ShellLocation
            } 
        );

        handleClose = (proc) => {
            // Warning: react-native process doesn't seem to return correct exit code
            if (proc.exitCode == 0) {
                finishedSuccessfully();
            }
            else {
                console.log("Exit code = " + proc.exitCode);
                finishedWithError();
            }
        }
        child.on('close', () => handleClose(child));
        child.on('exit', () => handleClose(child));
        child.on('error', finishedWithError);

        if (!logStream) {
            logStream = fs.createWriteStream(`${utils.RepositoryRootDir}/data/logs/volatile-build-${name}.log`);
        }

        const lineCb = (line) => {
            if (echo){ 
                console.log(`[${name}] ${line}`);
            }
            logStream.write(line+os.EOL);
            if (failedRegex && line.match(failedRegex)) {
                finishedWithError();
            }
            if (readyRegex && line.match(readyRegex)) {
                finishedSuccessfully();
            }
        };

        readline.createInterface({
            input: child.stdout,
        }).on('line', lineCb);

        readline.createInterface({
            input: child.stderr,
        }).on('line', lineCb);

        children[name] = child;
        if (!readyRegex && !timeout) {
            finishedSuccessfully();
        }
    });
}

async function blockKeystroke() {
    try {
        let result = undefined;
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);

        process.stdin.on('keypress', (str, key) => {
            result = key;
        });

        while(!result) await sleep(100);
        return result;
    }
    finally {
        process.stdin.setRawMode(false);
    }
}

async function blockReadLine() {
    process.stdin.setRawMode(false);
    let result = undefined;
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });
    rl.on('data', function(line){
        result = line;
    })
    
    while(!result) await sleep(100);
    return result;
}

class AndroidHelper {
    constructor(device) {
        this.statusDoc = new StatusDoc();

        if (device === undefined) {
            console.log('No device name passed to AndroidHelper. Falling back to android_emulator_name in .dev.config.yaml');
            device = androidcfg.emulator_name;
        }
        this.deviceName = device;
        console.log('Spawned AndroidHelper for device ' + device);
    }
    
    assertCorrectDeviceAddress() {
        function getAllDeviceAddresses() {
            const err = new Error("Unable to find device address.");
            const rawResult = 
                childProcess
                .execSync("adb devices")
                .toString()
                .trim()
                .split(os.EOL);
            if (rawResult[0] != "List of devices attached") {
                throw err;
            }
            let results = [];
            for(let i = 1; i < rawResult.length; i++) {
                results.push(rawResult[i].split('\t')[0]);
            }
            return results;
        }
        const deviceAddresses = getAllDeviceAddresses();

        function deviceIsOurDevice(deviceAddress, portCfg) { 
            return portCfg == parseInt(deviceAddress.split('-')[1]);
        }        

        let matches = deviceAddresses.filter(addr => 
            addr.split('-')[1] == androidcfg.emulator_port);
        if (matches.length != 1) {
            throw new Error(
                "Unable to find avd device. If this problem persists, try " +
                "shutting down any currently running emulators before running" +
                " this script.");
        }
    }

    async clearLogcat() {
        console.log("Clearing logcat logs on device. Requires an emulator with root access.")
        try
        {
            utils.RunShellCmd(`adb -s ${androidcfg.device_address} root`);
            utils.RunShellCmd(`adb -s ${androidcfg.device_address} logcat -b all -c`);
        }
        catch (err) { 
            console.error(err.toString());
            return false;
        }
        return true;
    }

    // Ensures that .dev.config.yaml is committed to the development build
    // There are two (planned) ways that the .dev.config.yaml file are read at runtime.
    // The first way, using this method, is simpler with fewer moving parts
    // However, it only updates the config when this script is run.
    installDevConfig() {
        //https://stackoverflow.com/a/36974021/881111
        var inputfile = `${utils.RepositoryRootDir}/.dev.config.yaml`,
            outputfile = `${utils.RepositoryRootDir}/src/config/dev.config.json`,
            yaml = require('js-yaml'),
            fs = require('fs'),
            obj = yaml.load(fs.readFileSync(inputfile, {encoding: 'utf-8'}));
        console.log(`AndroidHelper: Copying ${inputfile} to ${outputfile}`);
        fs.writeFileSync(outputfile, JSON.stringify(obj, null, 2));
    }
    async launchAppItem(func) {
        let result = await func();
        if (result == false) 
            return false;
        if (result.success == false) {
            console.error("Command failed: " + result.command);
            return false;
        }
        return true;
    }

    async launchApp() {
        let result = 
            await this.launchAppItem(this.launchFlow) &&
            await this.launchAppItem(this.launchEmulator) && 
            await this.launchAppItem(this.launchBuild) &&
            await this.launchAppItem(this.clearLogcat) &&
     //       await this.launchAppItem(this.launchRNLink) &&
            await this.launchAppItem(this.launchReactNative)

        await sleep(100);

        this.statusDoc.timeLaunched = Date.now();

        return result;
    }

    async launchBuild() {
        return true; // react-native run-android already does this
        /*
        // Build APK
        console.log("Starting gradle build.")
        return await fork(
            'gradle',
            './android/gradlew', 
            [ // args
                `--project-dir=${utils.RepositoryRootDir}/android`,
                'assembleDebug',
            ],
            { // options
                readyRegex: /BUILD SUCCESSFUL/,
                timeout: 300000,
                echo: true
            }
        );
        */
    }

    async launchEmulator() {
        if (androidcfg.emulator_auto_launch != true) {
            console.log("AndroidHelper: Auto-launch of emulator not enabled (can change via .dev.config.yaml)");
            return true;
        }
        console.log("AndroidHelper: Starting Android Emulator")
        if (false == await fork(
            'emulator',
            '$ANDROID_HOME/tools/emulator', 
            [ // args
                '-avd',  
                `${this.deviceName}`,
                '-port',
                androidcfg.emulator_port,
                "-verbose"
            ],
            { // options
                readyRegex: new RegExp(
                    "(Running multiple emulators with the same AVD is an experimental feature)" + 
                    "|(INFO: boot completed)" + 
                    "|(Adb connected, start proxing data)", 
                    'g'),
                timeout: 60000,
                echo: true
            },
            {
                cwd: `${process.env["ANDROID_HOME"]}/emulator`,
                silent: false,
                stdio: [null, 'pipe', 'pipe'],
                shell: utils.ShellLocation
            }
        )) {
            return false;
        }
        utils.RunShellScript("android/wait-for-boot.sh", androidcfg.device_address);
    }

    async launchFlow() {
        console.log(`AndroidHelper: Launching flow.`);
        let procopts = {
            cwd: utils.RepositoryRootDir,
            shell: utils.ShellLocation,
            stdio: "inherit"
        };
        childProcess.execSync('flow', procopts);
        return true;
    }

    async launchReactNative() {
        // Metro Bundler
        return await fork(
            'metro',
            `${utils.RepositoryRootDir}/node_modules/.bin/react-native`,
            [ // args
                'run-android',
            ],
            { // options
                readyRegex: /Loading dependency graph, done./,
                failedRegex: /BUILD FAILED/,
                timeout: 60000,
                echo: true
            }
        );
    }
    
    async launchRNLink() { // react-native link seems to be a bad idea due to some things being linked that we don't want?
        return await fork(
            'RNLink',
            `${utils.RepositoryRootDir}/node_modules/.bin/react-native`,
            [ // args
                'link',
            ],
            { // options
                //readyRegex: /Loading dependency graph, done./,
                timeout: 60000,
                echo: true
            }
        );
    }
   /* 
    Redirects log output
    Original story: https://www.pivotaltracker.com/story/show/162820053

    Currently, all logging data on Pangea-Mobile is accessible on the device
    itself via logcat. This data needs to be piped to a file on the development
    host, so that other applications such as a log parser can work with that
    file (making the log data more readily accessible to any developer working
    with the project).
    */
    async redirectLog() {
        const logPath = utils.RepositoryRootDir + '/data/logs/pangea-android-logcat.log';
        console.log(`AndroidHelper: Redirecting log output from device ${this.deviceName} to ${logPath}.`);
        let logcat = await fork(
            'logcat',
            'adb', [
                '-s', 
                androidcfg.device_address,
                'logcat',
                '-v',
                'threadtime'
            ], {
                logStream: fs.createWriteStream(`${utils.RepositoryRootDir}/data/logs/pangea-android-logcat.log`)
            }
        );
    }
    
    // Portable log parser: http://lnav.org/features/
    setupLnav() {
        console.log("Setting up lnav");
        try {
            utils.RunShellCmd('which lnav');
        }
        catch (err) {
            console.log("AndroidHelper: lnav log utility not detected. Advanced log parsing is disabled. See http://lnav.org/features/ for an overview and installation instructions.");
            return false;
        }
        
        // Install the logcat specification automatically. 
        utils.RunShellCmd(`lnav -i ${utils.RepositoryRootDir}/scripts/android/lnav-logcat.json`);
        
        // Get bitnation app pid. This is necessary in order to filter out irrelevant log data. 
        // We only want log items generated from the pangea app process.
        this.statusDoc.appPid = parseInt(utils.RunShellCmd(`adb -s ${androidcfg.device_address} shell pidof co.bitnation`));
        console.log("App pid on device is " + this.statusDoc.appPid);
    }

    async startAll() {
        try {
            this.statusFileRemove();
            this.installDevConfig();
            if (await this.launchApp() == false) {
                console.log("Launch not successful. Check error messages for possible cause.")
                await sighandle();
                return;
            }
            this.assertCorrectDeviceAddress();
            this.setupLnav();
            this.statusFileCommit();
            await this.redirectLog();
            console.log("AndroidHelper: Launch successful.");
        }
        catch(err) {
            console.log("AndroidHelper crashed: " + err.toString());
            await sighandle();
            return;
        }
        
        console.log("Press Ctrl+Z to stop log collection and end the session.");
        let key = {};
        do { key = await blockKeystroke(); }
        while(!(key.ctrl && key.name == "z"));

        await sighandle();
        
        /**
         * TODO: 
         * 5. Each distinct tag should have some code to pipe, transform, parse, or redirect the body of the corresponding log lines
         */
    }

    statusFileCommit() {
        const doc = nodeutil.inspect(this.statusDoc, )
        fs.writeFileSync(statusFilePath, JSON.stringify(this.statusDoc) , 'utf-8');
        console.log("Committed status file to " + statusFilePath);
    }

    statusFileRemove() {
        if (fs.exists(statusFilePath)) {
            fs.unlinkSync(statusFilePath);
        }
    }
}

module.exports = { AndroidHelper: AndroidHelper };
