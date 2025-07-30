import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Props = {}

export function Navbar({}: Props) {
  return (
    <header className='absolute top-0 left-0 right-0 w-full py-3'>
        <nav className='bg-transparent'>
            <div className="container">
                <div className="flex items-center justify-between">
                    <Link href={"/"}><Image src={'/images/logo.png'} alt='logo' width={200} height={150} className='w-auto h-auto' /></Link>

                    <div className="flex">
                        <Avatar>
                            <AvatarFallback></AvatarFallback>
                        </Avatar>
                        <p className='font-medium underline text-white'>James</p>
                    </div>
                </div>
            </div>
        </nav>
    </header>
  )
}