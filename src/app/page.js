"use client"
import { useContractWrite } from 'wagmi'
import { useAccount, useNetwork } from 'wagmi'
import { useContractRead, useContractEvent } from 'wagmi'
import Link from 'next/link';
import relay from '../../artifacts/contracts/Relay.sol/Relay.json';
import { useState, useEffect } from 'react'

import { useContractStore } from '@/context/ZustandContext';

export default function Home() {

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
      }
    }
    console.log(contractVal.contract);
  }, [JSON.stringify(contractVal)]);

  const [addy, setAddy] = useState(null)
  const { address, isConnecting, isDisconnected } = useAccount()


  const [charityBool, setCharityBool] = useState()
  const [businessBool, setBusinessBool] = useState()
  const [managerBool, setManagerBool] = useState()

  useEffect(() => {

    setAddy(address)
  }, [address])


  const isManager = useContractRead({
    address: contractVal.contract,
    abi: relay.abi,
    functionName: 'isManager',
    args: [address],
    onSuccess(data) {
      setManagerBool(data)
      console.log(data)
    }
  })

  const isBusiness = useContractRead({
    address: contractVal.contract,
    abi: relay.abi,
    functionName: 'isBusiness',
    args: [address],
    onSuccess(data) {
      setBusinessBool(data)
    }
  })

  const isCharity = useContractRead({
    address: contractVal.contract,
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
