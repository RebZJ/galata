"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'


export default function Transaction() {

    useEffect(() => {

    })

    return (<div className='flex flex-col items-center'>
        <button className='btn btn-primary whitespace-nowrap'>
            <Link href="/transactions/create">Create transaction</Link>
        </button>

        <div> Pending transactions</div>
    </div>)
}