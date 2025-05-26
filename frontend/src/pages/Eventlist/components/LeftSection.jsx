import { motion } from 'framer-motion'

function LeftSection({ selectedEvent, setSelectedEvent, event }) {
  return (
    <motion.div
      key={event._id}
      onClick={() => setSelectedEvent(event)}
      whileHover={{ scale: 1.02 }}
      className={`p-4 rounded-lg cursor-pointer transition duration-300 hover:scale-105 ${
        selectedEvent?._id === event._id
          ? 'bg-accent border-l-4 border-primary text-accent-foreground'
          : 'text-primary hover:bg-popover hover:text-popover-foreground'
      }`}
    >
      <h2 className="text-lg font-semibold">{event.eventName}</h2>
    </motion.div>
  )
}

export default LeftSection
