const hre = require("hardhat");
const fs = require('fs');
const fse = require("fs-extra");
const { verify } = require('../utils/verify');
const { getAmountInWei, developmentChains } = require('../utils/helper-scripts');

async function main() {
  const deployNetwork = hre.network.name;

  // Parameters for the NFT presale contract
  const name = "Mountains";
  const symbol = "FLY";
  const presalePrice = getAmountInWei(0.00001); // 0.00001 Ether in Wei
  const presaleMaxSupply = 100; // Adjust the max supply as needed

  // Deploy NFTPresale contract
  const NFTPresale = await hre.ethers.getContractFactory("NFTPresale");
  const nftPresale = await NFTPresale.deploy(name, symbol, presalePrice, presaleMaxSupply);

  await nftPresale.deployed();

  console.log("NFTPresale contract deployed at:\n", nftPresale.address);
  console.log("Network deployed to:\n", deployNetwork);

  /* Transfer contracts addresses & ABIs to the front-end */
  if (fs.existsSync("../front-end/src")) {
    fs.rmSync("../front-end/src/artifacts", { recursive: true, force: true });
    fse.copySync("./artifacts/contracts", "../front-end/src/artifacts");
    fs.writeFileSync("../front-end/src/utils/contracts-config.js", `
      export const nftPresaleContractAddress = "${nftPresale.address}";
      export const ownerAddress = "${nftPresale.signer.address}";
      export const networkDeployedTo = "${hre.network.config.chainId}";
    `);
  }

  if (!developmentChains.includes(deployNetwork) && hre.config.etherscan.apiKey[deployNetwork]) {
    console.log("waiting for 6 blocks verification ...");
    await nftPresale.deployTransaction.wait(6);

    // Args represent contract constructor arguments
    const args = [name, symbol, presalePrice, presaleMaxSupply];
    await verify(nftPresale.address, args);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
