import { createContext, useState } from 'react'

const AuthContext = createContext()

function AuthProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  function handleClickLogin() {
    setIsOpen(true)
  }

  function handleClickCross() {
    setIsOpen(false)
  }

  return (
    <AuthContext.Provider
      value={{ isOpen, setIsOpen, handleClickLogin, handleClickCross }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
