'use client'

import HeroMovie from '@/components/hero-movie'
import ModalMovie from '@/components/modal-movie'
import Sidebar from '@/components/sidebar'
import SliderMovie from '@/components/slider-movie'
import { IMovieDetail } from '@/model/movie'
import { movieRequests } from '@/utils'
import { useEffect, useState } from 'react'

const TOKEN = process.env.NEXT_PUBLIC_TOKEN

type Props = {
  searchParams: Record<string, string> | null | undefined
}

export default function Home({ searchParams }: Props) {
  // showmodal to store id movie
  const showModal = searchParams?.detail as any
  const [detail, setDetail] = useState<IMovieDetail | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!showModal) {
      document.body.style.overflow = ''
      setDetail(null)
      return
    }
    if (showModal) {
      document.body.style.overflow = 'hidden'
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
    <div className='grid grid-cols-1 lg:grid-cols-[36px_1fr]'>
      <div>
        <Sidebar />
      </div>
      <div className='container h-fit lg:max-w-6xl mx-auto overflow-x-hidden pb-14'>
        <HeroMovie />
        <div className='flex flex-col gap-5 md:gap-8 mt-8'>
          {movieRequests.map((d, index) => (
            <SliderMovie key={index} title={d.title} url={d.url} />
          ))}
        </div>
        {typeof showModal !== 'undefined' && showModal !== '' ? (
          <ModalMovie detail={detail} loading={loading} />
        ) : null}
      </div>
    </div>
  )
}
