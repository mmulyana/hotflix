'use client'

import { useEffect } from 'react'
import { auth } from '@/service/firebase'
import { useSelector } from 'react-redux'
import { handleLoading, selectAuth, setUser } from '@/redux/reducers/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { getUser } from '@/service/user'
import { User } from '@/model/auth'
import { useAppDispatch } from '@/redux'

type Props = {
  children: React.ReactNode
}

export default function AuthWrapper({ children }: Props) {
  const { user, isLoading } = useSelector(selectAuth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        dispatch(handleLoading({ value: false }))
        return
      }
      console.log(currentUser)
      const user = await getUser(currentUser.uid)
      if (user) {
        const payload: User = {
          uid: currentUser.uid,
          email: user.email,
          username: user.username,
        }
        dispatch(setUser(payload))
      } else {
      }
    })

    return () => unsubscribe()
  }, [])

  return <>{children}</>
}
