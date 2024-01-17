import LoginForm from '@/components/loginForm'
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
type Props = {}

export default async function Login({}: Props) {
  const session = await getServerSession(authOptions)
  if (session) redirect('/dashboard')
  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>
      <LoginForm />
    </div>
  )
}
