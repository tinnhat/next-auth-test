import { connectToDb } from '@/lib/mongoDb'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { User } from '@/models/user'

export const POST = async (request: Request) => {
  try {
    const { email, password } = await request.json()
    await connectToDb()
    const userExits = await User.find({ email })
    if (userExits) {
      const checkPassword = await bcrypt.compareSync(password, userExits[0].password) // true
      if (checkPassword) {
        return NextResponse.json({ message: 'Login Success' }, { status: 200 })
      } else {
        return NextResponse.json({ message: 'Wrong Password' }, { status: 400 })
      }
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 400 })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error }, { status: 500 })
  }
}
