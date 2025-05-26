import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tailwind.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { EventProvider } from './contexts/EventContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ThemeProvider } from './components/ui/theme-provider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <EventProvider>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <App />
          </GoogleOAuthProvider>
        </EventProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
)
