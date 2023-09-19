import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase'

export type returnType = {
  id: string
}

export type registerType = (name: string, password: string) => Promise<returnType>

export const handleRegister: registerType = async (name, password) => {
  try {
    const data = await createUserWithEmailAndPassword(auth, name, password)
    return {
      id: data.user?.uid,
    }
  } catch (error) {
    throw error
  }
}
