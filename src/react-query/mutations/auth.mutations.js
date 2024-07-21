import {
  useMutation,
} from '@tanstack/react-query'
import authService from '../../services/auth.service'

export const useRegisterUserMutation = () => {
  return useMutation({
    mutationFn: async ({ email, password, name }) => (
      await authService.registerUser({ email, password, name }) 
    ),
  })
}

export const useLoginUserMutation = () => {
  return useMutation({
    mutationFn: async ({ email, password }) => (
      await authService.loginUser(email, password) 
    ),
  })
}
