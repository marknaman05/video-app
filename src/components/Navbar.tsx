import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          alt="FaceTime Logo"
          width={32}
          height={32}
          className="max-sm:size-10"
        />
        <p className='text-[26px] font-extrabold text-white max-sm:hidden'>FaceTime</p>
      </Link>
      <p className='gap-5 font-light text-white max-sm:hidden px-4'>Made with ♥️ by <Link href="https://github.com/marknaman05" className='font-bold'>Naman Markhedkar</Link></p>

      <div className="flex-between gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>

        <MobileNav/>
      </div>
    </nav>
  )
}

export default Navbar