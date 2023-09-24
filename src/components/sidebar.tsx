'use client'

import { useAppDispatch } from '@/redux'
import { removeUser, selectAuth } from '@/redux/reducers/auth'
import { auth } from '@/service/firebase'
import {
  ArrowLeftOnRectangleIcon,
  BookmarkIcon,
  ClockIcon,
  StarIcon,
} from '@heroicons/react/24/outline'
import { signOut } from 'firebase/auth'
import Link from 'next/link'
import { Else, If, Then } from 'react-if'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
export default function Sidebar() {
  const { user, isLoading } = useSelector(selectAuth)
  const dispatch = useAppDispatch()

  function handleLogout() {
    signOut(auth)
    dispatch(removeUser())
    toast.success('You have been successfully logged out')
  }

  return (
    <div className='w-16 h-full fixed top-0 -left-20 lg:left-0 bg-[#1c1c25] z-20'>
      <div className='flex flex-col gap-6 h-full justify-between pl-4 sidebar-wrapper py-10'>
        <div />
        <div className='flex flex-col gap-4'>
          <div className='sidebar-item'>
            <StarIcon className='w-5 h-5 sidebar-icon' />
            <Link href='/profile/favorite' className='sidebar-link'>
              Favorite
            </Link>
          </div>
          <div className='sidebar-item'>
            <BookmarkIcon className='w-5 h-5 sidebar-icon' />
            <Link href='/profile/wishlist' className='sidebar-link'>
              Wishlist
            </Link>
          </div>
          <div className='sidebar-item'>
            <ClockIcon className='w-5 h-5 sidebar-icon' />
            <Link href='/profile/wishlist' className='sidebar-link'>
              History watch
            </Link>
          </div>
        </div>
        <If condition={user !== null}>
          <Then>
            <div className='sidebar-item'>
              <ArrowLeftOnRectangleIcon className='w-5 h-5 sidebar-icon' />
              <button onClick={handleLogout} className='sidebar-link'>
                Logout
              </button>
            </div>
          </Then>
          <Else>
            <div />
          </Else>
        </If>
      </div>
    </div>
  )
}
