![bnlogo](https://user-images.githubusercontent.com/17184469/56120692-f43a1800-5f6e-11e9-84c1-28de2a9c086b.png)


# The BITNATION Pangea Blockchain Jurisdiction - Android and iOS repository

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![Build Status](https://app.bitrise.io/app/6902c0cb8904f70e/status.svg?token=bWiliDDZJ3pDax2f4zA0Sg&branch=develop)

On Bitnation’s Blockchain Jurisdiction you can: * create smart contract agreements through an end-to-end encrypted chat interfce * join, leave and create opt-in nations and communities * buy and sell governance services or products peer-to-peer. Our core technology principles are: * open-source software * blockchain agnostic backend * end-to-end encrypted communications.

<img width="1044" alt="Screen Shot 2019-03-15 at 23 24 49" src="https://user-images.githubusercontent.com/17184469/56120406-534b5d00-5f6e-11e9-9ed3-676fc5365997.png">



## Table of Contents

- [Security](#security)
- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Maintainers](#maintainers)
- [Project Boards](#project-boards)
- [Contribute](#contribute)
- [License](#license)

## Security
If you find a bug / vulnerability please DO NOT open an issue. Write to `security@bitnation.co` PLEASE use [this](security-bitnation.co.key.pub) PGP key to encrypt your report / email.

## Install

__Requirements__

* Node 8.x - Node 10+ is [not supported by realm yet](https://github.com/realm/realm-js/issues/1857). 

* Android Studio 3.1+ (If NDK is not installed, this version requirement may be more relaxed).

* [Panthalassa](https://github.com/Bit-Nation/panthalassa) binary, also covered below in instructions.

Supported Operating Systems: MacOS, Linux (Android only).  
Windows is unsupported, but may work. Please open a well-documented issue anyway if you have problems building under Windows.

__Project setup__

1. Clone the repo
2. Run `npm install`
3. Copy `.env.dev.example` to `.env`. Set `PRODUCTION` to true/false.
4. Copy `.dev.config.default.yaml` to `.dev.config.yaml`, and change any necessary values.
5. Run `./scripts/check.env.sh` to determine if you are missing anything. This is still a new script, so there could be false negatives.
 
__IOS specific__
1. Get [cocoapods](https://cocoapods.org/)
2. Go to the `ios` folder
3. Run `pod install`
4. Place a compiled version of https://github.com/Bit-Nation/panthalassa into ios/Frameworks/panthalassa.framework
5. Go back to the project root and run `npm run ios`

__Android specific__
1. Place a compiled version of https://github.com/Bit-Nation/panthalassa into android/panthalassa/panthalassa.aar
2. Run `npm run android`
3. Run `npm run android:log` (requires lnav) to view runtime logs. 

__Desktop client (internal/ community testing pase)__
The Linux, Windows and Mac desktop client is a different piece of software than the mobile app, currently. It's still in early development, worth checking out for comparison. You can install it from the [website](http://bitnationapi.azurewebsites.net/downloads/).

## Usage

__Git & best practice__

- We use [this](http://nvie.com/posts/a-successful-git-branching-model/) branching model. Make sure to read it.
- PLEASE prefix your commits with a topic like this: `[git] blacklisted .idea`
- Write tests for your code


## API
> If you would like to develop a DApp for Pangea please checkout [this part](https://bitnation-pangea-mobile.readthedocs.io/) of the documentation

## Maintainers

[Susanne Tarkowski Tempelhof](https://github.com/xsttx)  
[Thiago Souza](https://github.com/ThiagoVSouza)


## Project Boards

We use PivotalTracker for project management. As of 12/7/2018, our primary board is open to the public.  
App - https://www.pivotaltracker.com/projects/2204148  
Architecture - https://www.pivotaltracker.com/projects/2213396  

## Contribute

Pull requests are accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

**Support our work** with **ETH** and **XPAT**:

The Bitnation Pangea Jurisdiction is a **free** and **open source project**

ETH address: 0xCDE042543307966bc16Eff3cDca4d32B23408C4c

XPAT address: 0xCDE042543307966bc16Eff3cDca4d32B23408C4c

The funds will be transferred to a DBVN structure where you can vote on development prorities proposals, after the release v. 1.1 of the Desktop client spring 2019. Until then you can add your proposal suggestions on [consider.it](https://tse.bitnation.co/)

## License

MIT © 2018 Bitnation
