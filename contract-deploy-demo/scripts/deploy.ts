import { ethers } from "hardhat";

async function main() {
  ethers.getSigner()
  const Lock = await ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(, { value: 0 });

  await lock.deployed();

  console.log(`Lock with 0.00000001 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`);
  console.log(`Block explorer URL: https://blockscout.scroll.io/address/${lock.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
