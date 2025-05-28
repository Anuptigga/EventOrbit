import axios from './axios'

//login
export const login = async (email, password) => {
  // console.log('Login function called with:', email)
  try {
    const response = await axios.post('/auth/login', { email, password })
    // console.log('Login response:', response.data)
    const { token } = response.data
    localStorage.setItem('token', token)
    return response.data
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message)
    throw error
  }
}

//signup
export const signup = async (name, email, password) => {
  if (!name || !email || !password) {
    throw new Error('All fields are required')
  }
  try {
    const response = await axios.post('/auth/signup', { name, email, password })
    return response.data
  } catch (error) {
    console.error('Signup failed:', error.response?.data || error.message)
    throw error
  }
}

//google login
export const googleLogin= async(googleToken)=>{
  try {
    const response= await axios.post('/auth/google',{token:googleToken})
    const {token}=response.data
    localStorage.setItem('token',token)
    return response.data
  } catch (error) {
    console.error('Google login failed:',error.response?.data|| error.message)
    throw error
  }
}