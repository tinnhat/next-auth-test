'use server'
import { User } from '@/models/user'
import { connectToDb } from './mongoDb'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
export const register = async (formData: FormData) => {
  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')?.toString()

  try {
    connectToDb()
    const userExits = await User.find({ email })
    if (userExits.length > 0) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 })
    } else {
      if (name && email && password) {
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
          name,
          email,
          password: hashPassword,
        })
        await newUser.save()        
        return NextResponse.json({ message: 'User Registered' }, { status: 200 })
      }
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error }, { status: 500 })
  }
}
