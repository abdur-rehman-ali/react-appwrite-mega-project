import React from 'react'
import Input from '../components/shared/Input'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import Loader from '../components/shared/Loader';
import { toast } from 'react-toastify';
import { useRegisterUserMutation } from '../react-query/mutations/auth.mutations';
import authService from '../services/auth.service';
import { useDispatch } from 'react-redux';
import { logInUser } from '../store/features/authSlice';

const RegisterUser = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { mutateAsync: registerUser, isPending } = useRegisterUserMutation()
  const submitHandler = async (data) => {
    try {
      const response = await registerUser(data)
      if (!response) { return }
      const currentUser = await authService.getCurrentUser()
      if (!currentUser) { throw new Error("Failed to fetch logged in user") }
      dispatch(logInUser(currentUser))
      toast.success("User registered successfully!")
      navigate('/')
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          Blogify
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(submitHandler)}>
              <Input
                type="email"
                labelText="Email address"
                placeholder="user@mailinator.com"
                name="email"
                {...register("email", { required: "Email address is required!" })}
              />
              {errors.email && <span className="error">{errors.email?.message}</span>}
              <Input
                type="text"
                labelText="Name"
                placeholder="John doe"
                name="name"
                {...register("name", { required: "Name is required!" })}
              />
              {errors.name && <span className="error">{errors.name?.message}</span>}
              <Input
                type="password"
                labelText="Password"
                placeholder="••••••••"
                name="password"
                {...register("password", { required: "Password is required!" })}
              />
              {errors.password && <span className="error">{errors.password?.message}</span>}
              <Input
                type="password"
                labelText="Confirm Password"
                placeholder="••••••••"
                name="confirmPassword"
                {...register("confirmPassword", { required: "Confirm password is required!" })}
              />
              {errors.confirmPassword && <span className="error">{errors.confirmPassword?.message}</span>}

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                </div>
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex justify-center">
                {
                  isPending ? < Loader /> : "Create an account"
                }
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <Link to="/accounts/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegisterUser