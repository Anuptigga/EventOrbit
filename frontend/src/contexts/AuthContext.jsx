import { createContext, useState } from 'react'
import { toast } from 'react-toastify'

const AuthContext = createContext()

function AuthProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))

  function handleClickLogin() {
    setIsOpen(true)
  }

  function handleLogIn() {
    setIsLoggedIn(true)
    toast.success('Logged In successfully!')
  }

  function handleClickCross() {
    setIsOpen(false)
  }

  const handleLogOut = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    toast.success('Logged Out successfully!')
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          isOpen,
          isLoggedIn,
          setIsOpen,
          handleClickLogin,
          handleClickCross,
          setIsLoggedIn,
          handleLogOut,
          handleLogIn,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  )
}

export { AuthProvider, AuthContext }
