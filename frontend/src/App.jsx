import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import EventForm from './components/EventForm'
import EventList from './components/EventList'
import SignIn from './components/SignIn'
import HomePage from './components/HomePage'
import Navbar from './components/Navbar'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <Router>
      <Navbar />
      <SignIn />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/EventForm" element={<EventForm />} />
        <Route path="/EventList" element={<EventList />} />
      </Routes>
    </Router>
  )
}

export default App
