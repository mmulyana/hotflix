'use client'

import ModalMovie from '@/components/modal-movie'
import SliderMovie from '@/components/slider-movie'
import { IMovieDetail } from '@/model/movie'
import { useEffect, useState } from 'react'

const TOKEN = process.env.NEXT_PUBLIC_TOKEN

type Props = {
  searchParams: Record<string, string> | null | undefined
}

function page({ searchParams }: Props) {
  // showmodal to store id movie
  const showModal = searchParams?.detail as any
  const [detail, setDetail] = useState<IMovieDetail | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!showModal) {
      setDetail(null)
      return
    }
    async function getDetailMovie(id: string) {
      setLoading(true)
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${TOKEN}`
      )
      const data = await res.json()
      setLoading(false)
      setDetail(data)
    }
    getDetailMovie(showModal)
  }, [showModal])

  return (
    <div className='flex flex-col gap-5 md:gap-10 mt-10'>
      <SliderMovie
        title='Playing Now'
        url={`https://api.themoviedb.org/3/movie/now_playing?api_key=${TOKEN}`}
      />
      <SliderMovie
        title='Upcoming'
        url={`https://api.themoviedb.org/3/movie/upcoming?api_key=${TOKEN}`}
      />
      
      <SliderMovie
        title='Top Rated'
        url={`https://api.themoviedb.org/3/movie/top_rated?api_key=${TOKEN}`}
      />
      {typeof showModal !== 'undefined' && showModal !== '' ? <ModalMovie detail={detail} loading={loading}/> : null}
    </div>
  )
}

export default page
