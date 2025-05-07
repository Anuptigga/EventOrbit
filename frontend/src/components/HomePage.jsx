import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const phrases = ['Explore', 'Track', 'Participate']
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length)
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
        <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 drop-shadow-[2px_2px_3px_rgba(0,0,0,0.25)] transform hover:scale-105 transition-transform duration-300">
          Event Orbit
        </div>

        <div className="flex space-x-6 font-medium">
          <Link to="/about" className="text-gray-700 hover:text-indigo-600 transition-colors duration-200">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-purple-600 transition-colors duration-200">Contact</Link>
          <Link to="/eventlist" className="text-gray-700 hover:text-pink-500 transition-colors duration-200">Event Lists</Link>
          <Link to="/login" className="text-gray-700 hover:text-indigo-600 transition-colors duration-200">Log In</Link>
        </div>
      </nav>

      {/* Hero Sections */}
      {[1, 2, 3].map((_, idx) => (
        <section key={idx} className="bg-gradient-to-br from-teal-100 to-blue-100 text-center py-24 px-6 text-gray-800">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            <span className="text-gray-500">Easily</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-400 transition-opacity duration-700">
              {phrases[index]}
            </span>{' '}
            Events with Event Orbit
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto">
            {idx === 0 && 'Your one-stop platform to discover and manage all kinds of events around the world.'}
            {idx === 1 && 'Find, follow, and stay updated on the latest events near you with ease.'}
            {idx === 2 && 'Simplify event participation and never miss an opportunity again.'}
          </p>
          <Link
            to="/eventlist"
            className="inline-block bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-400 text-white px-8 py-3 rounded-lg shadow-lg hover:brightness-110 transition-transform transform hover:scale-105"
          >
            Get Started
          </Link>
        </section>
      ))}

      {/* Footer */}
      <footer className="bg-gray-900 py-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()}{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 font-semibold">
          Event Orbit
        </span>{' '}
        • All rights reserved.
      </footer>
    </div>
  )
}
