/* eslint-disable no-unused-vars */
// Mock private key: 0xefc27ba5330258fcfb75e28e4e6efd88458751086998bbfad99257035fb3e160
// Public key: 0xF0D346A86A68086846363185d24D5893F4353A78

import ethers from 'ethers';
import providers from 'ethers/providers';
import { EthereumService } from '../index';

describe('ethereum', () => {
  let ethereum;
  test('Initialize wallet and send ether', async () => {
    const wallet = new ethers.Wallet('0xefc27ba5330258fcfb75e28e4e6efd88458751086998bbfad99257035fb3e160');
    wallet.provider = new providers.InfuraProvider('rinkeby');
    ethereum = new EthereumService(wallet, 'dev');
    let gasEstimate;
    let response;
    try {
      gasEstimate = await ethereum.estimateGas('2000000000', '0x0');
      response = await ethereum.sendMoney('0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290', '0.00001', '2000000000');
    } catch (e) {
      throw (e);
    }
    expect(response.from).toEqual('0xF0D346A86A68086846363185d24D5893F4353A78');
  });
  test('Check balance and token balance', async () => {
    const wallet = new ethers.Wallet('0xefc27ba5330258fcfb75e28e4e6efd88458751086998bbfad99257035fb3e160');
    wallet.provider = new providers.InfuraProvider('rinkeby');
    ethereum = new EthereumService(wallet, 'dev');
    let balance;
    balance = await ethereum.getBalance();
    balance = await ethereum.getTokenBalance('0x9EDCb9A9c4d34b5d6A082c86cb4f117A1394F831');
    balance = await ethereum.getOtherBalance('0xF0D346A86A68086846363185d24D5893F4353A78');
    balance = await ethereum.getOtherTokenBalance('0x9EDCb9A9c4d34b5d6A082c86cb4f117A1394F831', '0xF0D346A86A68086846363185d24D5893F4353A78');
  });
  test('Check nations object', async () => {
    const wallet = new ethers.Wallet('0xefc27ba5330258fcfb75e28e4e6efd88458751086998bbfad99257035fb3e160');
    wallet.provider = new providers.InfuraProvider('rinkeby');
    ethereum = new EthereumService(wallet, 'dev');
    const nationsObject = ethereum.nations;
    const numCitizens = await nationsObject.getNumCitizens(0);
    expect(numCitizens.toNumber()).toEqual(0);
  });
});
