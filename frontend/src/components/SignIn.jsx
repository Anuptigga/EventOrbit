import React, { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { assets } from '../assets/assets'
import { login, signup } from '../services/api/auth'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const SignIn = () => {
  const navigate = useNavigate()

  const { isOpen, handleClickCross } = useAuth()
  console.log(isOpen)

  const [state, setState] = useState('Login')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
  }, [isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let response
      if (state === 'Login') {
        response = await login(formData.email, formData.password)
      } else {
        response = await signup(
          formData.name,
          formData.email,
          formData.password
        )
      }
      console.log('Signup successfull', response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    isOpen && (
      <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-neutral/30 flex justify-center items-center">
        <form
          className="relative bg-base-100 p-8 rounded-2xl shadow-lg w-110"
          onSubmit={handleSubmit}
        >
          <img
            src={assets.cross_icon}
            alt="Cross Icon"
            className="absolute top-5 right-5 cursor-pointer"
            onClick={
              handleClickCross
              // navigate(-1)
            }
          />
          <h2 className="text-2xl font-bold text-center mb-6">{state}</h2>
          {state === 'Sign Up' && (
            <div className="mb-4">
              <label className="block text-neutral m-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                className="w-full outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-accent 
            rounded-lg p-2 px-6"
                placeholder="Name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-neutral m-2 required:">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              className="w-full outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-accent rounded-lg p-2 px-6"
              placeholder="Email address"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-neutral m-2 required:">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              className="w-full outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-accent rounded-lg p-2 px-6"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="checkbox checkbox-secondary rounded-md"
              />
              <span className="ml-2 text-neutral">Remember me</span>
            </label>
            <a href="#" className="text-error hover:underline">
              Forgot password?
            </a>
          </div>
          <button type="submit" className="btn btn-primary w-full mb-2">
            {state}
          </button>
          <div className="divider mb-6">Or continue with</div>
          <div className="flex justify-between w-1/2">
            <button className="btn btn-outline w-full mr-2 flex items-center">
              <FcGoogle /> Google
            </button>
            <button className="btn btn-outline w-full ml-2 flex items-center">
              <FaGithub /> GitHub
            </button>
          </div>
          {state === 'Login' ? (
            <p className="text-center mt-6 text-gray-600">
              Don't have an account?{' '}
              <a
                href="#"
                className="text-primary/90 hover:underline hover:text-primary"
                onClick={() => setState('Sign Up')}
              >
                Sign Up
              </a>
            </p>
          ) : (
            <p className="text-center mt-6 text-gray-600">
              Already have an account?{' '}
              <a
                href="#"
                className="text-primary/90 hover:underline hover:text-primary"
                onClick={() => setState('Login')}
              >
                Log In
              </a>
            </p>
          )}
        </form>
      </div>
    )
  )
}

export default SignIn
