import React, { useState } from 'react'
import Input from '../components/shared/Input'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import authService from '../services/auth.service'
import Loader from '../components/shared/Loader'


const LoginUser = () => {
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitHandler = async (data) => {
    try {
      setIsPending(true)
      const response = await authService.loginUser(data.email, data.password)
      if (response.userId) {
        navigate('/')
      } else {
        throw new Error('Failed to login')
      }
      setIsPending(false)
    } catch (error) {
      setIsPending(false)
      console.log("🚀 ~ submitHandler ~ error:", error.message)
    }
  }

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
              Login to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(submitHandler)} >
              <Input
                type="email"
                labelText="Email address"
                placeholder="user@mailinator.com"
                name="email"
                {...register("email", { required: "Email address is required!" })}
              />
              {errors.email && <span className="error">{errors.email?.message}</span>}
              <Input
                type="password"
                labelText="Password"
                placeholder="••••••••"
                name="password"
                {...register("password", { required: "Password is required!" })}
              />
              {errors.password && <span className="error">{errors.password?.message}</span>}

              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex justify-center">
                {
                  isPending ? <Loader /> : "Login here"
                }
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account? <Link to="/accounts/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Create here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginUser