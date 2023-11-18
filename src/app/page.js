"use client"
import { useContractWrite } from 'wagmi'
import { useAccount, useNetwork } from 'wagmi'
import { useContractRead, useContractEvent } from 'wagmi'

import relay from '../../artifacts/contracts/Relay.sol/Relay.json';
import { useState, useEffect } from 'react'
export default function Home() {

  // function checkManager() {
  //   const isManager = useContractRead({
  //     address: '0xBBd9a9C472F86eCAD897E2117B6047E8E8fCbA5F',
  //     abi: relay.abi,
  //     functionName: 'isManager',
  //     args: ['0xEfED8aD69f4469d3bCd7f0cBb72AC658a109bCa7']
  //   })

  //   return isManager
  // }
  const [addy, setAddy] = useState(null)
  const { address, isConnecting, isDisconnected } = useAccount()
  useEffect(() => {
    setAddy(address)
  }, [address])


  // const { chain, chains } = useNetwork()

  // const { data, isLoading, isSuccess, write } = useContractWrite({
  //   address: '0xBBd9a9C472F86eCAD897E2117B6047E8E8fCbA5F',
  //   abi: relay.abi,
  //   functionName: 'feed',
  // })

  return (

    <div className="flex flex-col items-center">

      <h1 className=' text-2xl mt-10'> Welcome to Galata </h1>

      <button className={`btn  mt-10 shadow-md ${addy ? 'btn-secondary' : 'btn-disabled'}`}> Launch App</button>




    </div>
  )
}

