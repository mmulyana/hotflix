'use client'

import { MovieI } from '@/model/movie'
import { BASE_URL, BASE_URL_IMG, TOKEN } from '@/utils'
import { StarIcon } from '@heroicons/react/20/solid'
import { useEffect, useMemo, useState } from 'react'
import { If, Then } from 'react-if'

export default function HeroMovie() {
  const [data, setData] = useState<MovieI[] | []>([])
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    async function getMovie() {
      try {
        const res = await fetch(
          `${BASE_URL}/movie/now_playing?api_key=${TOKEN}`
        )
        const data = await res.json()
        setData(data.results)
      } catch (error) {
        console.log(error)
      }
    }

    getMovie()
  }, [])

  const year = useMemo(() => {
    if (data.length === 0) return
    const tmp = data[0]?.release_date as string
    return tmp.slice(0, 4)
  }, [data, index])

  return (
    <div className='w-full h-[480px] overflow-hidden'>
      <div className='px-4 h-[480px] flex flex-col items-start justify-center absolute left-0 md:left-16 z-10 max-w-[400px] bg-gradient-to-r from-[#1c1c25]/100 to-[#1c1c25]/0'>
        <h1 className='text-2xl text-white'>{data[0]?.title}</h1>
        <div className='flex gap-2 items-center mt-2'>
          <If condition={!!year}>
            <Then>
              <span className='px-2.5 py-1 rounded-full bg-gray-100/50 text-white text-sm'>
                {year}
              </span>
              <div className='w-1.5 h-1.5 rounded-full bg-gray-100' />
              <p className='text-sm text-white uppercase'>
                {data[0]?.original_language}
              </p>
              <div className='w-1.5 h-1.5 rounded-full bg-gray-100' />
              <div className='flex items-center gap-1'>
                <StarIcon className='w-5 h-5 text-yellow-400' />
                <p className='text-sm text-white mt-1'>
                  {data[0]?.vote_average}
                </p>
              </div>
            </Then>
          </If>
        </div>
        <p className='text-white mt-3 text-sm'>
          {data[0]?.overview}
        </p>
      </div>
      <div className='h-full w-full absolute top-0 left-0 z-0'>
        <img
          src={BASE_URL_IMG + data[0]?.backdrop_path}
          className='w-full h-[480px] object-cover object-left-top'
        />
      </div>
    </div>
  )
}
