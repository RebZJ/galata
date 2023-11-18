import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: "london"
    }
  },
  networks: {
    scrollTestnet: {
      url: process.env.SCROLL_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    arbitrumGoerli: {
      url: 'https://goerli-rollup.arbitrum.io/rpc',
      chainId: 421613,
      accounts:
          process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    chilizTestnet: {
      url: 'https://chiliz-spicy.publicnode.com/',
      chainId: 88882,
      accounts:
          process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    gnosisTestnet: {
      url: 'https://gnosis-chiado.publicnode.com',
      chainId: 10200,
      accounts:
          process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      scrollSepolia: 'abc',
    },
    customChains: [
      {
        network: 'scrollSepolia',
        chainId: 534351,
        urls: {
          apiURL: 'https://sepolia-blockscout.scroll.io/api',
          browserURL: 'https://sepolia-blockscout.scroll.io/',
        },
      },
    ],
  },
};

export default config;
