import axios from './axios'

export const createEvent = async (eventData) => {
  try {
    const response = await axios.post('/event/createEvent', eventData)
    return response.data
  } catch (err) {
    console.error('Failed to create event:', err)
    throw err
  }
}

export const getAllEvents = async () => {
  try {
    const response = await axios.get('/event/getAllEvents')
    return response.data.events
  } catch (err) {
    console.error('Failed to fetch events:', err)
    throw err
  }
}

export const registerEvent = async (eventId, userData) => {
  try {
    const response = await axios.post(`/register/${eventId}`, userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (err) {
    console.error('Failed to register event:', err)
    throw err
  }
}
