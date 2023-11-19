"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useContractRead, useAccount, useContractWrite } from 'wagmi';
import relay from '../../../artifacts/contracts/Relay.sol/Relay.json';
import { parseEther } from 'viem';
import { useNetwork } from 'wagmi';

export default function Transaction() {
    const [alltransactions, setAlltransactions] = useState([]);
    const [addy, setAddy] = useState(null);
    const { address, isConnecting, isDisconnected } = useAccount();
    const [businessBool, setBusinessBool] = useState();
    const [managerBool, setManagerBool] = useState();
    const [transactionToExecute, setTransactionToExecute] = useState();
    useEffect(() => {
        setAddy(address);
    }, [address]);


    const { data, isLoading, isSuccess, write } = useContractWrite({
        address: '0x0644667f39cb9d87e884DF3C211a4363Cd4f5879',
        abi: relay.abi,
        functionName: 'executeTransaction',
    })

    const isBusiness = useContractRead({
        address: '0x0644667f39cb9d87e884DF3C211a4363Cd4f5879',
        abi: relay.abi,
        functionName: 'isBusiness',
        args: [address],
        onSuccess(data) {
            setBusinessBool(data);
        },
    });

    const isManager = useContractRead({
        address: '0x0644667f39cb9d87e884DF3C211a4363Cd4f5879',
        abi: relay.abi,
        functionName: 'isManager',
        args: [address],
        onSuccess(data) {
            setManagerBool(data);
        },
    });

    const transactions = useContractRead({
        address: '0x0644667f39cb9d87e884DF3C211a4363Cd4f5879',
        abi: relay.abi,
        functionName: 'pendingTransactions',
        args: [address],
        onSuccess(data) {
            console.log(data);
            setAlltransactions(data);
        },
    });

    const handlePayment = (transactionId) => {
        // handlePayment(transactionId);
        // You may want to update the state or perform other actions after payment handling
        console.log(transactionId)
    };

    return (
        <div className="flex flex-col items-center">
            <div className="bg-success p-2 rounded-lg shadow-md mb-2">
                {businessBool && <div>Logged in as business</div>}
                {managerBool && <div>Logged in as manager</div>}
            </div>



            <div>
                <div> Pending transactions</div>
                {alltransactions.length > 0 ? (
                    alltransactions.map((transaction, index) => (
                        <div className=" max-w-7xl bg-base-200 shadow-md mb-2 p-2 warp flex flex-col" key={index}><div>{JSON.stringify(transaction.pieces, (key, value) =>
                            typeof value === 'bigint'
                                ? parseInt(value.toString()) / 1000000000000000000
                                : value // return everything else unchanged
                        )}</div> {!transaction.paid ? <button className="btn btn-primary whitespace-nowrap"
                            onClick={() => handlePayment(1)}
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
