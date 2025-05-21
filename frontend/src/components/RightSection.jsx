import { motion } from 'framer-motion'
import Button from './Button'
import { getParticipants } from '../services/api/participant'
import { useState } from 'react'

function RightSection({ selectedEvent, setSelectedEvent, handleClick }) {
  const [participants, setParticipants] = useState([])

  const handleParticipants = async () => {
    const res = await getParticipants(selectedEvent._id)
    setParticipants(res.participant)
  }
  return (
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
        className="rounded-lg w-full object-cover"
      />
      <p>{selectedEvent.eventDescription}</p>
      <p className="text-sm text-gray-500">
        Date :{' '}
        {new Date(selectedEvent.eventDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
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
      <div>
        <Button className="secondary-btn" onClick={handleParticipants}>
          View Participants
        </Button>

        <div className="mt-4 space-y-4">
          {participants.length !== 0 &&
            participants.map((p, index) => (
              <div
                key={p._id || index}
                className="border p-4 rounded-lg shadow"
              >
                <p>
                  <strong>Name:</strong> {p.name}
                </p>
                <p>
                  <strong>Email:</strong> {p.email}
                </p>
                <p>
                  <strong>Branch:</strong> {p.branch}
                </p>
                <p>
                  <strong>Batch:</strong> {p.batch}
                </p>
                <p>
                  <strong>Phone:</strong> {p.phone}
                </p>
                <p>
                  <strong>Event Category:</strong> {p.eventCategory}
                </p>
              </div>
            ))}
        </div>
      </div>
    </motion.div>
  )
}

export default RightSection
