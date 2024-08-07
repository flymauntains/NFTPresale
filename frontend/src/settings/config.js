import { base, baseSepolia, sepolia } from "wagmi/chains"
import { bscTestnet } from "wagmi/chains"
import { useAccount, useWriteContract, useNetwork } from "wagmi";
import { getClient } from '@wagmi/core'

const MODE = 1
// const chain = MODE ? base : baseSepolia
// const chain = bscTestnet
const chain = sepolia
// const { address, isConnected } = useAccount();

// const contribute = MODE ? "0xEaA4d71718Ac136aBE59E4EC0453239f7ac380dd" : "0x6462de13901Ac34388D704067479ee3a59B380bE"
// const contribute = "0xEE63B693B98d39ac5786903306acBb5D39E08cfc"
// const contribute = "0x7dca35fb77185E00E3a8b120A10F96290F3F6305"
const contribute = "0x4F91aeDE07E943DB5D914ABfecc6E8489b60cC4f"
// const connector = {
//   name: "Metamask",
//   supportedChainIds: [1, 3, 4, 5, 42, 97,11155111],
//   getAccounts: async () => ["0xa3E2a543b0115c46973AB244cBBaAEf7b3D65076"],
//   getChainId: async () => sepolia.id,
//   getProvider: async () => window.ethereum,
// };


const Config = {
  siteTitle: "PEPE + BASE = $BEPE",
  social: {
    twitter: "https://twitter.com/BepeOnBASE",
    telegram: "https://telegram.com/BepeOnBASE",
  },
  description: "NFTPresale",
  REFETCH_INTERVAL: 10000,
  PUBLIC_URL: 'https://bepe.live/',
  API_URL: 'https://projects.cryptosnowprince.com/api',
  PROJECT: 'NFTPresale',
  ACTION: true,
  CHAIN: chain,
  POLICY_LINK: "https://bepe.live/privacy-policy",
  BEPE_DEC: 18,
  CONTRIBUTE: contribute,
  ETH_PRICE_API: "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=3TEWVV2EK19S1Y6SV8EECZAGQ7W3362RCN",
  // PROVIDER_URL: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
  PROVIDER: {
    connections: [] // Make sure this is defined
  },
  DEFAULT_GAS: 0.001,
  ssr: true,
  // chains: [bscTestnet],
  chains: [sepolia],
  // connector: connector 
  
};



export default Config