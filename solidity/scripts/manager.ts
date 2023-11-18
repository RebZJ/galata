import { ethers } from "hardhat";

async function main() {
    const Relay = await ethers.getContractFactory("Relay");
    const manager = await Relay.signer.getAddress();

    console.log(`Manager address ${manager}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
