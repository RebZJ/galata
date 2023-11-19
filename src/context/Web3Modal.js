"use client";
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig } from 'wagmi'
import { arbitrumGoerli, arbitrumSepolia, scrollSepolia, gnosisChiado, spicy, filecoinCalibration } from 'viem/chains'

const projectId = 'af9bf413505dd80e1c7bca20415b51b9'

const metadata = {
    name: 'Web3Modal',
    description: 'Web3Modal Example',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [arbitrumGoerli, arbitrumSepolia, gnosisChiado, scrollSepolia, spicy, filecoinCalibration]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })

export function Web3Modal({ children }) {
    return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}