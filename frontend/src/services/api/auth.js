import axios from './axios'

//login
export const login = async(email,password)=>{
    try {
        const response = await axios.post('/auth/login',{email,password})
        return response.data;
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message)
        throw error
    }
}

//signup
export const signup = async(name,email,password)=>{
    if (!name || !email || !password) {
      throw new Error('All fields are required')
    }
    try {
        const response=await axios.post('/auth/signup',{name,email,password})
        return response.data;
    } catch (error) {
        console.error('Signup failed:',error.response?.data||error.message)
        throw error
    }
}