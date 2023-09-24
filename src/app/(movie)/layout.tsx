import Sidebar from '@/components/sidebar'
import Navbar from '@/components/navbar'
import React from 'react'
import Footer from '@/components/footer'

type Props = {
  children: React.ReactNode
}

export default function MovieLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <div className='grid grid-cols-1 lg:grid-cols-[36px_1fr]'>
        <div>
          <Sidebar />
        </div>
        <div className='container h-fit lg:max-w-6xl mx-auto overflow-x-hidden pb-14'>
          {children}
        </div>
      </div>
      <Footer />
    </>
  )
}
