'use client'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import { selectAuth } from '@/redux/reducers/auth'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

type Props = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  const { user, isLoading } = useSelector(selectAuth)

  useEffect(() => {
    if (isLoading) return
    if (!user) {
      redirect('/login')
    }
  }, [user, isLoading])

  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-[36px_1fr]'>
        <div>
          <Sidebar />
        </div>
        <div className='container h-fit lg:max-w-6xl mx-auto overflow-x-hidden pb-14'>
          {children}
        </div>
      </div>
    </>
  )
}
