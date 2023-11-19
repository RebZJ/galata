"use client"
import { useContractWrite } from 'wagmi'
import { useAccount, useNetwork } from 'wagmi'
import { useContractRead, useContractEvent } from 'wagmi'
import Link from 'next/link';
import relay from '../../artifacts/contracts/Relay.sol/Relay.json';
import { useState, useEffect } from 'react'
export default function Home() {


  const [addy, setAddy] = useState(null)
  const { address, isConnecting, isDisconnected } = useAccount()


  const [charityBool, setCharityBool] = useState()
  const [businessBool, setBusinessBool] = useState()
  const [managerBool, setManagerBool] = useState()

  useEffect(() => {
    setAddy(address)
  }, [address])


  const isManager = useContractRead({
    address: '0x0644667f39cb9d87e884DF3C211a4363Cd4f5879',
    abi: relay.abi,
    functionName: 'isManager',
    args: [address],
    onSuccess(data) {
      setManagerBool(data)
      console.log(data)
    }
  })

  const isBusiness = useContractRead({
    address: '0x0644667f39cb9d87e884DF3C211a4363Cd4f5879',
    abi: relay.abi,
    functionName: 'isBusiness',
    args: [address],
    onSuccess(data) {
      setBusinessBool(data)
    }
  })

  const isCharity = useContractRead({
    address: '0x0644667f39cb9d87e884DF3C211a4363Cd4f5879',
    abi: relay.abi,
    functionName: 'isCharity',
    args: [address],
    onSuccess(data) {
      setCharityBool(data)
    }
  })

  // const { chain, chains } = useNetwork()

  // const { data, isLoading, isSuccess, write } = useContractWrite({
  //   address: '0xBBd9a9C472F86eCAD897E2117B6047E8E8fCbA5F',
  //   abi: relay.abi,
  //   functionName: 'feed',
  // })

  return (

    <div className="flex flex-col items-center">

      <h1 className=' text-2xl mt-10'> Welcome to Galata </h1>
      <div className="bg-success p-2 rounded-lg shadow-md">
        {businessBool ? <div>Logged in as business</div> : null}
        {charityBool ? <div>Logged in as charity</div> : null}
        {managerBool ? <div>Logged in as manager</div> : null}
      </div>

      {/* <button className={`btn  mt-10 shadow-md ${addy ? 'btn-secondary' : 'btn-disabled'}`}> Launch App</button> */}

      {addy ? null : <div className="m-2">Please login to use app!</div>}

      <div className="mt-10 bg-base-200 p-10 rounded-md shadow-sm">
        {addy && !charityBool ? <button className="btn btn-primary mt-2 shadow-md">  <Link href="/transactions"> Transactions</Link> </button> : null}

      </div>

      {/* {businessBool ? <div>Logged in as business</div> : null}
        {charityBool ? <div>Logged in as charity</div> : null} */}
      {managerBool ? <ManagerComp></ManagerComp> : null}

    </div>
  )
}


function ManagerComp() {
  return (<div>

  </div>)
}
