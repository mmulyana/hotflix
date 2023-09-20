import { MovieI } from '@/model/movie'
export default function CardMovie({ data }: { data: MovieI }) {
  return (
    <div className='w-40 h-[140px] overflow-hidden'>
      <img
        src={'https://image.tmdb.org/t/p/original/' + data.backdrop_path}
        className='w-full h-auto'
      />
    </div>
  )
}
