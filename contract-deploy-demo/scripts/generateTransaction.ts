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
    const signerBalanceBefore = await ethers.provider.getBalance(signerAddress);
    const contract = await ethers.getContractAt("Relay", CONTRACT_ADDRESS, signer);
    const tx = await contract.generateTransaction("0xb140dBAa81baFDE4934771ea83b07eFE2B800fd7", [
        {
            destination: "0x6b369A73B4D6BFf56FD9f7cEeE047d1A8C463FCF",
            value: BigInt(10)
        },
        {
            destination: "0xC55bd1828aD4e13e86fa21d8E666bbaCE42643B4",
            value: BigInt(20)
        }
    ], BigInt(1));
    const txReceipt = await tx.wait(5);
    console.log("tx: ", txReceipt.transactionHash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});