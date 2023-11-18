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
Relay contracts
* [scrolls](https://sepolia.scrollscan.dev/address/0xbbd9a9c472f86ecad897e2117b6047e8e8fcba5f): `0xBBd9a9C472F86eCAD897E2117B6047E8E8fCbA5F`
* [arbitrum](https://testnet.arbiscan.io/address/0xc1dacf75a4ec7fe6273d21628bf0206918dc768f): `0xc1dacf75a4ec7fe6273d21628bf0206918dc768f`