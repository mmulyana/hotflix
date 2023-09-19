import { MovieI } from '@/model/movie'
export default function CardMovie({ data }: { data: MovieI }) {
  return (
    <div className='h-20 w-40 bg-red-100 border border-red-500'>
      <img
        src={'https://image.tmdb.org/t/p/original/' + data.backdrop_path}
        className='w-full h-auto'
      />
    </div>
  )
}
