import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'

function Ham({ open }) {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className="fixed top-20 left-0 w-full h-screen z-20"
        >
          <div className="backdrop-blur-md bg-primary/60 text-2xl font-semibold uppercase text-primary-content py-10 m-6 rounded-3xl shadow-lg">
            <ul className="flex flex-col items-center gap-8">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/events">Events</Link>
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Ham
