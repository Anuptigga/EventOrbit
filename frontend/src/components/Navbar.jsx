import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="flex mb-6 items-center justify-between px-6 py-4 bg-primary text-primary-content shadow-lg">
      <div className="text-xl font-bold">Event Orbit</div>

      {/* Hamburger menu - visible only on small screens */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 font-medium">
        <div>Home</div>
        <div>About</div>
        <div>Contact</div>
        <div>Sign In</div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full flex flex-col items-center bg-white shadow-md md:hidden py-4 gap-4 text-gray-700 font-medium z-50">
          <div>Home</div>
          <div>About</div>
          <div>Contact</div>
          <div>Sign In</div>
        </div>
      )}
    </nav>
  )
}
