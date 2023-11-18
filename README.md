This repo contains frontend and contracts for Galata Charity Relay project

## Contracts setup

Please follow the instructions in [Contracts README](./solidity/README.md)

## Frontend setup

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Current contract deployments
Relay contracts (all verified):
* [scrolls](https://sepolia.scrollscan.dev/address/0xbbd9a9c472f86ecad897e2117b6047e8e8fcba5f): `0xBBd9a9C472F86eCAD897E2117B6047E8E8fCbA5F`
    * deployed and verified, so should be eligible for Scrolls prize pool
* Arbitrum:
    * [arbitrum-goerli](https://testnet.arbiscan.io/address/0xc1dacf75a4ec7fe6273d21628bf0206918dc768f): `0xc1dacf75a4ec7fe6273d21628bf0206918dc768f`
    * [arbitrum-stylus](https://stylus-testnet-explorer.arbitrum.io/address/0xBBd9a9C472F86eCAD897E2117B6047E8E8fCbA5F): `0xbbd9a9c472f86ecad897e2117b6047e8e8fcba5f`
    * deployed and verified on goerli and stylus, so should be eligible for Arbitrum prize pool
* [chiliz](https://spicy-explorer.chiliz.com/address/0xBBd9a9C472F86eCAD897E2117B6047E8E8fCbA5F): `0xBBd9a9C472F86eCAD897E2117B6047E8E8fCbA5F`
    * deployed and verified, so should be eligible for Chiliz prize pool
* [gnosis](https://gnosis-chiado.blockscout.com/address/0xBBd9a9C472F86eCAD897E2117B6047E8E8fCbA5F): `0xBBd9a9C472F86eCAD897E2117B6047E8E8fCbA5F`
    * deployed and verified
    * more than 2 txs
    * [tweet link]()
    * [frontend link]()

## Frontend deployment
Please check the [link]()

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
    * [ ] tweet link
    * [ ] frontend link
