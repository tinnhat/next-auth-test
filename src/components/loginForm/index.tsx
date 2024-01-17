
'use client'
import React, { useState } from 'react'
import { Input, Button } from '@nextui-org/react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
type Props = {}

export default function LoginForm({}: Props) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const router = useRouter()
  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })
      if (res?.error) {
        alert(res?.error)
        return
      }
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>
      <form action={''} onSubmit={handleLogin}>
        <Input
          isRequired
          onChange={e => setEmail(e.target.value)}
          type='email'
          label='Email'
          className='max-w-xs my-2'
        />
        <Input
          isRequired
          onChange={e => setPassword(e.target.value)}
          type='password'
          label='Password'
          placeholder='Enter your password'
          className='max-w-xs'
        />
        <Button type='submit' className='w-full mt-2'>
          Login
        </Button>
      </form>
    </div>
  )
}