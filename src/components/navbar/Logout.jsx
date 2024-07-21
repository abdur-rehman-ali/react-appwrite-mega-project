import React from 'react'
import authService from '../../services/auth.service'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logOutUser } from '../../store/features/authSlice'
import { toast } from 'react-toastify'

const Logout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = async () => {
    const response = await authService.logoutUser()
    if (!response) {
      toast.error("Failed to log out")
      return
    }
    dispatch(logOutUser())
    toast.success("User logged out successfully")
    navigate('/')
  }

  return (
    <button
      className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
      onClick={handleLogout}
    >
      Logout
    </button>
  )
}

export default Logout
