import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import SignIn from './SignIn'
import Footer from './Footer'

function AppLayout() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <SignIn />
      <Outlet />
      <Footer />
    </>
  )
}

export default AppLayout
