import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import SignIn from './SignIn'
import Footer from './Footer'
import EventRegistration from './EventRegistration'

function AppLayout() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <SignIn />
      <EventRegistration />
      <Outlet />
      <Footer />
    </>
  )
}

export default AppLayout
