import Image from 'next/image'
import React from 'react'

type Props = {}

export function Footer({}: Props) {
  return (
    <footer className='bg-[#2564ebda] py-10'>
        <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
            <Image src={'/images/logo-white.png'} alt='logo' width={200} height={150} className='w-32 h-6 object-contain' />
            <p className='text-white'>© 2025 Blog genzet. All rights reserved.</p>
        </div> 
    </footer>
  )
}