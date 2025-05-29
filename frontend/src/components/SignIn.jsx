import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { FaGithub } from 'react-icons/fa'
import { assets } from '../assets/assets'
import { googleLogin } from '../services/auth'
import { GoogleLogin } from '@react-oauth/google'
import { useAuth } from '../hooks/useAuth'
import { Form, useFetcher, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'

const SignIn = () => {
  const {
    isOpen,
    setIsOpen,
    handleClickCross,
    handleLogIn,
    isLoggedIn,
    handleLogOut,
    setIsLoggedIn,
  } = useAuth()
  const [mode, setMode] = useState('login') // or 'signup'
  const formRef = useRef(null)
  const fetcher = useFetcher()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from || '/'

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
  }, [isOpen])

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse
      await googleLogin(credential)
      handleLogIn()
      setIsOpen(false)
      // toast.success('Google login successful!')
    } catch (err) {
      // console.log(err.message)
      // toast.error('Google login failed')
    }
  }

  useEffect(() => {
    const data = fetcher.data
    if (!data) return
    if (isLoggedIn) {
      handleLogOut()
    }
    if (data?.success) {
      handleLogIn()
      // setIsLoggedIn(true)
      setIsOpen(false)
      navigate(from, { replace: true })
      // toast.success(data.success)
    } else if (data?.error) {
      toast.error(data.error)
    }
  }, [fetcher.data])

  const renderInput = (label, name, type = 'text', required = true) => (
    <div className="mb-4">
      <Label className="block text-secondary m-2">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg p-2 px-6"
        placeholder={label}
      />
    </div>
  )

  return (
    isOpen && (
      <div className="fixed inset-0 z-[100] backdrop-blur-sm flex justify-center items-center p-4">
        <fetcher.Form
          ref={formRef}
          method="POST"
          action="/auth"
          className="relative bg-card p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4"
          onSubmit={() => (formRef.current.dataset.submitted = 'true')}
        >
          <img
            src={assets.cross_icon}
            alt="Close"
            className="absolute top-5 right-5 cursor-pointer"
            onClick={handleClickCross}
          />
          <h2 className="text-3xl font-bold text-primary text-center mb-6 capitalize">
            {mode}
          </h2>
          {/* Hidden input to distinguish mode */}
          <input type="hidden" name="mode" value={mode} />
          <input type="hidden" name="from" value={from} />

          {mode === 'signup' && renderInput('Name', 'name')}
          {renderInput('Email', 'email', 'email')}
          {renderInput('Password', 'password', 'password')}

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember-me" />
              <Label
                htmlFor="remember-me"
                className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </Label>
            </div>
            <a href="#" className="text-destructive hover:underline">
              Forgot password?
            </a>
          </div>

          <Button type="submit" className="w-full text-lg mb-2 capitalize">
            {mode}
          </Button>

          <div className="flex items-center gap-4 my-6">
            <Separator className="flex-1" />
            <span className="text-md text-muted-foreground">
              Or continue with
            </span>
            <Separator className="flex-1" />
          </div>

          <div className="flex items-center justify-center gap-2">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => toast.error('Google login failed')}
              width="100"
              shape="circle"
              logo_alignment="center"
            />
            <Button className="flex items-center gap-2">
              <FaGithub className="w-4 h-4" />
              GitHub
            </Button>
          </div>

          <p className="text-center mt-6 text-muted-foreground">
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <a
                  href="#"
                  className="text-primary/80 hover:underline hover:text-primary"
                  onClick={() => setMode('signup')}
                >
                  Sign Up
                </a>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <a
                  href="#"
                  className="text-primary/80 hover:underline hover:text-primary"
                  onClick={() => setMode('login')}
                >
                  Log In
                </a>
              </>
            )}
          </p>
        </fetcher.Form>
      </div>
    )
  )
}

export default SignIn
