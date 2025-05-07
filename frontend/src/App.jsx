import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventForm from './components/EventForm';
import EventList from './components/EventList'; 
import SignIn from './components/SignIn'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/EventForm" element={<EventForm />} />
        <Route path="/EventList" element={<EventList />} />
      </Routes>
    </Router>
  );
}

export default App;
