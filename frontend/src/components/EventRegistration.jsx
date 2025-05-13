import { useEffect, useRef, useState } from 'react'
import { useEvent } from '../hooks/useEvent'
import Button from './Button'
import { Form, useNavigation } from 'react-router-dom'
import { toast } from 'react-toastify'

function EventRegistration() {
  const { eventOpen, setEventOpen } = useEvent()

  const [formData, setFormData] = useState({
    name: '',
    branch: '',
    batch: '',
    eventCategory: '',
    email: '',
    phone: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  // }

  const formRef = useRef(null)

  const handleClose = () => {
    formRef.current?.reset()
    setEventOpen(false)
    // setFormData({
    //   name: '',
    //   branch: '',
    //   batch: '',
    //   eventCategory: '',
    //   email: '',
    //   phone: '',
    // })
  }

  useEffect(() => {
    document.body.style.overflow = eventOpen ? 'hidden' : 'unset'
  }, [eventOpen])

  // const isSubmitting = navigation.state === 'submitting'
  const navigation = useNavigation()
  // const isIdle = navigation.state === 'idle'

  // useEffect(() => {
  //   // When submission just finished
  //   if (isIdle && formRef.current) {
  //     const form = formRef.current

  //     // ✅ Check if the last submission was via this form
  //     if (form.dataset.submitted === 'true') {
  //       toast.success('Event registration successful!')
  //       form.reset() // native form reset
  //       setEventOpen(false)
  //       form.dataset.submitted = 'false' // reset flag
  //     }
  //   }
  // }, [isIdle])

  // const handleSubmit = () => {
  //   if (formRef.current) {
  //     formRef.current.dataset.submitted = 'true'
  //   }
  // }

  useEffect(() => {
    console.log(navigation.state)

    if (navigation.state === 'submitting') {
      formRef.current?.reset()
      setEventOpen(false)
      toast.success('Event registration successful!')
    }
  }, [navigation.state, formRef, setEventOpen])

  return (
    eventOpen && (
      <div className="absolute top-0 left-0 right-0 bottom-0 z-100 backdrop-blur-sm bg-neutral/30 flex justify-center items-center">
        <Form
          ref={formRef}
          method="POST"
          action="/eventlist"
          className="relative bg-base-100 p-8 rounded-2xl shadow-lg w-110 max-w-md"
          // onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            Register to Event
          </h2>

          <div className="space-y-4 mb-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="w-full outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-accent 
            rounded-lg p-2 px-6"
              // value={formData.name}
              // onChange={handleChange}
            />
            <input
              type="text"
              name="branch"
              placeholder="Branch"
              required
              className="w-full outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-accent 
            rounded-lg p-2 px-6"
              // value={formData.branch}
              // onChange={handleChange}
            />
            <input
              type="number"
              name="batch"
              placeholder="Batch (Year)"
              required
              className="w-full appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-accent 
            rounded-lg p-2 px-6"
              // value={formData.batch}
              // onChange={handleChange}
            />
            <select
              name="eventCategory"
              className="w-full outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-accent 
            rounded-lg p-2 px-6"
              // value={formData.eventCategory}
              // onChange={handleChange}
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
              // value={formData.email}
              // onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              className="w-full outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-accent 
            rounded-lg p-2 px-6"
              // value={formData.phone}
              // onChange={handleChange}
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

async function registerEvent(formData) {
  try {
    const res = await fetch('http://localhost:3000/registration', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) throw Error()
    const { data } = await res.json()
    return data
  } catch {
    throw Error('Failed creating your order')
  }
}

export async function action({ request }) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  console.log(data)

  const res = await registerEvent(data)

  // const name = data.get('name')
  // const branch = data.get('branch')
  // const batch = data.get('batch')
  // const eventCategory = data.get('eventCategory')
  // const email = data.get('email')
  // const phone = data.get('phone')
  // return { name, branch, batch, eventCategory, email, phone }
  return res
}

export default EventRegistration
