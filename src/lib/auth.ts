import { connectToDb } from '@/lib/mongoDb'
import { User } from '@/models/user'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { AuthOptions } from 'next-auth'
import bcrypt from 'bcryptjs'

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials: any) {
        const { email, password } = credentials
        try {
          await connectToDb()
          const user = await User.findOne({ email })
          if (!user) {
            return null
          }
          const checkPassword = await bcrypt.compare(password, user.password)
          if (!checkPassword) {
            return null
          }

          return user
        } catch (error) {
          console.log(error)
        }
      },
    }),
    // ...add more providers here
  ],
  session: {
    strategy: 'jwt' as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
}
