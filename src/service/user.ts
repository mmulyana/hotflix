import { doc, setDoc } from 'firebase/firestore'
import { db } from './firebase'

const USER_DOC = process.env.NEXT_PUBLIC_KEY_USER as string

type getUserType = (
  uid: string,
  email: string,
  username: string
) => Promise<boolean>

export const createUser: getUserType = async (uid, email, username) => {
  try {
    await setDoc(doc(db, USER_DOC, uid), {
      username: username,
      email: email,
    })
    return true
  } catch (error) {
    throw error
  }
}
