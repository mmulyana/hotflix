import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { db } from './firebase'
import { Genre } from '@/model/movie'

export interface AddReviewPayload {
  user_id: string | undefined
  username: string | undefined
  rating: number
  review: string
  movie_id: number | undefined
  movie_name: string | undefined
  movie_img: string | null | undefined
}

export interface ReviewI extends AddReviewPayload {
  id: string
}

export type reviewI = Omit<AddReviewPayload,'user_id' | 'movie_img' | 'movie_id' | 'movie_name'>

export type getReviewByMovieIdResponse = {
  reviews:
    | reviewI[]
    | []
  message?: string
}

type addReview = (payload: AddReviewPayload) => Promise<boolean>

export const handleAddReview: addReview = async (payload) => {
  try {
    const ref = collection(db, 'hotflix_reviews')
    await addDoc(ref, payload)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export async function getReviewByMovieId(id: number): Promise<getReviewByMovieIdResponse> {
  try {
    const ref = query(
      collection(db, 'hotflix_reviews'),
      where('movie_id', '==', id)
    )
    const data = await getDocs(ref)
    if (data.size >= 1) {
      const result = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      const reviews = result.map((res: any) => ({
        username: res.username,
        rating: res.rating,
        review: res.review,
      }))

      return { reviews }
    } else {
      return {
        reviews: [],
        message: 'Be the first to review this movie!',
      }
    }
  } catch (error) {
    return {
      reviews: [],
      message: 'Oops! Something went wrong. Please try again later',
    }
  }
}
