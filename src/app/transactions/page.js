"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'
import relay from '../../../artifacts/contracts/Relay.sol/Relay.json';
import { parseEther } from 'viem';
import { useAccount, useNetwork } from 'wagmi'

export default function Transaction() {

    const [addy, setAddy] = useState(null)
    const { address, isConnecting, isDisconnected } = useAccount()
    useEffect(() => {
        setAddy(address)
    }, [address])

    const isBusiness = useContractRead({
        address: '0x0644667f39cb9d87e884DF3C211a4363Cd4f5879',
        abi: relay.abi,
        functionName: 'isBusiness',
        args: [addy]
    })

    // const transactions = useContractRead({
    //     address: '0x0644667f39cb9d87e884DF3C211a4363Cd4f5879',
    //     abi: relay.abi,
    //     functionName: 'transactions',
    //     args: ['0']
    // })

    // const transactionCount = useContractRead({
    //     address: '0x0644667f39cb9d87e884DF3C211a4363Cd4f5879',
    //     abi: relay.abi,
    //     functionName: 'transactionCount'
    // })

    // useEffect(() => {
    //     console.log(transactions)
    // }, [transactionCount, transactions])

    return (<div className='flex flex-col items-center'>

        <div>Is business? {JSON.stringify(isBusiness.data)}</div>
        <button className='btn btn-primary whitespace-nowrap'>
            <Link href="/transactions/create">Create transaction</Link>
        </button>

        <div> Pending transactions</div>
    </div>)
}