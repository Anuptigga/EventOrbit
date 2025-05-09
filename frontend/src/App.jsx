import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import EventForm from './components/EventForm'
import EventList from './components/EventList'
import SignIn from './components/SignIn'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'
import 'react-toastify/dist/ReactToastify.css'
import PageNotFound from './components/PageNotFound'

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />

      <SignIn />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/EventForm" element={<EventForm />} />
        <Route path="/EventList" element={<EventList />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
