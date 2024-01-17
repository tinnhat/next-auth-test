//client component

'use client'
import React, { useState } from 'react'
import { Input, Button } from '@nextui-org/react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
type Props = {}

export default function RegisterFrom({}: Props) {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const router = useRouter()

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!name || !email || !password) {
      setError('Please fill in all fields')
      return
    }
    try {
      const data = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })
      const result = await data.json()
      console.log(data, result)

      if (data.status === 200) {
        router.push('/')
      } else {
        alert(result.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='w-full h-[100vh] flex justify-center items-center flex-col'>
      <form action={''} onSubmit={handleSubmit}>
        <Input
          value={email}
          type='email'
          label='Email'
          className='max-w-xs my-2'
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          value={name}
          type='name'
          label='Full name'
          className='max-w-xs'
          onChange={e => setName(e.target.value)}
        />
        <Input
          value={password}
          type='password'
          label='Password'
          className='max-w-xs my-2'
          onChange={e => setPassword(e.target.value)}
        />
        {error && <p className='text-red-600 font-bold text-center'>{error}</p>}
        <Button type='submit' className='w-full mt-2'>
          Register
        </Button>
      </form>
    </div>
  )
}

//server component

// import React from 'react'
// import { Input, Button } from '@nextui-org/react'
// import { redirect } from 'next/navigation'
// import { register } from '@/lib/actions'
// type Props = {}

// export default function RegisterFrom({}: Props) {
//   const handleSubmit = async (formData: FormData) => {
//     'use server'

//     const result = await register(formData)
//     if (result?.ok) {
//       redirect('/')
//     } else {
//       throw new Error()
//     }
//   }
//   return (
//     <div className='w-full h-[100vh] flex justify-center items-center flex-col'>
//       <form action={handleSubmit}>
//         <Input isRequired name='email' type='email' label='Email' className='max-w-xs my-2' />
//         <Input isRequired name='name' type='name' label='Full name' className='max-w-xs' />
//         <Input isRequired name='password' type='password' label='Password' className='max-w-xs my-2' />
//         <Button type='submit' className='w-full mt-2'>
//           Register
//         </Button>
//       </form>
//     </div>
//   )
// }
