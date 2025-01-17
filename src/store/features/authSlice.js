import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  user: null
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logInUser: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload
    },
    logOutUser: (state) => {
      state.isAuthenticated = false
      state.user = null
    },
  },
})

export const { logInUser, logOutUser } = authSlice.actions
export default authSlice.reducer
