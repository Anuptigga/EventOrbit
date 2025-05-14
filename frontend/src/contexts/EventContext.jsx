import { createContext, useState } from 'react'

const EventContext = createContext()

function EventProvider({ children }) {
  const [eventOpen, setEventOpen] = useState(false)
  const [selectedEventId, setSelectedEventId] = useState(null)

  return (
    <EventContext.Provider value={{ eventOpen, setEventOpen, selectedEventId, setSelectedEventId }}>
      {children}
    </EventContext.Provider>
  )
}

export { EventContext, EventProvider }
