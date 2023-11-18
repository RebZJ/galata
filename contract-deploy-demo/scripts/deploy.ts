import { ethers } from "hardhat";

async function main() {
  const Relay = await ethers.getContractFactory("Relay");
  const manager = await Relay.signer.getAddress();
  const relay = await Relay.deploy(manager, {maxPriorityFeePerGas: 0});

  await relay.deployed();

  console.log(`Relay deployed to ${relay.address}`);
  console.log(`Block explorer URL: https://blockscout.scroll.io/address/${relay.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
