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
* [scrolls](https://sepolia.scrollscan.dev/address/0xAE7315753f792799f54236694777823efc197E74): `0xAE7315753f792799f54236694777823efc197E74`
  * deployed and verified, so should be eligible for Scrolls prize pool
* Arbitrum:
  * [arbitrum-goerli](https://testnet.arbiscan.io/address/0xA4852b98666c8eE2CAb535bD9638C0c83ecdcFC2): `0xA4852b98666c8eE2CAb535bD9638C0c83ecdcFC2`
  * [arbitrum-stylus](https://stylus-testnet-explorer.arbitrum.io/address/0x525D2de2b1679aFc68bB5e724db04bDCdAf7D94d): `0x525D2de2b1679aFc68bB5e724db04bDCdAf7D94d`
  * deployed and verified on goerli and stylus, so should be eligible for Arbitrum prize pool
* [chiliz](https://spicy-explorer.chiliz.com/address/0xA845C2f516013A7687D4b8bE52393f6E3ef75F00): `0xA845C2f516013A7687D4b8bE52393f6E3ef75F00`
  * deployed and verified, so should be eligible for Chiliz prize pool
* [filecoin](https://calibration.filutils.com/en/account/0xBBd9a9C472F86eCAD897E2117B6047E8E8fCbA5F): `0xBBd9a9C472F86eCAD897E2117B6047E8E8fCbA5F`
  * contract is deployed and verified, works on FVM, so should be eligible for Filecoin prize pool
* [gnosis](https://gnosis-chiado.blockscout.com/address/0xA845C2f516013A7687D4b8bE52393f6E3ef75F00): `0xA845C2f516013A7687D4b8bE52393f6E3ef75F00`
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

## Frontend deployment
Please check the [link](https://galata-indol.vercel.app/)

## Progress:
* [x] Scrolls
    * [x] contract deployment
    * [x] contract verification
    * [x] frontend test
* [x] Arbitrum Goerli
    * [x] contract deployment
    * [x] contract verification
    * [x] frontend test
* [x] Arbitrum Stylus
    * [x] contract deployment
    * [x] contract verification
    * [x] frontend test
* [x] Chiliz
    * [x] contract deployment
    * [x] contract verification
    * [x] frontend test
* [x] Gnosis
    * [x] contract deployment
    * [x] contract verification
    * [x] frontend test
    * [x] tweet link
    * [x] frontend link
