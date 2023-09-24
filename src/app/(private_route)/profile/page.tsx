'use client'

import { useSelector } from 'react-redux'
import { removeUser, selectAuth } from '@/redux/reducers/auth'
import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@/service/firebase'
import { useAppDispatch } from '@/redux'

export default function Page() {
  const { user, isLoading } = useSelector(selectAuth)
  const dispatch = useAppDispatch()

  function handleLogout() {
    signOut(auth)
    dispatch(removeUser())
  }
  
  return (
    <div className='min-h-screen'>
      <div className='mt-16'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 rounded-full bg-gray-300/30 text-white text-lg flex items-center justify-center uppercase'>
              {user?.username[0]}
            </div>
            <p className='text-white'>{user?.username}</p>
          </div>
          <div>
            <button className='px-4 py-1 rounded-lg bg-gray-300/20 text-white text-sm'>Setting</button>
          </div>
        </div>
      </div>
    </div>
  )
}
