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
      {/* Hero Sections */}
      {[1, 2, 3].map((_, idx) => (
        <section
          key={idx}
          className="bg-gradient-to-br from-teal-100 to-blue-100 text-center py-24 px-6 text-gray-800"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            <span className="text-gray-500">Easily</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-400 transition-opacity duration-700">
              {phrases[index]}
            </span>{' '}
            Events with Event Orbit
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto">
            {idx === 0 &&
              'Your one-stop platform to discover and manage all kinds of events around the world.'}
            {idx === 1 &&
              'Find, follow, and stay updated on the latest events near you with ease.'}
            {idx === 2 &&
              'Simplify event participation and never miss an opportunity again.'}
          </p>
          <Link
            to="eventform"
            className="inline-block bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-400 text-white px-8 py-3 rounded-lg shadow-lg hover:brightness-110 transition-transform transform hover:scale-105"
          >
            Get Started
          </Link>
        </section>
      ))}
    </div>
  )
}
