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

## Frontend deployment
Please check the [link](https://galata-indol.vercel.app/)

## Progress:
* [ ] Scrolls
    * [x] contract deployment
    * [x] contract verification
    * [ ] frontend test
* [ ] Arbitrum Goerli
    * [x] contract deployment
    * [x] contract verification
    * [ ] frontend test
* [ ] Arbitrum Stylus
    * [x] contract deployment
    * [x] contract verification
    * [ ] frontend test
* [ ] Chiliz
    * [x] contract deployment
    * [x] contract verification
    * [ ] frontend test
* [ ] Gnosis
    * [x] contract deployment
    * [x] contract verification
    * [ ] frontend test
    * [x] tweet link
    * [x] frontend link
