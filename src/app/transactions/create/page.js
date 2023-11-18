"use client"

import React, { useState, useEffect } from 'react';
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

    const addElementToList = () => {
        if (newAmount.trim() !== '' && newId.trim() !== '') {
            const newItem = {

                amount: newAmount,
                id: newId,
            };

            setList([...list, newItem]);

            setNewAmount('');
            setNewId('');
        }


    };

    useEffect(() => {
        const payload = JSON.stringify({ transactions: list });
        setJsonPayload(payload);
    }, [list])

    return (
        <div className="flex flex-col items-center prose space-y-2 bg-base-200 w-min p-4 rounded-lg shadow-md " >


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

                {list.length != 0 ? <button className='btn btn-primary w-min whitespace-nowrap' onClick={addElementToList}>Create batch transaction</button> : null}
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


