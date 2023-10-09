import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className='mx-auto max-w-[400px]'>
      <div className='mt-28 mb-20 bg-[#22222B] p-5 rounded-lg'>
      {children}
      </div>
    </div>
  )
}
