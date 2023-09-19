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
    <div>
      <button onClick={handleLogout}>logout</button>
      <p>{user?.email} - {isLoading ? 'true': 'false'}</p>
    </div>
  )
}
