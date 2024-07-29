import { useEffect, useState } from "react";
import ContextProvider from "src/utils/ContextProvider";
import "@assets/styles/style.css";
import Image from "next/image";

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import Config from "src/settings/config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { http, createConfig } from 'wagmi';
import { sepolia, hardhat } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
// import { config } from "../src/sections/BodyContent/Contribute/config.ts"


const config = getDefaultConfig({
  appName: 'NFTPresale',
  projectId: '01f43ceb6cab6043daf5c7a457564c34',
  chains: [Config.CHAIN],
  ssr: true,
});

// const config = createConfig({
//   chains: [sepolia, hardhat],
//   connectors: [injected()],
//   ssr: true,
//   chains: [Config.CHAIN],
//   appName: 'NFTPresale',
//   projectId: '01f43ceb6cab6043daf5c7a457564c34',
//   transports: {
//     [sepolia.id]: http(
//       `https://eth-sepolia.g.alchemy.com/v2/BBpNzWLR6-7dtMKVPIpwfbCbOsvZCYyc`
//     ),
//     [hardhat.id]: http('http://localhost:8545'),
//   },
// });

// declare module 'wagmi' {
//   interface Register {
//     config: typeof config;
//   }
// }


const Disclaimer = ({ Link, Text }) => {
  return (
    <Text>
      <div style={{ fontSize: "20px", padding: "2px" }}>By connecting your wallet, you agree to our{' '}
        <Link href={Config.POLICY_LINK}>Terms of Service & Privacy Policy</Link>
      </div>
    </Text>
  );
};

const customTheme = {
  ...lightTheme({
    borderRadius: "none",
    overlayBlur: "large",
  }),
  fonts: {
    body: 'Orbitron',
  },
}

const queryClient = new QueryClient();

const App = ({ Component, pageProps }) => {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          appInfo={{
            appName: 'NFTPresale',
            disclaimer: Disclaimer
          }}
          // showRecentTransactions={true}
          modalSize="compact"
          theme={customTheme}>
          <ContextProvider>
            <Component {...pageProps} />
            <ToastContainer pauseOnFocusLoss={true} position="top-right" />
          </ContextProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
