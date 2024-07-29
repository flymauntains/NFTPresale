import { http, createConfig } from '@wagmi/core'
import { mainnet, sepolia } from '@wagmi/core/chains'

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})


// 'use client';

// import { http, createStorage, cookieStorage } from 'wagmi'
// import { sepolia, bscTestnet, blastSepolia } from 'wagmi/chains'
// import { Chain, getDefaultConfig } from '@rainbow-me/rainbowkit'

// const projectId = '01f43ceb6cab6043daf5c7a457564c34';

// const supportedChains: Chain[] = [sepolia, bscTestnet, blastSepolia];

// export const config = getDefaultConfig({
//    appName: 'NFTPresale',
//    projectId,
//    chains: supportedChains as any,
//    ssr: true,
//    storage: createStorage({
//     storage: cookieStorage,
//    }),
//   transports: supportedChains.reduce((obj, chain) => ({ ...obj, [chain.id]: http() }), {})
//  });