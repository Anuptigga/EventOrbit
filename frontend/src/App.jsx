import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventForm from './components/EventForm';
import EventList from './components/EventList'; 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventForm />} />
        <Route path="/EventList" element={<EventList />} />
      </Routes>
    </Router>
  );
}

export default App;
