import { useEffect, useRef, useState } from 'react'
import { getAllEvents } from '../services/api/event'
import { AnimatePresence, motion } from 'framer-motion'
import Button from './Button'
import { useEvent } from '../hooks/useEvent'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function EventList() {
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const clickedRef = useRef(false)

  const navigate = useNavigate()

  const { setEventOpen } = useEvent()
  const { isLoggedIn, handleClickLogin } = useAuth()

  const handleClick = () => {
    if (clickedRef.current) return
    // clickedRef.current = true
    setEventOpen(true)
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
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_2fr] max-w-6xl mx-auto p-6 pt-30 min-h-screen gap-6">
      {/* Left: List */}
      <div className="space-y-4">
        {events.map((event) => (
          <motion.div
            key={event._id}
            onClick={() => setSelectedEvent(event)}
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-lg cursor-pointer transition duration-300 hover:scale-105 ${
              selectedEvent?._id === event._id
                ? 'bg-secondary text-secondary-content'
                : 'text-primary'
            }`}
          >
            <h2 className="text-lg font-semibold">{event.eventName}</h2>
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <div className="hidden md:block w-[1px] h-screen bg-neutral mx-auto" />

      {/* Right: Detail */}
      <div className="hidden md:block">
        <AnimatePresence mode="wait">
          {selectedEvent ? (
            <motion.div
              key={selectedEvent._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className=" rounded-lg p-6 space-y-4"
            >
              <h2 className="text-3xl font-bold">{selectedEvent.eventName}</h2>
              <img
                src={selectedEvent.eventPoster}
                alt={selectedEvent.eventName}
                className="rounded-lg w-full max-h-[300px] object-cover"
              />
              <p>{selectedEvent.eventDescription}</p>
              <p className="text-sm text-gray-500">
                Date: {selectedEvent.date}
              </p>
              <div className="flex justify-between">
                <Button className="primary-btn" onClick={handleClick}>
                  Register
                </Button>
                <Button
                  className="secondary-btn"
                  onClick={() => setSelectedEvent(null)}
                >
                  Back
                </Button>
              </div>
            </motion.div>
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
      <div>
        <Button
          className="fixed bottom-25 right-10 primary-btn rounded-full px-6 py-4"
          onClick={isLoggedIn ? () => navigate('/eventform') : handleClickLogin}
        >
          +
        </Button>
      </div>
    </div>
  )
}
