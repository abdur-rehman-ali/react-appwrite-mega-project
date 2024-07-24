import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectedLayout = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    } else {
      navigate('/accounts/login', { replace: true })
    }
  }, [isAuthenticated, navigate])

  return (
    <>
      {children}
    </>
  )
}

export default ProtectedLayout