import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-900 py-6 text-center text-gray-400 text-sm">
      &copy; {new Date().getFullYear()}{' '}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 font-semibold">
        Event Orbit
      </span>{' '}
      • All rights reserved.
    </footer>
  )
}

export default Footer
