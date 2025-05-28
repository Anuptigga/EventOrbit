import { useEffect, useRef, useState } from 'react'
import { getAllEvents } from '../../services/event'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useEvent } from '../../hooks/useEvent'
import { useAuth } from '../../hooks/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'
import RightSection from './components/RightSection'
import LeftSection from './components/LeftSection'
import { Plus } from 'lucide-react'

export default function EventList() {
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const clickedRef = useRef(false)

  const location = useLocation()
  const navigate = useNavigate()

  const from = location.state?.from?.pathname || '/'

  const { setEventOpen, setSelectedEventId } = useEvent()
  const { isLoggedIn, handleClickLogin } = useAuth()

  const handleClick = () => {
    if (clickedRef.current) return
    setEventOpen(true)
    setSelectedEventId(selectedEvent._id)
  }

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents()
        setEvents(data)
      } catch (error) {
        console.error('Error fetching events:', error)
      }
    }
    fetchEvents()
  }, [])

  return (
    <div className="bg-base-200 grid grid-cols-1 md:grid-cols-[1fr_1px_2fr] w-full px-20 pt-30 min-h-screen gap-6">
      {/* Left: List */}
      <div className="hidden md:block space-y-4">
        {events.map((event) => (
          <LeftSection
            key={event._id}
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
            event={event}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="hidden md:block w-[1px] h-screen bg-secondary mx-auto" />

      {/* Right: Detail */}
      <div className="hidden md:block">
        <AnimatePresence mode="wait">
          {selectedEvent ? (
            <RightSection
              selectedEvent={selectedEvent}
              setSelectedEvent={setSelectedEvent}
              handleClick={handleClick}
            />
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-accent text-xl font-semibold text-center"
            >
              Select an event to view details
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {selectedEvent ? (
          <RightSection
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
            handleClick={handleClick}
          />
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <LeftSection
                key={event._id}
                selectedEvent={selectedEvent}
                setSelectedEvent={setSelectedEvent}
                event={event}
              />
            ))}
          </div>
        )}
      </div>

      <Button
        className="fixed bottom-25 right-10 rounded-full w-12 h-12"
        onClick={isLoggedIn ? () => navigate('/eventform') : handleClickLogin}
      >
        <Plus />
      </Button>
    </div>
  )
}
