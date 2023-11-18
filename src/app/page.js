"use client"
import { useContractWrite } from 'wagmi'
import { useAccount, useNetwork } from 'wagmi'
import { useContractRead, useContractEvent } from 'wagmi'
import { useEffect } from 'react'
import relay from '../../artifacts/contracts/Relay.sol/Relay.json';

export default function Home() {

  useEffect(() => {
    console.log(relay.abi)
  }, [])

  const { address, isConnecting, isDisconnected } = useAccount()
  const { chain, chains } = useNetwork()

  const eventListener = useContractEvent({
    address: '0xBBd9a9C472F86eCAD897E2117B6047E8E8fCbA5F',
    abi: relay.abi,
    eventName: 'TransactionAdded',
    listener(log) {
      console.log("HOLA", log)
    },
  })

  return (

    <div className="flex flex-col items-center">

      <h1 className=' text-2xl mt-10'> Welcome to Galata </h1>
      {address ?
        <button className=" btn btn-secondary mt-10 shadow-md"> Launch App</button> : <div className="mt-10 bg-red-400 rounded-md shadow-sm p-2 ">Please connect wallet to use dapp</div>}

      <div>Connected to: {chain.name}</div>
    </div>
  )
}

