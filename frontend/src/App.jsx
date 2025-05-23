import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import Home from './pages/Home'
import EventForm, { action as createEvent } from './components/EventForm'
import EventList from './components/EventList'
import PageNotFound from './components/PageNotFound'
import { action as registerEvent } from './components/EventRegistration'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'eventform',
        element: <EventForm />,
        action: createEvent,
      },
      {
        path: 'eventlist',
        element: <EventList />,
        action: registerEvent,
      },
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
