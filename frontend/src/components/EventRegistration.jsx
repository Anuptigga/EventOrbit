import { useEffect, useRef } from 'react'
import { useEvent } from '../hooks/useEvent'
import Button from './Button'
import { Form, useNavigation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerEvent } from '../services/api/event'

function EventRegistration() {
  const { eventOpen, setEventOpen, selectedEventId } = useEvent()

  const formRef = useRef(null)

  const handleClose = () => {
    formRef.current?.reset()
    setEventOpen(false)
  }

  useEffect(() => {
    document.body.style.overflow = eventOpen ? 'hidden' : 'unset'
  }, [eventOpen])

  const navigation = useNavigation()

  useEffect(() => {
    if (navigation.state === 'submitting') {
      toast.info('Submitting your registration...')
    }
    if (
      navigation.state === 'idle' &&
      formRef.current?.dataset.submitted === 'true'
    ) {
      toast.success('Event registration successful!')
      formRef.current?.reset()
      setEventOpen(false)
      formRef.current.dataset.submitted = 'false' 
    }
  }, [navigation.state, setEventOpen])

  return (
    eventOpen && (
      <div className="fixed inset-0 z-[100] backdrop-blur-sm bg-neutral/30 flex justify-center items-center">
        <Form
          ref={formRef}
          method="POST"
          action="/eventlist"
          className="relative bg-base-100 p-8 rounded-2xl shadow-lg w-full max-w-md"
          onSubmit={() => (formRef.current.dataset.submitted = 'true')}
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            Register to Event
          </h2>

          <div className="space-y-4 mb-6">
            <input type="hidden" name="eventId" value={selectedEventId} />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="w-full outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-accent 
              rounded-lg p-2 px-6"
            />
            <input
              type="text"
              name="branch"
              placeholder="Branch"
              required
              className="w-full outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-accent 
              rounded-lg p-2 px-6"
            />
            <input
              type="number"
              name="batch"
              placeholder="Batch (Year)"
              required
              className="w-full appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-accent 
              rounded-lg p-2 px-6"
            />
            <select
              name="eventCategory"
              className="w-full outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-accent 
              rounded-lg p-2 px-6"
            >
              <option value="" disabled>
                Select Category (optional)
              </option>
              <option value="None">None</option>
              <option value="Workshop">Workshop</option>
              <option value="Seminar">Seminar</option>
              <option value="Competition">Competition</option>
            </select>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="w-full outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-accent 
              rounded-lg p-2 px-6"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              className="w-full outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-accent 
              rounded-lg p-2 px-6"
            />
          </div>

          <div className="flex justify-between">
            <Button type="submit" className="primary-btn">
              Register
            </Button>
            <Button
              type="button"
              className="secondary-btn"
              onClick={handleClose}
            >
              Back
            </Button>
          </div>
        </Form>
      </div>
    )
  )
}

export async function action({ request }) {
  try {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    console.log(data)
    const id = data.eventId

    await registerEvent(id, formData)
    return { success: 'Event registered successfully!' }
  } catch (err) {
    console.error('Error registering event:', err)
    return { error: 'Failed to register event. Please try again.' }
  }
}

export default EventRegistration
