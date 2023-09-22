import { MovieI } from '@/model/movie'
import { genres, genresById } from '@/utils'
import Link from 'next/link'
import React, { useMemo } from 'react'
export default function CardMovie({ data }: { data: MovieI }) {
  const genres = useMemo(() => {
    const res = data.genre_ids.map((d: number) => genresById[d as keyof genres])
    return res
  }, [data.genre_ids])
  return (
    <div className='h-full pb-[1px]'>
      <img
        src={'https://image.tmdb.org/t/p/original/' + data.backdrop_path}
        className='h-full w-full'
      />
      <div className='h-fit text-white absolute bottom-0 left-0 w-full px-2 py-3 text-sm transition-all duration-75 ease-in-out z-[2] bg-[#30303e] card__desc'>
        <Link href={'?detail=' + data.id} className='mb-4'>{data.title}</Link>
        <div className='flex gap-2 items-center'>
          {genres.map((d: string, index: number) => (
            <React.Fragment key={index}>
              <span className='text-xs font-light'>{d as string}</span>
              {index < genres.length - 1 ? (
                <div className='h-1 w-1 rounded-full bg-gray-600' />
              ) : null}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
