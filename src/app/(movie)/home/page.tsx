'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import CardMovie from '@/component/card-movie'
import { MovieI } from '@/model/movie'
import Swiper from 'react-id-swiper'
import 'swiper/css'
import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

function page() {
  const sliderRef = useRef(null) as any
  const [movies, setMovies] = useState<MovieI[] | null>(null)
  const params = {
    slidesPerView: 5,
    spaceBetween: 10,
    loop: true,
  }

  useEffect(() => {
    async function getMovie() {
      const token = process.env.NEXT_PUBLIC_TOKEN
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${token}`
      )
      if (!data.ok) {
        throw new Error('Failed to fetch data')
      }

      const res = await data.json()
      setMovies(res.results)
    }

    getMovie()
  }, [])

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current.swiper.slidePrev()
  }, [])

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current.swiper.slideNext()
  }, [])

  return (
    <div className='overflow-x-hidden relative'>
      <div className='container mx-auto max-w-6xl'>
        <p className='text-white mb-2'>Top Rated</p>
      </div>
      <div
        className={[
          'container mx-auto relative',
          movies !== null ? 'h-[calc(100%+20px)]' : 'h-44',
        ].join(' ')}
      >
        {typeof movies !== null ? (
          <Swiper
            ref={sliderRef}
            {...params}
            // @ts-ignore
            breakpoints={{
              400: {
                slidesPerView: 2,
              },
              639: {
                slidesPerView: 3,
              },
              1000: {
                slidesPerView: 5,
              },
            }}
          >
            {movies?.map((movie: MovieI) => (
              <div
                key={movie.id}
                className='relative hover:scale-125 hover:z-10'
              >
                <CardMovie data={movie} />
              </div>
            ))}
          </Swiper>
        ) : null}
        <div
          className='absolute left-0 top-1/2 -translate-y-1/2 z-10 h-40 w-20 cursor-pointer flex items-center justify-center bg-gradient-to-r from-[#1c1c25] to-[#1c1c25]/0'
          onClick={handlePrev}
        >
          <ChevronLeftIcon className='text-white h-12 w-12' />
        </div>
        <div
          className='absolute right-0 top-1/2 -translate-y-1/2 z-10 h-40 w-20 cursor-pointer flex items-center justify-center bg-gradient-to-l from-[#1c1c25] to-[#1c1c25]/0'
          onClick={handleNext}
        >
          <ChevronRightIcon className='text-white h-12 w-12' />
        </div>
      </div>
    </div>
  )
}

export default page
