import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from './firebase'
import { User } from '@/model/auth'

const USER_DOC = process.env.NEXT_PUBLIC_KEY_USER as string

type createUserType = (
  uid: string,
  email: string,
  username: string
) => Promise<boolean>

type getUser = (uid: string) => Promise<User>

export const createUser: createUserType = async (uid, email, username) => {
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

export const getUser: getUser = async (uid: string) => {
  try {
    const ref = doc(db, USER_DOC, uid)
    const user = await getDoc(ref)

    if (!user.exists()) throw Error("user doesn't exist")
    
    return user.data() as User
  } catch (error) {
    throw error
  }
}
