import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { createEvent } from '../services/api/event'

export default function EventForm() {
  const [newCategory, setNewCategory] = useState('')
  const [eventData, setEventData] = useState({
    eventName: '',
    eventDescription: '',
    eventDate: '',
    eventVenue: '',
    // eventPoster: '',
    eventCategory: [], // now stores array of objects like [{ name: 'Tech' }]
  })

  const navigate = useNavigate()

  const handleAddCategory = () => {
    const trimmed = newCategory.trim()
    if (
      trimmed &&
      !eventData.eventCategory.some(
        (cat) => cat.name.toLowerCase() === trimmed.toLowerCase()
      )
    ) {
      setEventData((prev) => ({
        ...prev,
        eventCategory: [...prev.eventCategory, { name: trimmed }],
      }))
      setNewCategory('')
    }
  }

  const handleRemoveCategory = (indexToRemove) => {
    setEventData((prev) => ({
      ...prev,
      eventCategory: prev.eventCategory.filter((_, i) => i !== indexToRemove),
    }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    console.log(eventData)

    e.preventDefault()
    if (
      !eventData.eventName ||
      !eventData.eventDescription ||
      !eventData.eventDate ||
      !eventData.eventVenue
      // !eventData.eventPoster
    ) {
      toast.error('🚨 Please fill all the required fields!')
      return
    }

    console.log('Event Data:', eventData)

    try {
      await createEvent(eventData)
      toast.success('🎉 Event created successfully!')

      navigate('/EventList')
    } catch (error) {
      console.error('Error creating event:', error) // Log the error for debugging

      // Enhanced error message
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : '❌ Failed to create event. Please try again.'

      toast.error(errorMessage)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8 pt-30 bg-base-200"
      // style={{
      //   background: 'linear-gradient(135deg, oklch(96% 0.03 250), oklch(94% 0.04 320))',
      // }}
    >
      <ToastContainer />
      <div className="w-full mx-4 max-w-4xl bg-base-100 p-10 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">
          Create New Event
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* --- Other Fields --- */}
          <div className="flex flex-col space-y-1">
            <label className="[color:oklch(21%_0.006_56.043)] font-semibold">
              Event Name <span className="text-error">*</span>
            </label>
            <input
              type="text"
              name="eventName"
              value={eventData.eventName}
              onChange={handleChange}
              placeholder="Type your event's name"
              className="w-full px-4 py-2 rounded-lg [background-color:oklch(98%_0.001_106.423)] border [border-color:oklch(92%_0.003_48.717)] shadow-sm focus:[ring-color:oklch(58%_0.233_277.117)] focus:ring-2 outline-none"
              required
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="[color:oklch(21%_0.006_56.043)] font-semibold">
              Event Description <span className="text-error">*</span>
            </label>
            <textarea
              name="eventDescription"
              rows="3"
              value={eventData.eventDescription}
              onChange={handleChange}
              placeholder="Describe your event..."
              className="w-full px-4 py-2 rounded-lg [background-color:oklch(98%_0.001_106.423)] border [border-color:oklch(92%_0.003_48.717)] shadow-sm focus:[ring-color:oklch(58%_0.233_277.117)] focus:ring-2 outline-none resize-none"
              required
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="[color:oklch(21%_0.006_56.043)] font-semibold">
              Event Date <span className="text-error">*</span>
            </label>
            <input
              type="date"
              name="eventDate"
              value={eventData.eventDate}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg [background-color:oklch(98%_0.001_106.423)] border [border-color:oklch(92%_0.003_48.717)] shadow-sm focus:[ring-color:oklch(58%_0.233_277.117)] focus:ring-2 outline-none"
              required
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="[color:oklch(21%_0.006_56.043)] font-semibold">
              Event Venue <span className="text-error">*</span>
            </label>
            <input
              type="text"
              name="eventVenue"
              value={eventData.eventVenue}
              onChange={handleChange}
              placeholder="Enter event venue"
              className="w-full px-4 py-2 rounded-lg [background-color:oklch(98%_0.001_106.423)] border [border-color:oklch(92%_0.003_48.717)] shadow-sm focus:[ring-color:oklch(58%_0.233_277.117)] focus:ring-2 outline-none"
              required
            />
          </div>

          {/* <div className="flex flex-col space-y-1">
            <label className="[color:oklch(21%_0.006_56.043)] font-semibold">
              Event poster <span className="text-error">*</span>
            </label>
            <input
              type="text"
              name="eventPoster"
              value={eventData.eventPoster}
              onChange={handleChange}
              placeholder="Enter club's name"
              className="w-full px-4 py-2 rounded-lg [background-color:oklch(98%_0.001_106.423)] border [border-color:oklch(92%_0.003_48.717)] shadow-sm focus:[ring-color:oklch(58%_0.233_277.117)] focus:ring-2 outline-none"
              required
            />
          </div> */}

          <div className="flex flex-col space-y-1">
            <label className="[color:oklch(21%_0.006_56.043)] font-semibold">
              Event poster <span className="text-error">*</span>
            </label>
            <input
              type="file"
              name="eventPoster"
              accept="image/*"
              className="file:mr-4 file:rounded-full file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-content file:bg-primary file:cursor-pointer"
            />
          </div>

          {/* --- Category Section --- */}
          <div className="border-t [border-color:oklch(92%_0.003_48.717)] pt-6 mt-6">
            <h3 className="text-lg font-bold text-primary mb-3">
              Event Categories (Optional)
            </h3>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="e.g. Tech, Music, Workshop"
                className="flex-1 px-4 py-2 rounded-lg border [border-color:oklch(92%_0.003_48.717)] outline-none [background-color:oklch(98%_0.001_106.423)] focus:[ring-color:oklch(58%_0.233_277.117)] focus:ring-2"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="bg-primary cursor-pointer text-primary-content hover:bg-primary font-semibold px-4 py-2 rounded-lg transition"
              >
                Add Category
              </button>
            </div>

            <div className="mt-4 space-y-2">
              {eventData.eventCategory.map((cat, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-4 py-2 [background-color:oklch(97%_0.001_106.424)] border [border-color:oklch(92%_0.003_48.717)] rounded-lg"
                >
                  <span className="[color:oklch(21%_0.006_56.043)] font-medium">
                    {cat.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(idx)}
                    className="text-sm [color:oklch(58%_0.233_277.117)] hover:[color:oklch(58%_0.233_277.117/0.8)] font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-primary hover:bg-primary-focus text-primary-content font-semibold py-3 px-4 rounded-xl transition duration-200"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  )
}
