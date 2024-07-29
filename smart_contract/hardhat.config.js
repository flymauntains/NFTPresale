require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("@nomicfoundation/hardhat-chai-matchers");
require("hardhat-gas-reporter");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;
const POLYGON_RPC_URL = process.env.POLYGON_RPC_URL;
const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL;
const BSC_RPC_URL = process.env.BSC_RPC_URL;
const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY;
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
      }
    ],
  },
  networks: {
    hardhat: {
      chainId: 31337
    },
    ganache: {
      chainId: 1337,
      url: "http://127.0.0.1:7545",
      accounts: [process.env.PRIVATE_KEY]
    },
    bscTestnet : {
      url: BSC_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 97,
    },
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/BBpNzWLR6-7dtMKVPIpwfbCbOsvZCYyc',
      // accounts: [privateKey]
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 7_000_000_000,
    },
    // polygon: {
    //   url: POLYGON_RPC_URL,
    //   accounts: [process.env.PRIVATE_KEY],
    //   chainId: 137,
    // }
  },
  paths: {
    artifacts: "./artifacts"
  },
  gasReporter: {
    enabled: true,
  },
  etherscan: {
    apiKey: {
      bscTestnet : BSCSCAN_API_KEY,
      sepolia: 'KRZPGFB8WUVIC9MSQRNND9YXG5GGYBCSM2'
    }
  }
};
