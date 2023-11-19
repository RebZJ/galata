<img src="../assets/banner.png" alt="create2-banner"/>

# Scroll Contract Deployment Demo

This project demonstrates how to use hardhat or foundry to deploy a contract in Scroll's rollup network. This project contains a simple contract that will lock a certain amount of Ether in the deployed contract for a specified amount of time.

## Prerequisites

- Network setup: https://guide.scroll.io/user-guide/setup

## Deploy with Hardhat

1. If you haven't already, install [nodejs](https://nodejs.org/en/download/) and [yarn](https://classic.yarnpkg.com/lang/en/docs/install).
2. Run `yarn install` to install dependencies.
3. Create a `.env` file following the example `.env.example` in the root directory. Change `PRIVATE_KEY` to your own account private key in the `.env`.
4. Run `yarn compile` to compile the contract.
5. Run `yarn deploy:scrollTestnet` to deploy the contract on the Scroll Sepolia Testnet.
6. Run `yarn test` for hardhat tests.

## Current deployments
Relay contracts (all verified):
* [scrolls](https://sepolia.scrollscan.dev/address/0x0644667f39cb9d87e884DF3C211a4363Cd4f5879): `0x0644667f39cb9d87e884DF3C211a4363Cd4f5879`
  * deployed and verified, so should be eligible for Scrolls prize pool
* Arbitrum:
  * [arbitrum-goerli](https://testnet.arbiscan.io/address/0x03839dC2Cd16dA7E41560762Dea9CB9Ad59DbF18): `0x03839dC2Cd16dA7E41560762Dea9CB9Ad59DbF18`
  * [arbitrum-stylus](https://stylus-testnet-explorer.arbitrum.io/address/0x93a51058c0Cf6BA3e97a4A3E476ae8C95D02ea04): `0x93a51058c0Cf6BA3e97a4A3E476ae8C95D02ea04`
  * deployed and verified on goerli and stylus, so should be eligible for Arbitrum prize pool
* [chiliz](https://spicy-explorer.chiliz.com/address/0x93a51058c0Cf6BA3e97a4A3E476ae8C95D02ea04): `0x93a51058c0Cf6BA3e97a4A3E476ae8C95D02ea04`
  * deployed and verified, so should be eligible for Chiliz prize pool
* [gnosis](https://gnosis-chiado.blockscout.com/address/0x93a51058c0Cf6BA3e97a4A3E476ae8C95D02ea04): `0x93a51058c0Cf6BA3e97a4A3E476ae8C95D02ea04`
  * deployed and verified (testnet)
  * address is in the readme
  * more than 2 successful txs
  * [tweet link](https://x.com/gostkin1/status/1725997136293069291)
  * [frontend link](https://galata-indol.vercel.app/)
  * A living, breathing product - everything works

We use WalletConnect to interact with the wallets

We qualify for UNICEF innovation:
* We're using fully open source technologies
* We help business (for-profit) companies connect with charity companies via our Relay. The Relay provides an ability to donate to charity (e.g. to companies that help reduce carbon dioxide emissions or to companies that plant trees). The donation is traceable, so e.g. if businesses would need to report this to tax authorities they can show where the funds went and provide the proof that the receiving companies help with sustainability.
* The idea is unique and solves real case (e.g. in Australia this can be done in web2)
* 
## Progress:
* [ ] Scrolls
  * [x] contract deployment
  * [x] contract verification
  * [ ] fronted test
* [ ] Arbitrum Goerli
  * [x] contract deployment
  * [x] contract verification
  * [ ] fronted test
* [ ] Arbitrum Stylus
  * [x] contract deployment
  * [x] contract verification
  * [ ] fronted test
* [ ] Chiliz
  * [x] contract deployment
  * [x] contract verification
  * [ ] fronted test
* [ ] Gnosis
  * [x] contract deployment
  * [x] contract verification
  * [ ] fronted test
  * [x] tweet link
  * [x] frontend link
