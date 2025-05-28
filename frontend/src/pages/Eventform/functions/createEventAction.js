import { createEvent } from '../../../services/event'

export async function action({ request }) {
  try {
    const formData = await request.formData()
    await createEvent(formData)
    return { success: 'Event created successfully!' }
  } catch (err) {
    console.error('Error creating event:', err)
    return { error: 'Failed to create event. Please try again.' }
  }
}
