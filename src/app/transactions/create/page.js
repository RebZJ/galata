"use client"

import React, { useState, useEffect } from 'react';
import { useContractWrite } from 'wagmi'
import relay from '../../../../artifacts/contracts/Relay.sol/Relay.json';
import { parseEther } from 'viem';
import { useAccount, useNetwork } from 'wagmi'


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

    const { data, isLoading, isSuccess, write } = useContractWrite({
        address: '0xBBd9a9C472F86eCAD897E2117B6047E8E8fCbA5F',
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
            <div>{addy}</div>
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
                        Amount: {item.amount}, ID: {item.id}
                    </li>
                ))}
            </ul>

            {jsonPayload && (
                <div>
                    <h3>JSON Payload</h3>
                    <pre>{jsonPayload}</pre>
                </div>
            )}
        </div>
    );
};


