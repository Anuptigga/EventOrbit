import { createContext, useState } from 'react'

const EventContext = createContext()

function EventProvider({ children }) {
  const [eventOpen, setEventOpen] = useState(false)

  return (
    <EventContext.Provider value={{ eventOpen, setEventOpen }}>
      {children}
    </EventContext.Provider>
  )
}

export { EventContext, EventProvider }
