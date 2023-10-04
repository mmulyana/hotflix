'use client'

import { useSelector } from 'react-redux'
import { removeUser, selectAuth } from '@/redux/reducers/auth'
import React, { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@/service/firebase'
import { useAppDispatch } from '@/redux'
import {
  BookmarkIcon,
  ChartBarIcon,
  ChatBubbleBottomCenterTextIcon,
  StarIcon,
} from '@heroicons/react/20/solid'
import { ResponseProfileData, getProfileData } from '@/service/profile'
import Link from 'next/link'
import { Case, Switch } from 'react-if'
import { ReviewI } from '@/service/review'
import { BASE_URL_IMG } from '@/utils'

type Props = {
  searchParams: Record<string, string> | null | undefined
}

export default function Page({ searchParams }: Props) {
  const { user, isLoading } = useSelector(selectAuth)
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!user) return
    async function getData(uid: string) {
      const { favorites, reviews, wishlists } = await getProfileData(uid)
      const payload = {
        favorites,
        reviews,
        wishlists,
      }
      setData(payload)
      setLoading(false)
    }

    getData(user.uid)
  }, [user])

  if (isLoading) {
    return <LoadingState />
  }

  console.log(data)

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
          <div className='grid grid-cols-2 lg:grid-cols-3 gap-5 h-full'>
            <div className='bg-[#22222b] p-4 rounded-lg text-white flex flex-col justify-between'>
              <span className='text-white text-sm'>Favorite</span>
              <div className='flex justify-between items-end'>
                <StarIcon className='h-8 w-8 text-yellow-600' />
                {loading ? (
                  <div className='w-4 h-4 bg-gray-300 animate-pulse' />
                ) : (
                  <span className='text-2xl'>{data?.favorites.length}</span>
                )}
              </div>
            </div>
            <div className='bg-[#22222b] p-4 rounded-lg text-white flex flex-col justify-between'>
              <span className='text-white text-sm'>Wishlist</span>
              <div className='flex justify-between items-end'>
                <BookmarkIcon className='h-8 w-8 text-teal-600' />
                {loading ? (
                  <div className='w-4 h-4 bg-gray-300 animate-pulse' />
                ) : (
                  <span className='text-2xl'>{data?.wishlists.length}</span>
                )}
              </div>
            </div>
            <div className='bg-[#22222b] p-4 rounded-lg text-white flex flex-col justify-between'>
              <span className='text-white text-sm'>Review</span>
              <div className='flex justify-between items-end'>
                <ChatBubbleBottomCenterTextIcon className='h-8 w-8 text-violet-500' />
                {loading ? (
                  <div className='w-4 h-4 bg-gray-300 animate-pulse' />
                ) : (
                  <span className='text-2xl'>{data?.reviews.length}</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_3fr] px-4 gap-5 mt-5'>
          <div className='hidden lg:block'></div>
          <div className='p-4 rounded-lg bg-[#22222b] w-full'>
            <div className='border-b-2 border-gray-500/50 w-full md:w-1/2 h-8 grid grid-cols-3 text-sm pr-0 md:pr-12'>
              <Link
                href='?tab=favorite'
                className={[
                  'px-2',
                  searchParams?.tab === 'favorite'
                    ? 'border-red-600 -mb-[2px] border-b-[4px] text-white'
                    : 'text-white/60',
                ].join(' ')}
              >
                Favorites
              </Link>
              <Link
                href='?tab=wishlist'
                className={[
                  'px-2',
                  searchParams?.tab === 'wishlist'
                    ? 'border-red-600 -mb-[2px] border-b-[4px] text-white'
                    : 'text-white/60',
                ].join(' ')}
              >
                Wishlist
              </Link>
              <Link
                href='?tab=reviews'
                className={[
                  'px-2',
                  searchParams?.tab === 'reviews'
                    ? 'border-red-600 -mb-[2px] border-b-[4px] text-white'
                    : 'text-white/60',
                ].join(' ')}
              >
                Reviews
              </Link>
            </div>
            <div className='mt-4 flex flex-col gap-2'>
              <Switch>
                <Case condition={searchParams?.tab === 'reviews'}>
                  {data?.reviews.map((review: ReviewI) => (
                    <div
                      key={review.id}
                      className='grid grid-cols-[1fr_4fr] gap-3'
                    >
                      <img
                        src={BASE_URL_IMG + review.movie_img}
                        className='h-14 md:h-20 w-auto object-fit object-center rounded-md'
                      />
                      <div className='flex flex-col justify-center items-start'>
                        <div className='flex items-center gap-2'>
                          <p className='text-sm text-white/30'>
                            {review.movie_name}
                          </p>
                          <div className='w-1 h-1 rounded-full bg-gray-100' />
                          <div className='flex items-center gap-1'>
                            <StarIcon className='w-3 h-3 text-yellow-400' />
                            <p className='text-white text-xs'>
                              {review.rating}
                            </p>
                          </div>
                        </div>
                        <p className='text-white text-lg mt-2'>
                          <span className='text-2xl'>&quot;</span>
                          {review.review}
                          <span className='text-2xl'>&quot;</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </Case>
                <Case condition={searchParams?.tab === 'favorite'}>
                  {data?.favorites.map((review: any) => (
                    <div
                      key={review.id}
                      className='grid grid-cols-[1fr_4fr] gap-3'
                    >
                      <img
                        src={BASE_URL_IMG + review.img}
                        className='h-14 md:h-20 w-auto object-fit object-center rounded-md'
                      />
                      <div className='flex flex-col justify-center items-start'>
                        <p className='text-white'>{review.title}</p>
                      </div>
                    </div>
                  ))}
                </Case>
                <Case condition={searchParams?.tab === 'wishlist'}>
                  {data?.wishlists.map((review: any) => (
                    <div
                      key={review.id}
                      className='grid grid-cols-[1fr_4fr] gap-3'
                    >
                      <img
                        src={BASE_URL_IMG + review.img}
                        className='h-14 md:h-20 w-auto object-fit object-center rounded-md'
                      />
                      <div className='flex flex-col justify-center items-start'>
                        <p className='text-white'>{review.title}</p>
                      </div>
                    </div>
                  ))}
                </Case>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LoadingState() {
  return (
    <div className='min-h-screen'>
      <div className='mt-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_3fr] px-4 gap-5'>
          <div className='p-4 bg-[#22222b] rounded-lg h-40 animate-pulse'></div>
          <div className='grid grid-cols-2 lg:grid-cols-3 gap-5 h-full'>
            <div className='bg-[#22222b] animate-pulse rounded-lg'></div>
            <div className='bg-[#22222b] animate-pulse rounded-lg'></div>
            <div className='bg-[#22222b] animate-pulse rounded-lg'></div>
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
