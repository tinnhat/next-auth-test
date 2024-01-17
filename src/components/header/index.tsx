'use client'

import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useSession, getSession } from 'next-auth/react'
import { ClipLoader } from 'react-spinners'

type Props = {}

export default function Header({}: Props) {
  const path = usePathname()
  const { data: session, status } = useSession()

  const renderGroupBtn = () => {
    if (status === 'loading') {
      return <ClipLoader color="#36d7b7" />
    } else {
      return session?.user ? (
        <>
          <NavbarItem className='lg:flex'>
            <Button color='primary' variant='flat' onClick={() => signOut()}>
              Logout
            </Button>
          </NavbarItem>
        </>
      ) : (
        <>
          <NavbarItem className='hidden lg:flex'>
            <Link href='/login'>Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color='primary' href='/register' variant='flat'>
              Sign Up
            </Button>
          </NavbarItem>
        </>
      )
    }
  }
  return (
    <header>
      <Navbar>
        <NavbarBrand>
          <Link href='/' className='text-green-500'>
            Logo
          </Link>
        </NavbarBrand>
        <NavbarContent className='hidden sm:flex gap-4' justify='center'>
          <NavbarItem>
            <Link href='/' className={path === '/' ? 'text-green-500' : 'text-white'}>
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href='/dashboard' className={path === '/dashboard' ? 'text-green-500' : 'text-white'}>
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href='/private' className={path === '/private' ? 'text-green-500' : 'text-white'}>
              Private
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify='end'>{renderGroupBtn()}</NavbarContent>
      </Navbar>
    </header>
  )
}
