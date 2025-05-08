import React from 'react'

function EventItem({ event }) {
  const { eventPoster, eventName, eventDescription } = event

  return (
    <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-md cursor-pointer transform transition-transform duration-300 hover:scale-105 group">
      <img
        src={eventPoster}
        alt={eventName}
        className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 p-4 flex flex-col justify-end bg-neutral/50 transition-colors duration-300 group-hover:bg-transparent">
        <h2 className="text-white text-xl font-bold">{eventName}</h2>
        <p className="text-white text-sm">{eventDescription}</p>
      </div>
    </div>
  )
}

export default EventItem
