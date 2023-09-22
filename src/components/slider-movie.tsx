import { useCallback, useEffect, useRef, useState } from 'react'
import { MovieI } from '@/model/movie'
import Swiper from 'react-id-swiper'
import 'swiper/css'

import CardMovie from './card-movie'
import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

type Props = {
  title: string
  url: string
}

export default function SliderMovie({ title, url }: Props) {
  const [isActivePrev, setIsActivePrev] = useState<boolean>(false)

  const sliderRef = useRef(null) as any
  const [movies, setMovies] = useState<MovieI[] | null>(null)
  const params = {
    slidesPerView: 4,
    spaceBetween: 10,
    loop: true,
  }

  useEffect(() => {
    async function getMovie() {
      const data = await fetch(url)
      if (!data.ok) {
        throw new Error('Failed to fetch data')
      }

      const res = await data.json()
      setMovies(res.results)
    }

    getMovie()
  }, [url])

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current.swiper.slidePrev()
  }, [])

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return
    if (!isActivePrev) setIsActivePrev(true)
    sliderRef.current.swiper.slideNext()
  }, [])

  return (
    <div className='relative h-[180px] px-4'>
      <div className='container mx-auto max-w-6xl mb-4'>
        <p className='text-white'>{title}</p>
      </div>
      <div className='container mx-auto max-w-6xl static 2xl:relative'>
        {movies && movies?.length > 1 ? (
          <>
            <Swiper
              ref={sliderRef}
              {...params}
              // @ts-ignore
              breakpoints={{
                200: {
                  slidesPerView: 2,
                },
                300: {
                  slidesPerView: 2,
                },
                400: {
                  slidesPerView: 2,
                },
                639: {
                  slidesPerView: 3,
                },
                1000: {
                  slidesPerView: 4,
                },
              }}
            >
              {movies?.map((movie: MovieI) => (
                <div
                  key={movie.id}
                  className='relative hover:scale-110 hover:min-h-[120px] hover:lg:min-h-[200px] hover:z-10 h-fit'
                >
                  <div className='w-full h-[120px] md:h-[140px] xl:h-[157px] overflow-hidden bg-[#1c1c25] hover:bg-[#30303e] hover:shadow-xl hover:shadow-gray-950/60'>
                    <CardMovie data={movie} />
                  </div>
                </div>
              ))}
            </Swiper>
          </>
        ) : (
          <div className='h-[120px] md:h-[140px] xl-[157px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            <div className='h-full bg-gray-500/80 animate-pulse'></div>
            <div className='h-full bg-gray-500/80 animate-pulse'></div>
            <div className='h-full bg-gray-500/80 animate-pulse hidden md:block'></div>
            <div className='h-full bg-gray-500/80 animate-pulse hidden lg:block'></div>
          </div>
        )}
      </div>
      {isActivePrev ? (
        <>
          <div
            className='absolute left-0 top-[60%] -translate-y-1/2 z-10 h-fit cursor-pointer flex items-center justify-center'
            onClick={handlePrev}
          >
            <ChevronLeftIcon className='text-white h-12 w-12' />
          </div>
        </>
      ) : null}
      <div
        className='absolute right-0 top-[60%] -translate-y-1/2 z-10 h-fit cursor-pointer flex items-center justify-center'
        onClick={handleNext}
      >
        <ChevronRightIcon className='text-white h-12 w-12' />
      </div>
    </div>
  )
}
