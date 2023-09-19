import { createSlice } from '@reduxjs/toolkit'
import { Auth } from '@/model/auth'
import { RootState } from '..'

const initialState: Auth = {
  user: null,
  isLoading: true,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    removeUser: (state) => {
      state.user = null
    },
    handleLoading: (state, action) => {
      state.isLoading = action.payload.value
    },
  },
})

export const { setUser, removeUser, handleLoading } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth
export default authSlice.reducer
