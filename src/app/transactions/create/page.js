"use client"

import React, { useState, useEffect } from 'react';
import { useContractWrite } from 'wagmi'
import relay from '../../../../artifacts/contracts/Relay.sol/Relay.json';
import { parseEther } from 'viem';
import { useAccount, useNetwork } from 'wagmi'
import {useContractStore} from "@/context/ZustandContext";


export default function CreateTransaction() {

    return (
        <div className="flex flex-col w-screen items-center">
            <h2 className='prose'> Create a batch transaction</h2>
            <ListToJSONConverter></ListToJSONConverter>
        </div>
    )
}

const ListToJSONConverter = () => {
    const [list, setList] = useState([]);
    const [jsonPayload, setJsonPayload] = useState(null);

    const [newAmount, setNewAmount] = useState('');
    const [newId, setNewId] = useState('');
    const [fee, setFee] = useState()
    const [client, setClient] = useState()
    const [addy, setAddy] = useState(null)
    const { address, isConnecting, isDisconnected } = useAccount()
    useEffect(() => {
        setAddy(address)
    }, [address])

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
        functionName: 'generateTransaction',
    })

    useEffect(() => {
        console.log(data)
    }, [data])


    const addElementToList = () => {
        if (newAmount.trim() !== '' && newId.trim() !== '') {
            const newItem = {

                destination: newId,
                value: parseEther(newAmount),
            };

            setList([...list, newItem]);

            setNewAmount('');
            setNewId('');
        }
    };

    function sendTransactionToChain() {
        console.log(addy)
        write({
            args: [client, list, parseEther(fee)],
            from: addy
        })
    }

    useEffect(() => {
        // const payload = JSON.stringify({ transactions: list, fee: fee, client: client });
        // setJsonPayload(payload);
    }, [list, fee, client])

    return (
        <div className="flex flex-col items-center prose space-y-2 bg-base-200 w-min p-4 rounded-lg shadow-md " >
            <div>Add your management fee and the client on behalf of whom you're making the batch transaction</div>
            <div className="flex flex-row space-x-4 ">
                <input
                    className=' input'
                    type="text"
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                    placeholder="Add Fee"
                />

                <input
                    className=' input'
                    type="text"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="Enter Client ID"
                />
            </div>

            <div>Add transactions which will be batch executed</div>
            <div className="flex flex-row space-x-4 ">

                <input
                    className=' input'
                    type="text"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    placeholder="Add amount"
                />
                <input
                    className=' input'
                    type="text"
                    value={newId}
                    onChange={(e) => setNewId(e.target.value)}
                    placeholder="Add ID"
                />

            </div>
            <div className="flex flex-col items-center space-y-2 m-2">
                <button className='btn btn-primary w-min whitespace-nowrap' onClick={addElementToList}>Add Transaction</button>

                {list.length != 0 ? <button className='btn btn-primary w-min whitespace-nowrap' onClick={sendTransactionToChain}>Create batch transaction</button> : null}
            </div>
            <ul>
                {list.map((item, index) => (
                    <li key={index}>
                        Amount: {parseInt(item.value.toString()) / (1e18)} ETH, ID: {item.destination}
                    </li>
                ))}
            </ul>
            <div className="flex flex-row" >
                <div>Managerial fee: {fee} ETH, Client id: {client}</div>

            </div>
            {jsonPayload && (
                <div>
                    <h3>JSON Payload</h3>
                    <pre>{jsonPayload}</pre>
                </div>
            )}
        </div>
    );
};


