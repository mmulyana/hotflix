'use client'

import { selectAuth } from '@/redux/reducers/auth'
import { PlayIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { Else, If, Then } from 'react-if'
import { useSelector } from 'react-redux'

export default function Navbar() {
  const { user } = useSelector(selectAuth)
  return (
    <div className='fixed w-full z-[21] h-16'>
      <div className='container7 max-w-6xl px-4 md:px-0 md:pl-[34px] mx-auto flex justify-between text-white items-center h-full'>
        <div className='flex items-center gap-6'>
          <Link
            href='/home'
            className='text-lg uppercase flex items-center gap-2'
          >
            <PlayIcon className='w-4 h-4 text-red-600' />
            <span>Hotflix</span>
          </Link>
          <div className='flex gap-4 text-sm'>
            <Link href='#'>New Movie</Link>
            <Link href='#'>TV</Link>
          </div>
        </div>
        <div>
          <If condition={user !== null}>
            <Then>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 rounded-full bg-gray-300/30 text-white flex items-center justify-center uppercase text-sm'>
                  {user?.username[0]}
                </div>
                <p>{user?.username}</p>
              </div>
            </Then>
            <Else>
              <Link
                href='/login'
                className='px-3.5 py-2 rounded bg-red-600 text-white text-sm'
              >
                Login
              </Link>
            </Else>
          </If>
        </div>
      </div>
    </div>
  )
}
