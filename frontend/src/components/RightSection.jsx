import { motion } from 'framer-motion'
import Button from './Button'
import { getParticipants } from '../services/api/participant'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { sendEmail } from '../services/api/email'
import { jwtDecode } from 'jwt-decode'

function RightSection({ selectedEvent, setSelectedEvent, handleClick }) {
  const [participants, setParticipants] = useState([])
  const [recipients, setRecipients] = useState([])
  const [flag, setFlag] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  const handleViewParticipants = async () => {
    if (!currentUser) return toast.error('You are not logged in')
    const hasParticipants = participants.length > 0
    if (!hasParticipants) return toast.error('No participants found')
    setFlag((prev) => !prev)
  }

  const handleNotify = async () => {
    try {
      const res = await sendEmail(selectedEvent._id, recipients)
      console.log(res)
      return toast.success(res.message)
    } catch (err) {
      return toast.error(err.message)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setCurrentUser(jwtDecode(token))
    }
  }, [])

  useEffect(() => {
    if (!selectedEvent) return
    const fetchParticipants = async () => {
      try {
        const res = await getParticipants(selectedEvent._id)
        setParticipants(res.participant || [])
      } catch (error) {
        console.error('Error fetching participants:', error)
      }
    }

    fetchParticipants()
  }, [selectedEvent])

  useEffect(() => {
    if (participants.length && selectedEvent) {
      const allRecipients = participants.map((participant) => ({
        to: participant.email,
        subject: `Invitation to ${selectedEvent.eventName}`,
        text: `You are invited to ${selectedEvent.eventName}`,
        html: `You are invited to ${selectedEvent.eventName}`,
      }))
      setRecipients(allRecipients)
    }
  }, [participants, selectedEvent])

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
        <Button className="btn btn-primary" onClick={handleClick}>
          Register
        </Button>
        <Button
          className="btn btn-secondary"
          onClick={() => setSelectedEvent(null)}
        >
          Back
        </Button>
      </div>
      {selectedEvent?.hostId === currentUser?.id && (
        <div>
          <div className="flex justify-between">
            <Button className="btn btn-primary" onClick={handleViewParticipants}>
              {flag ? 'Hide' : 'View'} Participants
            </Button>
            <Button className="btn btn-primary" onClick={handleNotify}>
              Notify Participants
            </Button>
          </div>

          {flag && (
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
          )}
        </div>
      )}
    </motion.div>
  )
}

export default RightSection
