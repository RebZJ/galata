import { ethers } from "hardhat";

import dotenv from "dotenv";
import { ContractTransaction } from "ethers";

dotenv.config();

const {
    CONTRACT_ADDRESS,
} = process.env;

async function main() {
    if (!CONTRACT_ADDRESS) {
        throw new Error("Please fill the .env file with all values");
    }

    const { getSigners } = ethers;
    const [ signer ] = await getSigners();
    const signerAddress = await signer.getAddress()

    // Executing the transaction on-chain and verifying actual values
    const signerBalanceBefore = await ethers.provider.getBalance(signerAddress);
    const contract = await ethers.getContractAt("Relay", CONTRACT_ADDRESS, signer);
    const tx = await contract.isManager(signer.getAddress());
    console.log("is manager: ", tx)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});