import RegisterFrom from '@/components/registerForm'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

import { redirect } from 'next/navigation'

type Props = {}

export default async function Register({}: Props) {
  const session = await getServerSession(authOptions)
  if(session) redirect('/dashboard')
  

  return (
    <div className='w-full h-[100vh] flex justify-center items-center flex-col'>
      <RegisterFrom/>
    </div>
  )
}
