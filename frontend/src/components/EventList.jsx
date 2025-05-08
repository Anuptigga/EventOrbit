import React from 'react'
import Navbar from './Navbar'
import EventItem from './EventItem'
import { assets } from '../assets/assets'

export default function EventList() {
  const events = [
    {
      id: 1,
      image: assets.tech,
      title: 'Tech Conference 2025',
      description:
        'Join industry leaders for a day of inspiring tech talks and networking.',
    },
    {
      id: 2,
      image: assets.c_img1,
      title: 'Summer Beats Festival',
      description:
        'A weekend full of music, dance, and unforgettable summer memories.',
    },
    {
      id: 3,
      image: assets.c_img2,
      title: 'Urban Art Showcase',
      description:
        'Explore local artists and their amazing street-inspired artworks.',
    },
    {
      id: 4,
      image: assets.c_img3,
      title: 'Gourmet Food Expo',
      description:
        'Taste dishes from top chefs and discover new culinary trends.',
    },
    {
      id: 5,
      image: assets.c_img4,
      title: 'Startup Pitch Night',
      description:
        'Watch emerging startups pitch their ideas to investors and mentors.',
    },
  ]

  return (
    <>
      <Navbar />
      <div className="max-w-6xl h-xl mx-auto p-6 space-y-6 grid gap-6 grid-cols-1">
        {events.map((event) => (
          <EventItem key={event.id} event={event} />
        ))}
      </div>
    </>
  )
}
