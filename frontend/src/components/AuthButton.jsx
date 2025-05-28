import { useAuth } from '../hooks/useAuth'
import { Button } from '@/components/ui/button'
import { FiLogIn, FiLogOut } from 'react-icons/fi'

function AuthButton({ className }) {
  const { isLoggedIn, handleClickLogin, handleLogOut } = useAuth()
  return (
    <Button
      variant="outline"
      className={`w-11 h-11 ${className}`}
      onClick={isLoggedIn ? handleLogOut : handleClickLogin}
    >
      {isLoggedIn ? <FiLogOut /> : <FiLogIn />}
    </Button>
  )
}

export default AuthButton
