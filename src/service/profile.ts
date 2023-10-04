import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from './firebase'

const COLLECTION = {
  FAVORITES: 'hotflix_favorites',
  REVIEWS: 'hotflix_reviews',
  WISHLIST: 'hotflix_wishlist',
}

export type ResponseProfileData = {
  favorites: any
  reviews: any
  wishlists: any
  error?: boolean
}

export async function getProfileData(uid: string): Promise<ResponseProfileData> {
  try {
    const favorites = await getDataById(uid, COLLECTION.FAVORITES)
    const reviews = await getDataById(uid, COLLECTION.REVIEWS)
    const wishlists = await getDataById(uid, COLLECTION.WISHLIST)

    return { favorites, reviews, wishlists }
  } catch (error) {
    console.log(error)
    return {
      favorites: 0,
      reviews: 0,
      wishlists: 0,
      error: true,
    }
  }
}

async function getDataById(uid: string, doc: string) {
  const ref = query(collection(db, doc), where('user_id', '==', uid))
  const data = await getDocs(ref)
  if (data) {
    const result = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    return result
  }
}
