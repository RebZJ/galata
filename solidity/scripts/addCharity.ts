import { ethers } from "hardhat";

import dotenv from "dotenv";
import {BigNumber, ContractTransaction} from "ethers";

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
    {
        const signerBalanceBefore = await ethers.provider.getBalance(signerAddress);
        const contract = await ethers.getContractAt("Relay", CONTRACT_ADDRESS, signer);
        const tx = await contract.approveCharity("0xC55bd1828aD4e13e86fa21d8E666bbaCE42643B4", {maxPriorityFeePerGas: 7});
        const txReceipt = await tx.wait(2);
        console.log("tx: ", txReceipt.transactionHash);
    }
    {
        const signerBalanceBefore = await ethers.provider.getBalance(signerAddress);
        const contract = await ethers.getContractAt("Relay", CONTRACT_ADDRESS, signer);
        const tx = await contract.approveCharity("0x6b369A73B4D6BFf56FD9f7cEeE047d1A8C463FCF", {maxPriorityFeePerGas: 7});
        const txReceipt = await tx.wait(2);
        console.log("tx: ", txReceipt.transactionHash);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});