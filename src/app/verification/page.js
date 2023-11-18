"use client"

import { useState } from 'react'
import { useAccount } from 'wagmi'

// User types: business, charity, manager

export default function Verify() {
    const { address, isConnecting, isDisconnected } = useAccount()
    const [userType, useUserUserType] = useState("manager")


    return (

        <div className="flex flex-col">
            Your current address {address}

            <button className="btn btn-primary w-min whitespace-nowrap">Add proof</button>

        </div>
    )
}

