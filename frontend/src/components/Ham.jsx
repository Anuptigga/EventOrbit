import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Ham({ open, setOpen }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset'
  }, [open])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && open) {
        setOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [open, setOpen])

  const handleClose = () => {
    setOpen(false)
  }

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
                <Link to="about" onClick={handleClose}>
                  About
                </Link>
              </li>
              <li>
                <Link to="contact" onClick={handleClose}>
                  Contact
                </Link>
              </li>
              <li>
                <Link to="eventlist" onClick={handleClose}>
                  Events
                </Link>
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Ham
