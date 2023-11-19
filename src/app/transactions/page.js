"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useContractRead, useAccount, useContractWrite } from 'wagmi';
import relay from '../../../artifacts/contracts/Relay.sol/Relay.json';
import { parseEther, parseGwei } from 'viem';
import { useNetwork } from 'wagmi';
import {useContractStore} from "@/context/ZustandContext";

export default function Transaction() {
    const [alltransactions, setAlltransactions] = useState([]);
    const [alltransactionsID, setAlltransactionsID] = useState([]);

    const [addy, setAddy] = useState(null);
    const { address, isConnecting, isDisconnected } = useAccount();
    const [businessBool, setBusinessBool] = useState();
    const [managerBool, setManagerBool] = useState();
    const [transactionToExecute, setTransactionToExecute] = useState();
    useEffect(() => {
        setAddy(address);
    }, [address]);

    const contractVal = useContractStore();
    const { chain, chains } = useNetwork();
    useEffect(() => {
        if (chain === undefined) {
            contractVal.setContractAddress("0xAE7315753f792799f54236694777823efc197E74");
        } else {
        if (chain.id === 421613) {
            // arb goerli
            contractVal.setContractAddress("0xA4852b98666c8eE2CAb535bD9638C0c83ecdcFC2");
        } else if (chain.id === 23011913) {
            // arb sepolia
            contractVal.setContractAddress("0x525D2de2b1679aFc68bB5e724db04bDCdAf7D94d");
        } else if (chain.id === 88882) {
            // chiliz
            contractVal.setContractAddress("0xA845C2f516013A7687D4b8bE52393f6E3ef75F00");
        } else if (chain.id === 10200) {
            // gnosisTestnet
            contractVal.setContractAddress("0xA845C2f516013A7687D4b8bE52393f6E3ef75F00");
        } else if (chain.id === 314159) {
            // filecoin
            contractVal.setContractAddress("0xBBd9a9C472F86eCAD897E2117B6047E8E8fCbA5F");
        } else {
            // scrolls
            contractVal.setContractAddress("0xAE7315753f792799f54236694777823efc197E74");
        }}
        console.log(contractVal.contract);
    }, [JSON.stringify(contractVal)]);


    const { data, isLoading, isSuccess, write } = useContractWrite({
        address: contractVal.contract,
        abi: relay.abi,
        functionName: 'executeTransaction',
    })

    const isBusiness = useContractRead({
        address: contractVal.contract,
        abi: relay.abi,
        functionName: 'isBusiness',
        args: [address],
        onSuccess(data) {
            setBusinessBool(data);
        },
    });

    const isManager = useContractRead({
        address: contractVal.contract,
        abi: relay.abi,
        functionName: 'isManager',
        args: [address],
        onSuccess(data) {
            setManagerBool(data);
        },
    });

    const transactions = useContractRead({
        address: contractVal.contract,
        abi: relay.abi,
        functionName: 'pendingTransactions',
        args: [address],
        onSuccess(data) {
            console.log(data);
            setAlltransactions(data[0]);
            setAlltransactionsID(data[1]);
        },
    });

    const handlePayment = (transactionId) => {
        // const piecesSum = alltransactions[alltransactionsID[transactionId]].pieces.reduce((acc, piece) => acc + parseInt(piece.value.toString()), 0);

        const piecesArray = alltransactions[transactionId].pieces
        let piecesSum = 0;
        for (let i = 0; i < piecesArray.length; i++) {
            piecesSum += parseInt(piecesArray[i].value.toString());
        }

        const feeSum = parseInt(alltransactions[transactionId].fee.toString());

        console.log("Sum of values in 'pieces' array:", piecesSum);
        console.log("Sum of 'fee':", feeSum);

        // // Total sum
        const totalSum = (piecesSum + feeSum);
        console.log("Total sum:", totalSum);
        // handlePayment(transactionId);
        // You may want to update the state or perform other actions after payment handling
        // alltransactionsID[transactionId]
        write({
            args: [alltransactionsID[transactionId]],
            from: addy,
            value: totalSum
        })
        // console.log(alltransactionsID[transactionId])
    };

    return (
        <div className="flex flex-col items-center">
            <div className="bg-success p-2 rounded-lg shadow-md mb-2">
                {businessBool && <div>Logged in as business</div>}
                {managerBool && <div>Logged in as manager</div>}
            </div>



            <div>
                <div> Transactions</div>
                {alltransactions.length > 0 ? (
                    alltransactions.map((transaction, index) => (
                        <div className=" max-w-7xl bg-base-200 shadow-md mb-2 p-2 warp flex flex-col" key={index}><div>

                            Transaction fee: {parseInt(transaction.fee.toString()) / 1000000000000000000
                            } ETH
                            {transaction.pieces.map((obj) => {
                                return (<div className="bg-base-300 m-2 p-2 rounded-md shadow-md "><div>To: {obj.destination}</div>
                                    <div>Amount: {parseInt(obj.value.toString()) / 1000000000000000000
                                    } ETH</div>
                                </div>)
                            })}
                            {/* {JSON.stringify(transaction, (key, value) =>
                            typeof value === 'bigint'
                                ? parseInt(value.toString()) / 1000000000000000000
                                : value // return everything else unchanged
                        )} */}
                        </div> {!transaction.paid ? <button className="btn btn-primary whitespace-nowrap"
                            onClick={() => handlePayment(index)}
                        >Approve</button> : <button className="btn btn-success whitespace-nowrap"

                        >Paid</button>}</div>
                    ))
                ) : (
                    <div>No transactions available</div>
                )}
            </div>

            {managerBool ? <button className="btn btn-primary whitespace-nowrap mt-2">
                <Link href="/transactions/create">Create transaction</Link>
            </button> : null}


        </div>
    );
}
