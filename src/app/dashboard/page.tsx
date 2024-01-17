'use client'
import React from 'react'
import { Avatar, Button } from '@nextui-org/react'
import { useSession, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type Props = {}

export default function Dashboard({}: Props) {
  const router = useRouter()
  const { data: session, status } = useSession()
  
  if (status === 'loading') {
    return <div className='w-full h-[100vh] flex justify-center items-center flex-col '>Loading...</div>
  }
  if (status === 'unauthenticated') {
    router.push('/login')
  }
  return (
    <div className='w-full h-[100vh] flex justify-center items-center flex-col '>
      <h1 className='text-slate-50 text-xl my-5'>Dashboard</h1>
      <div className='flex flex-col justify-center items-center'>
        <Avatar isBordered size='lg' src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
        <p className='font-bold my-2'>
          {session?.user?.name} - {session?.user?.email}
        </p>
      </div>
    </div>
  )
}
