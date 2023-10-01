'use client'

import { useSelector } from 'react-redux'
import { removeUser, selectAuth } from '@/redux/reducers/auth'
import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@/service/firebase'
import { useAppDispatch } from '@/redux'
import { ChartBarIcon } from '@heroicons/react/20/solid'

export default function Page() {
  const { user, isLoading } = useSelector(selectAuth)
  const dispatch = useAppDispatch()

  if (isLoading) {
    return (
      <div className='min-h-screen'>
        <div className='mt-16'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_3fr] px-4 gap-5'>
            <div className='p-4 bg-[#22222b] rounded-lg h-40 animate-pulse'></div>
            <div>
              <div className='grid grid-cols-2 lg:grid-cols-3 gap-10 h-full'>
                <div className='bg-[#22222b] animate-pulse'></div>
                <div className='bg-[#22222b] animate-pulse'></div>
                <div className='bg-[#22222b] animate-pulse'></div>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-[1fr_3fr] px-4 gap-5 mt-5'>
            <div className='hidden lg:block'></div>
            <div className='p-4 rounded-lg bg-[#22222b] w-full animate-pulse'></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen'>
      <div className='mt-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_3fr] px-4 gap-5'>
          <div className='p-4 bg-[#22222b] rounded-lg'>
            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 rounded-full bg-gray-300/30 text-white text-lg flex items-center justify-center uppercase'>
                {user?.username[0]}
              </div>
              <p className='text-white'>{user?.username}</p>
            </div>
            <div className='mt-3 text-white'>
              <span className='text-sm opacity-80'>Email</span>
              <p>{user?.email}</p>
            </div>
          </div>
          <div>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-10 h-full'>
              <div className='bg-[#22222b] p-4 rounded-lg text-white flex flex-col justify-between'>
                <span className='text-white text-sm'>Favorite</span>
                <div className='flex justify-between items-end'>
                  <ChartBarIcon className='h-8 w-8 text-yellow-600' />
                  <span className='text-2xl'>10</span>
                </div>
              </div>
              <div className='bg-[#22222b] p-4 rounded-lg text-white flex flex-col justify-between'>
                <span className='text-white text-sm'>Wishlist</span>
                <div className='flex justify-between items-end'>
                  <ChartBarIcon className='h-8 w-8 text-teal-600' />
                  <span className='text-2xl'>10</span>
                </div>
              </div>
              <div className='bg-[#22222b] p-4 rounded-lg text-white flex flex-col justify-between'>
                <span className='text-white text-sm'>Review</span>
                <div className='flex justify-between items-end'>
                  <ChartBarIcon className='h-8 w-8 text-red-700' />
                  <span className='text-2xl'>10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_3fr] px-4 gap-5 mt-5'>
          <div className='hidden lg:block'></div>
          <div className='p-4 rounded-lg bg-[#22222b] w-full'>Tab</div>
        </div>
      </div>
    </div>
  )
}
