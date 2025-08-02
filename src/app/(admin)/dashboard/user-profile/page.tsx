import React from 'react'
import { DashboardProfileContent } from './content'

export const metadata = {
    title: "User Profile"
}

export default function DashboardProfilePage() {
  return (
    <section className='h-full'>
        <div className="container h-full">
            <DashboardProfileContent />
        </div>
    </section>
  )
}