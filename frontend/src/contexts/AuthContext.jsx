import { createContext, useState } from 'react'

const AuthContext = createContext()

function AuthProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))

  function handleClickLogin() {
    setIsLoggedIn(true)
    setIsOpen(true)
  }

  function handleClickCross() {
    setIsOpen(false)
  }

  return (
    <AuthContext.Provider
      value={{ isOpen, setIsOpen, handleClickLogin, handleClickCross, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
