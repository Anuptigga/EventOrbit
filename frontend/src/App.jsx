import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import Home from './pages/Home'
import Eventform from './pages/Eventform'
import { action as createEvent } from './pages/Eventform/functions/createEventAction'
import EventList from './pages/Eventlist'
import { action as registerEvent } from './pages/Eventlist/functions/registerEventAction'
import Error from './pages/Error'
import { action as authAction } from './functions/authAction'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'eventform',
        element: <Eventform />,
        action: createEvent,
      },
      {
        path: 'eventlist',
        element: <EventList />,
        action: registerEvent,
      },
      {
        path: '*',
        element: <Error />,
      },
      {
        path: 'auth',
        action: authAction,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
