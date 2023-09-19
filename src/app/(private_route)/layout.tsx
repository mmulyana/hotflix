'use client'

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
    <div>
      <p>Profile Layout</p>
      {children}
    </div>
  )
}
