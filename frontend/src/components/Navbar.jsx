import React, { useEffect, useRef, useState } from 'react'
import { GiOrbit } from 'react-icons/gi'
import { Link, NavLink } from 'react-router-dom'
import { MdMenu } from 'react-icons/md'
import Ham from './Ham'
import { motion, useAnimation } from 'framer-motion'
import { ModeToggle } from './ModeToggle'
import AuthButton from './AuthButton'

const NavbarMenu = [
  {
    id: 2,
    name: 'About',
    path: 'about',
  },
  {
    id: 3,
    name: 'Contact',
    path: 'contact',
  },
  {
    id: 4,
    name: 'Events',
    path: 'eventlist',
  },
]

const navVariants = {
  top: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    backdropFilter: 'blur(0px)',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  scrolled: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(12px)',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const controls = useAnimation()
  const [scrolled, setScrolled] = useState(false)
  const hamRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)
      controls.start(isScrolled ? 'scrolled' : 'top')
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [controls])

  return (
    <>
      <motion.nav
        variants={navVariants}
        animate={controls}
        initial="top"
        className="fixed top-0 w-full z-50 shadow-lg h-20"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-7xl mx-auto w-full px-4 flex items-center justify-between py-4 md:pt-4"
        >
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl flex items-center gap-2 font-bold uppercase"
          >
            <p className="text-primary">Event</p>
            <p className="text-secondary">Orbit</p>
            <GiOrbit />
          </Link>
          <ModeToggle className="hidden md:block" />
          {/* Menu */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-4 text-primary">
              {NavbarMenu.map((item) => (
                <li key={item.id}>
                  <NavLink
                    className="inline-block text-2xl py-1 px-3 hover:text-secondary hover:shadow-[0_3px_0_-1px_var(--accent)] font-semibold"
                    to={item.path}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <AuthButton className="hidden md:block" />
          {/* Mobile */}
          <div
            className="md:hidden cursor-pointer"
            onClick={() => setOpen(!open)}
            ref={hamRef}
          >
            <MdMenu className="text-4xl" />
          </div>
        </motion.div>
      </motion.nav>
      {/* Mobile Menu Section */}
      <Ham open={open} setOpen={setOpen} hamRef={hamRef} />
    </>
  )
}

export default Navbar
