import Event from '../models/Event.js'

//create
export const createEvent = async (req, res) => {
  try {
    const {
      eventName,
      eventDescription,
      eventDate,
      eventVenue,
      eventCategory,
      eventPoster,
    } = req.body
    const hostId = req.currentHost._id
    const hostName = req.currentHost.name
    const hostImage=req.currentHost.imgURL
    const existingEvent = await Event.findOne({ eventName })
    if (existingEvent) {
      return res.status(400).json({ message: 'Event already exists' })
    }
    const event = new Event({
      hostId,
      hostName,
      hostImage,
      eventName,
      eventDescription,
      eventDate,
      eventVenue,
      eventCategory,
      eventPoster,
    })
    await event.save()
    res.status(201).json({ message: 'Event created', event })
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error })
  }
}

//get allEvents
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
    res.status(200).json({ events })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all events', error })
  }
}

//get Event
export const getEvent = async (req, res) => {
  try {
    const { _id } = req.params
    const event = await Event.findById(_id)
    if (!event) {
      return res.status(404).json({ message: 'event not found' })
    }
    res.status(200).json({ event })
  } catch (error) {
    res.status(500).json({ message: 'Event not found', error })
  }
}
