import Image from 'next/image'
import React from 'react'

type Props = {}

export function Footer({}: Props) {
  return (
    <footer className='bg-[#2564ebda] py-10'>
        <div className="flex items-center gap-x-4 justify-center">
            <Image src={'/images/logo.png'} alt='logo' width={200} height={150} className='w-auto h-auto' />
            <p>© 2025 Blog genzet. All rights reserved.</p>
        </div> 
    </footer>
  )
}