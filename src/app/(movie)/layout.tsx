import Sidebar from '@/components/sidebar'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function MovieLayout({ children }: Props) {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-[56px_1fr]'>
      <div className='bg-yellow-100'>
        <Sidebar />
      </div>
      <div className='container h-fit lg:max-w-6xl mx-auto overflow-x-hidden'>
        {children}
      </div>
    </div>
  )
}
