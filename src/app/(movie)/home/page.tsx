'use client'

import ModalMovie from '@/components/modal-movie'
import SliderMovie from '@/components/slider-movie'
import { IMovieDetail } from '@/model/movie'
import { movieRequests } from '@/utils'
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
      document.body.style.overflow = ''
      setDetail(null)
      return
    }
    if(showModal) {
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
    <div className='flex flex-col gap-5 md:gap-10 mt-10'>
      {movieRequests.map((d, index) => <SliderMovie key={index} title={d.title} url={d.url}/>)}
      {typeof showModal !== 'undefined' && showModal !== '' ? <ModalMovie detail={detail} loading={loading}/> : null}
    </div>
  )
}

export default page
