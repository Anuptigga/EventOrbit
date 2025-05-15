import axios from 'axios'

const URL = 'https://eventorbit.onrender.com/api' || 'http://localhost:8000/api'

const instance = axios.create({
  baseURL: URL,
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') // or sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default instance
