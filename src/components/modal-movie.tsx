import Link from 'next/link'
import { PlusIcon } from '@heroicons/react/24/outline'
import { BookmarkIcon, XMarkIcon, StarIcon } from '@heroicons/react/20/solid'
import { useEffect, useState, useMemo } from 'react'
import { BASE_URL, BASE_URL_IMG, TOKEN } from '@/utils'
import { If, Then, Else } from 'react-if'
import { useSelector } from 'react-redux'
import { selectAuth } from '@/redux/reducers/auth'
import { toast } from 'react-toastify'
import { handleAddFavorite } from '@/service/favorite'
import { handleAddWishlist } from '@/service/wishlist'
import { IMovieDetail } from '@/model/movie'
import {
  AddReviewPayload,
  getReviewByMovieId,
  handleAddReview,
  reviewI,
} from '@/service/review'

type Props = {
  detail: IMovieDetail | null
  loading: boolean
}

export default function ModalMovie({ detail, loading }: Props) {
  const { user } = useSelector(selectAuth)
  const [keywords, setKeywords] = useState<any[] | null>(null)
  const [casts, setCasts] = useState<any[] | null>(null)
  const [director, setDirector] = useState<any | null>(null)
  const [isOpenReview, setIsOpenReview] = useState<boolean>(false)
  const [rate, setRate] = useState<number>(0)
  const [review, setReview] = useState<string>('')
  const [reviews, setReviews] = useState<reviewI[]>([])
  const [reviewMessage, setReviewMessage] = useState<string>('')

  const release = useMemo(() => {
    const date = new Date(detail?.release_date as string)
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }, [detail])

  useEffect(() => {
    async function getKeywords() {
      const request = `${BASE_URL}/movie/${detail?.id}/keywords?api_key=${TOKEN}`
      const res = await fetch(request)
      const data = await res.json()
      setKeywords(data.keywords)
    }

    async function getCredits() {
      const res = await fetch(
        `${BASE_URL}/movie/${detail?.id}/credits?api_key=${TOKEN}`
      )
      const data = await res.json()
      setCasts(data.cast)
      const director = data.crew?.filter((d: any) => d.job === 'Director')
      if (Array.isArray(director)) {
        setDirector(director[0])
      }
    }

    async function getReview() {
      if (!detail) return
      const { reviews: resReview, message } = await getReviewByMovieId(
        detail?.id
      )
      if (message) setReviewMessage(message)
      setReviews(resReview as reviewI[])
    }

    getKeywords()
    getCredits()
    getReview()
  }, [detail])

  async function handleFavorite() {
    if (!user) {
      toast.error('Log In Required')
      return
    }

    const res = await handleAddFavorite(
      user.uid,
      detail?.id,
      detail?.backdrop_path,
      detail?.title,
      detail?.genres
    )
    if (res) {
      toast.success('Favorite Movie Saved🎉')
    }
  }

  async function handleWishlist() {
    if (!user) {
      toast.error('Log In Required')
      return
    }

    const res = await handleAddWishlist(
      user.uid,
      detail?.id,
      detail?.backdrop_path,
      detail?.title,
      detail?.genres
    )
    if (res) {
      toast.success('Wishlist Movie Saved🎉')
    }
  }

  function handleOpenReview() {
    if (!user) {
      toast.error('Log In Required')
      return
    }

    setIsOpenReview(true)
  }

  async function handleSubmitReview() {
    if (!rate) {
      toast.error('Please select a star rating.')
      return
    }

    if (review === '') {
      toast.error('Please enter review message')
      return
    }

    const payload: AddReviewPayload = {
      user_id: user?.uid,
      username: user?.username,
      movie_id: detail?.id,
      movie_img: detail?.backdrop_path,
      movie_name: detail?.title,
      rating: rate,
      review: review,
    }
    const res = await handleAddReview(payload)
    if (res) {
      toast.success('Thank you for your review!🤩')
      setReviews((prev) => [...prev, payload])
    }
    setRate(0)
    setReview('')
    setIsOpenReview(false)
  }

  return (
    <>
      <div className='fixed top-0 left-0 w-full bg-black/50 z-30 h-full overflow-y-auto p-0 md:p-4'>
        <div className='rounded-none md:rounded-xl bg-[#2b2b33] h-fit pb-10 max-w-5xl mx-auto relative overflow-hidden'>
          <If condition={!loading}>
            <Then>
              {/* movie image */}
              <div className='h-[480px] w-full relative'>
                <img
                  src={
                    BASE_URL_IMG + '/' + detail?.backdrop_path ??
                    detail?.poster_path
                  }
                  className='h-full w-full object-cover object-center'
                />
                <div className='absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#2b2b33] to-[#2b2b33]/0 flex items-center justify-content-end' />
              </div>

              {/* movie description */}
              <div className='-mt-8 relative z-10 px-4 md:px-8'>
                <div className='flex justify-between items-center gap-4'>
                  <p className='text-5xl font-normal text-white'>
                    {detail?.title}
                  </p>
                  <div className='flex gap-2'>
                    <button
                      onClick={handleFavorite}
                      className='w-8 h-8 rounded-md flex justify-center items-center cursor-pointer bg-gray-900'
                    >
                      <StarIcon className='w-4 h-4 text-white' />
                    </button>
                    <button
                      onClick={handleWishlist}
                      className='w-8 h-8 rounded-md flex justify-center items-center cursor-pointer bg-gray-900'
                    >
                      <BookmarkIcon className='w-4 h-4 text-white' />
                    </button>
                    <button
                      className='flex gap-1 items-center rounded px-2 pr-2.5 py-1 bg-gray-900 text-white text-sm'
                      onClick={handleOpenReview}
                    >
                      <PlusIcon className='w-4 h-4 text-white' />
                      <span>Add Your Review</span>
                    </button>
                  </div>
                </div>
                <p className='text-white/50 text-sm font-light'>
                  {detail?.tagline}
                </p>
                <p className='mt-2 text-white'>{detail?.overview}</p>
                <div className='mt-4 flex gap-2'>
                  {detail?.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className='border border-gray-50 px-4 py-1 rounded-full text-sm text-white'
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
                <div className='grid grid-cols-1 md:grid-cols-[4fr_1fr] gap-5 mt-4'>
                  <If condition={casts !== null}>
                    <Then>
                      <div>
                        <p className='text-sm text-gray-400'>Cast</p>
                        <div className='mt-3 grid grid-cols-5 gap-5'>
                          {casts && casts?.length > 1
                            ? casts?.slice(0, 10).map((cast) => (
                                <div
                                  className='flex flex-col gap-2 bg-gray-900/80 rounded-md relative overflow-hidden'
                                  key={cast.id}
                                >
                                  <img
                                    src={BASE_URL_IMG + '/' + cast.profile_path}
                                    className='h-auto w-full object-cover object-center rounded'
                                  />
                                  <div className='absolute h-fit w-full bottom-0 left-0 bg-black/70 p-2 text-white font-light'>
                                    <p className='text-sm'>
                                      {cast.name}{' '}
                                      <span className='text-white/40'>as</span>{' '}
                                      {cast.character}
                                    </p>
                                  </div>
                                </div>
                              ))
                            : null}
                        </div>
                      </div>
                    </Then>
                  </If>
                  <div>
                    <div className='mt-7'>
                      <p className='text-sm text-white/50'>Director</p>
                      <span className='text-white text-base'>
                        {director?.name}
                      </span>
                    </div>
                    <div className='mt-3'>
                      <p className='text-sm text-white/50'>Release Date</p>
                      <span className='text-white text-base'>{release}</span>
                    </div>
                    <If condition={keywords !== null}>
                      <Then>
                        <div className='mt-3'>
                          <p className='text-sm text-white/50'>Keywords</p>
                          <div className='flex flex-wrap gap-2 mt-1'>
                            {keywords && keywords?.length > 1
                              ? keywords?.slice(0, 8).map((word) => (
                                  <span
                                    className='px-3 py-1 rounded-full border border-gray-50/50 text-white text-xs'
                                    key={word.id}
                                  >
                                    {word.name}
                                  </span>
                                ))
                              : null}
                          </div>
                        </div>
                      </Then>
                    </If>
                  </div>
                </div>
                <div className='mt-6'>
                  <p className='text-sm text-gray-400'>Review</p>
                  <div className='mt-3 flex flex-col gap-2'>
                    <If condition={reviews.length > 0}>
                      <Then>
                        {reviews?.map((review, index) => (
                          <div
                            key={index}
                            className='flex flex-col p-2.5 rounded-lg bg-gray-900/50'
                          >
                            <div className='flex gap-2 items-center'>
                              <p className='text-white/80 text-sm'>
                                {review.username}
                              </p>
                              <div className='w-1 h-1 rounded-full bg-gray-100' />
                              <div className='flex items-center gap-1'>
                                <StarIcon className='w-4 h-4 text-yellow-400' />
                                <p className='text-white mb-0 leading-none text-sm'>
                                  {review.rating}
                                </p>
                              </div>
                            </div>
                            <p className='text-white mt-2 text-lg'>
                              {review.review}
                            </p>
                          </div>
                        ))}
                      </Then>
                      <Else>
                        <p className='mt-4 text-white/80'>{reviewMessage}</p>
                      </Else>
                    </If>
                  </div>
                </div>
              </div>
            </Then>
            <Else>
              <div className='h-[400px] w-full bg-gray-500 animate-pulse' />
              <div className='mt-2 relative z-10 px-4 md:px-8'>
                <div className='h-10 w-4/5 rounded-lg bg-gray-500 animate-pulse' />
                <div className='mt-2 h-4 w-3/5 bg-gray-500 rounded-md animate-pulse'></div>
                <div className='mt-2 h-4 w-3/5 bg-gray-500 rounded-md animate-pulse'></div>
                <div className='mt-2 h-4 w-3/5 bg-gray-500 rounded-md animate-pulse'></div>
              </div>
            </Else>
          </If>
          <Link
            href='/home'
            className='absolute top-4 right-4 z-10 h-12 w-12 rounded-full bg-black flex justify-center items-center'
          >
            <XMarkIcon className='text-white w-8 h-8' />
          </Link>
        </div>
      </div>
      <If condition={isOpenReview}>
        <Then>
          <div className='fixed top-0 left-0 w-full h-full bg-black/80 z-40 flex justify-center items-center pl-3 pr-6'>
            <div className='w-full md:w-80 h-fit pb-4 bg-[#323849] rounded-xl overflow-hidden'>
              <div className='w-full py-2 flex justify-between items-center bg-[#222733] text-white pl-4'>
                <p>Share your review</p>
                <button
                  className='w-8 h-8'
                  onClick={() => setIsOpenReview(false)}
                >
                  <XMarkIcon className='w-4 h-4' />
                </button>
              </div>
              <div className='flex justify-center gap-2 mt-4'>
                {[1, 2, 3, 4, 5].map((d, index) => (
                  <div key={index} onClick={() => setRate(d)}>
                    <StarIcon
                      className={[
                        'w-8 h-8 cursor-pointer',
                        index < rate ? 'text-yellow-500' : 'text-[#161a22]',
                      ].join(' ')}
                    />
                  </div>
                ))}
              </div>
              <div className='mt-3 px-2'>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className='p-2.5 rounded border border-gray-900 bg-transparent text-white bg-[#252b37] outline-none w-full'
                ></textarea>
              </div>
              <button
                className='px-3 py-2 rounded bg-red-600 text-white block mx-auto mt-4 text-sm'
                onClick={handleSubmitReview}
              >
                Submit Review
              </button>
            </div>
          </div>
        </Then>
      </If>
    </>
  )
}
