import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom'
import { createEvent } from '../services/api/event'

function EventForm() {
  const [newCategory, setNewCategory] = useState('')
  const [eventCategory, setEventCategory] = useState([])

  const actionData = useActionData()
  const navigation = useNavigation()
  const navigate = useNavigate()
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const handleAddCategory = () => {
    const trimmed = newCategory.trim()
    if (
      trimmed &&
      !eventCategory.some((cat) => cat.toLowerCase() === trimmed.toLowerCase())
    ) {
      setEventCategory([...eventCategory, trimmed])
      setNewCategory('')
    }
  }

  const handleRemoveCategory = (index) => {
    setEventCategory(eventCategory.filter((_, i) => i !== index))
  }

  useEffect(() => {
    if (navigation.state === 'submitting') {
      setHasSubmitted(true)
      toast.loading('Creating Event...', { toastId: 'event-toast' })
    }

    if (navigation.state === 'idle' && hasSubmitted && actionData) {
      if (actionData.success) {
        toast.update('event-toast', {
          render: actionData.success,
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        })
        setTimeout(() => {
          navigate('/eventlist')
        }, 3500)
      } else if (actionData.error) {
        toast.update('event-toast', {
          render: actionData.error,
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        })
      }
      setHasSubmitted(false)
    }
  }, [navigation.state, actionData])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 pt-30 bg-base-200">
      <div className="w-full max-w-4xl bg-base-100 p-10 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">
          Create New Event
        </h2>

        <Form
          method="post"
          encType="multipart/form-data"
          className="space-y-6"
          action="/eventform"
        >
          <input
            type="hidden"
            name="eventCategory"
            value={JSON.stringify(eventCategory)}
          />

          <div className="flex flex-col space-y-1">
            <label className="font-semibold">
              Event Name <span className="text-error">*</span>
            </label>
            <input
              type="text"
              name="eventName"
              required
              className="w-full px-4 py-2 rounded-lg border shadow-sm outline-none"
              placeholder="Type your event's name"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="font-semibold">
              Event Description <span className="text-error">*</span>
            </label>
            <textarea
              name="eventDescription"
              rows="3"
              required
              className="w-full px-4 py-2 rounded-lg border shadow-sm outline-none resize-none"
              placeholder="Describe your event..."
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="font-semibold">
              Event Date <span className="text-error">*</span>
            </label>
            <input
              type="date"
              name="eventDate"
              required
              className="w-full px-4 py-2 rounded-lg border shadow-sm outline-none"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="font-semibold">
              Event Venue <span className="text-error">*</span>
            </label>
            <input
              type="text"
              name="eventVenue"
              required
              className="w-full px-4 py-2 rounded-lg border shadow-sm outline-none"
              placeholder="Enter event venue"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="font-semibold">
              Event Poster <span className="text-error">*</span>
            </label>
            <input
              type="file"
              name="img"
              accept="image/*"
              required
              className="file:mr-4 file:rounded-full file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-content file:bg-primary file:cursor-pointer"
            />
          </div>

          {/* --- Category Input --- */}
          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-bold text-primary mb-3">
              Event Categories (Optional)
            </h3>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="e.g. Sports, Cultural"
                className="flex-1 px-4 py-2 rounded-lg border outline-none"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="bg-primary text-white px-4 py-2 rounded-lg"
              >
                Add Category
              </button>
            </div>

            <div className="mt-4 space-y-2">
              {eventCategory.map((cat, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-4 py-2 border rounded-lg"
                >
                  <span>{cat}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(idx)}
                    className="text-primary font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-xl transition"
          >
            Create Event
          </button>
        </Form>
      </div>
    </div>
  )
}

export async function action({ request }) {
  try {
    const formData = await request.formData()
    // const data = Object.fromEntries(formData)
    // console.log(data)
    for (let pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1])
    }

    await createEvent(formData)
    return { success: 'Event created successfully!' }
  } catch (err) {
    console.error('Error creating event:', err)
    return { error: 'Failed to create event. Please try again.' }
  }
}

export default EventForm
