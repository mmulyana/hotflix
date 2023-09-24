import { addDoc, collection } from 'firebase/firestore'
import { db } from './firebase'
import { Genre } from '@/model/movie'

type addFavorite = (
  idUser: string,
  idMovie: number | undefined,
  img: string | null | undefined,
  title: string | undefined,
  genres: Genre[] | undefined
) => Promise<boolean>

export const handleAddWishlist: addFavorite = async (
  idUser,
  idMovie,
  img,
  title,
  genres
) => {
  try {
    const payload = {
      id: idUser,
      id_movie: idMovie,
      title: title,
      img: img,
      genres: genres,
    }
    const ref = collection(db, 'hotflix_wishlist')
    await addDoc(ref, payload)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
