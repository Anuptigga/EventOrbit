import { registerEvent } from '../../../services/api/event'

export async function action({ request }) {
  try {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    const id = data.eventId
    await registerEvent(id, data)
    return { success: 'Event registered successfully!' }
  } catch (err) {
    return { error: 'Failed to register event. Please try again.' }
  }
}
