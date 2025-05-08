import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
// import { useState } from 'react'

export default function Navbar() {
  const { handleClickLogin, isLoggedIn, handleLogOut } = useAuth()

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      <Link
        to="/"
        className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 drop-shadow-[2px_2px_3px_rgba(0,0,0,0.25)] transform hover:scale-105 transition-transform duration-300"
      >
        EVENT ORBIT
      </Link>

      <div className="flex space-x-6 font-medium">
        <Link
          to="about"
          className="text-gray-700 hover:text-accent transition-colors duration-200"
        >
          About
        </Link>
        <Link
          to="contact"
          className="text-gray-700 hover:text-accent transition-colors duration-200"
        >
          Contact
        </Link>
        <Link
          to="eventlist"
          className="text-gray-700 hover:text-accent transition-colors duration-200"
        >
          Event Lists
        </Link>
        <button
          className="text-gray-700 cursor-pointer hover:text-accent transition-colors duration-200"
          onClick={isLoggedIn ? handleLogOut : handleClickLogin}
        >
          {isLoggedIn ? 'Log Out' : 'Log In'}
        </button>
      </div>
    </nav>
  )
}
