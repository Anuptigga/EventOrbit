import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

const SignIn = () => {
  return (
    <div className="bg-base-100 p-8 rounded-lg shadow-lg w-110">
      <h2 className="text-2xl font-bold text-center mb-6">
        Sign in to your account
      </h2>
      <form>
        <div className="mb-4">
          <label className="block text-neutral m-2 required:">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className="w-full outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-accent rounded-lg p-2"
            placeholder="Email address"
          />
        </div>
        <div className="mb-6">
          <label className="block text-neutral m-2 required:">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            className="w-full outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-accent rounded-lg p-2"
            placeholder="Password"
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
          Sign in
        </button>
      </form>
      <div className="divider mb-6">Or continue with</div>
      <div className="flex justify-between w-1/2">
        <button className="btn btn-outline w-full mr-2 flex items-center">
          <FcGoogle /> Google
        </button>
        <button className="btn btn-outline w-full ml-2 flex items-center">
          <FaGithub /> GitHub
        </button>
      </div>
      <p className="text-center mt-6 text-gray-600">
        Already have an account?{' '}
        <a
          href="#"
          className="text-primary/90 hover:underline hover:text-primary"
        >
          Log In
        </a>
      </p>
    </div>
  )
}

export default SignIn
