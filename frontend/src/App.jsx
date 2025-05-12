import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import Home from './pages/Home'
import EventForm from './components/EventForm'
import EventList from './components/EventList'
import PageNotFound from './components/PageNotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'eventform', element: <EventForm /> },
      { path: 'eventlist', element: <EventList /> },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
