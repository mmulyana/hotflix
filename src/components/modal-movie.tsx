import Link from 'next/link'

import { IMovieDetail } from '@/model/movie'
import { XCircleIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { TOKEN } from '@/utils'

type Props = {
  detail: IMovieDetail | null
  loading: boolean
}

export default function ModalMovie({ detail, loading }: Props) {
  return (
    <div className='fixed top-0 left-0 w-full bg-black/90 z-10 h-full overflow-y-auto p-0 md:p-4'>
      <div className='rounded-none md:rounded-xl bg-[#2b2b33] h-[800px] max-w-5xl mx-auto relative overflow-hidden'>
        {!loading ? (
          <>
            <div className='h-[480px] w-full relative'>
              <img
                src={
                  'https://image.tmdb.org/t/p/original/' +
                    detail?.backdrop_path ?? detail?.poster_path
                }
                className='h-full w-full object-cover object-center'
              />
              <div className='absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#2b2b33] to-[#2b2b33]/0' />
            </div>
          </>
        ) : (
          <div className='h-[400px] w-full bg-gray-500 animate-pulse' />
        )}

        {!loading ? (
          <div className='-mt-8 relative z-10 px-4 md:px-8'>
            <p className='text-5xl font-normal text-white'>{detail?.title}</p>
            <p className='mt-2 text-white'>{detail?.overview}</p>
            <div className='mt-4 flex gap-2'>
              {detail?.genres.map((genre) => <span key={genre.id} className='border border-gray-50 px-4 py-1 rounded-full text-sm text-white'>{genre.name}</span>)}
            </div>
            <div></div>
          </div>
        ) : (
          <div className='mt-2 relative z-10 px-4 md:px-8'>
            <div className='h-10 w-4/5 rounded-lg bg-gray-500 animate-pulse' />
            <div className='mt-2 h-4 w-3/5 bg-gray-500 rounded-md animate-pulse'></div>
            <div className='mt-2 h-4 w-3/5 bg-gray-500 rounded-md animate-pulse'></div>
          </div>
        )}
        <Link href='/home' className='absolute top-4 right-4 z-10'>
          <XCircleIcon className='text-white w-10 h-10' />
        </Link>
      </div>
    </div>
  )
}
