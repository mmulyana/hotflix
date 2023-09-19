'use client'

import { useEffect, useState } from 'react'
import CardMovie from '@/component/card-movie'
import { MovieI } from '@/model/movie'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

function page() {
  const [movies, setMovies] = useState<MovieI[] | null>(null)

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
      
      setMovies(res.result)
    }

    getMovie()
    
  },[])

  return (
    <div className='container mx-auto max-w-6xl'>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {typeof movies !== null && movies?.map((movie: MovieI) => (
          <SwiperSlide key={movie.id}>
           {movie.title}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default page
