export interface User {
  uid: string
  username: string
  email: string
}

export interface Auth {
  user: User | null
  isLoading: boolean
}
