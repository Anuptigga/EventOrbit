import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ModeToggle } from './ModeToggle'
import AuthButton from './AuthButton.jsx'

function Ham({ open, setOpen, hamRef }) {
  const menuRef = useRef()

  // prevent scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset'
  }, [open])

  // close on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && open) {
        setOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [open, setOpen])

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        hamRef.current &&
        !hamRef.current.contains(e.target)
      ) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
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
          <div
            ref={menuRef}
            className="backdrop-blur-md bg-accent/60 text-2xl font-semibold uppercase text-primary-content py-10 m-6 rounded-3xl shadow-lg"
          >
            <ul className="flex flex-col items-center gap-8">
              <ModeToggle />
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
              <AuthButton />
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Ham
