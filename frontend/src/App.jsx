import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import EventForm from './components/EventForm'
import EventList from './components/EventList'
import SignIn from './components/SignIn'
import HomePage from './components/HomePage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <SignIn />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/EventForm" element={<EventForm />} />
        <Route path="/EventList" element={<EventList />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
