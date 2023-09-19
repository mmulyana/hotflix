import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from './firebase'

export type returnType = {
  id: string
}

export type handleAuthType = (
  name: string,
  password: string
) => Promise<returnType>

export const handleRegister: handleAuthType = async (name, password) => {
  try {
    const data = await createUserWithEmailAndPassword(auth, name, password)
    return {
      id: data.user?.uid,
    }
  } catch (error) {
    throw error
  }
}

export const handleLogin: handleAuthType = async (name, password) => {
  try {
    const data = await signInWithEmailAndPassword(auth, name, password)
    return {
      id: data.user?.uid,
    }
  } catch (error) {
    throw error
  }
}
