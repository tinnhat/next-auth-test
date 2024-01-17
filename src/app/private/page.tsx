import React from 'react'

type Props = {}

export default function Private({}: Props) {
  return (
    <div className='w-full h-[100vh] flex justify-center items-center flex-col'>
      <p className='font-bold text-red-600 text-xl'>Private</p>
    </div>
  )
}
