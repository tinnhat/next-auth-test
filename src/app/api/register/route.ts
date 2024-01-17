import { connectToDb } from '@/lib/mongoDb'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { User } from '@/models/user'

export const POST = async (request: Request) => {
  try {
    const { name, email, password } = await request.json()
    await connectToDb()
    const hasPassword = await bcrypt.hash(password, 10)
    const newUser = {
      name,
      email,
      password: hasPassword,
    }
    const userExits = await User.find({ email })
    if (userExits.length > 0) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 })
    } else {
      await User.create(newUser)
      return NextResponse.json({ message: 'User Registered' }, { status: 200 })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error }, { status: 500 })
  }
}
