import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

export default function EventForm() {
  const [newCategory, setNewCategory] = useState('')
  const [eventData, setEventData] = useState({
    eventName: '',
    eventDescription: '',
    eventDate: '',
    eventVenue: '',
    clubName: '',
    eventCategory: [], // now stores array of objects like [{ name: 'Tech' }]
  })

  const navigate = useNavigate()

  const handleAddCategory = () => {
    const trimmed = newCategory.trim()
    if (
      trimmed &&
      !eventData.eventCategory.some((cat) => cat.name.toLowerCase() === trimmed.toLowerCase())
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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      !eventData.eventName ||
      !eventData.eventDescription ||
      !eventData.eventDate ||
      !eventData.eventVenue ||
      !eventData.clubName
    ) {
      toast.error('🚨 Please fill all the required fields!')
      return
    }

    console.log('Event Data:', eventData)

    setEventData({
      eventName: '',
      eventDescription: '',
      eventDate: '',
      eventVenue: '',
      clubName: '',
      eventCategory: [],
    })
    setNewCategory('')
    navigate('/EventList')
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8 bg-base-200"
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
            <label className="[color:oklch(21%_0.006_56.043)] font-semibold">Event Name</label>
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
            <label className="[color:oklch(21%_0.006_56.043)] font-semibold">Event Description</label>
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
            <label className="[color:oklch(21%_0.006_56.043)] font-semibold">Event Date</label>
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
            <label className="[color:oklch(21%_0.006_56.043)] font-semibold">Event Venue</label>
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

          <div className="flex flex-col space-y-1">
            <label className="[color:oklch(21%_0.006_56.043)] font-semibold">Club's Name</label>
            <input
              type="text"
              name="clubName"
              value={eventData.clubName}
              onChange={handleChange}
              placeholder="Enter club's name"
              className="w-full px-4 py-2 rounded-lg [background-color:oklch(98%_0.001_106.423)] border [border-color:oklch(92%_0.003_48.717)] shadow-sm focus:[ring-color:oklch(58%_0.233_277.117)] focus:ring-2 outline-none"
              required
            />
          </div>

          {/* --- Category Section --- */}
          <div className="border-t [border-color:oklch(92%_0.003_48.717)] pt-6 mt-6">
            <h3 className="text-lg font-bold [color:oklch(58%_0.233_277.117)] mb-3">
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
                className="[background-color:oklch(58%_0.233_277.117)] hover:[background-color:oklch(58%_0.233_277.117/0.9)] [color:oklch(96%_0.018_272.314)] font-semibold px-4 py-2 rounded-lg transition"
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
                  <span className="[color:oklch(21%_0.006_56.043)] font-medium">{cat.name}</span>
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
            className="w-full [background-color:oklch(58%_0.233_277.117)] hover:[background-color:oklch(58%_0.233_277.117/0.9)] [color:oklch(96%_0.018_272.314)] font-semibold py-3 px-4 rounded-xl transition duration-200"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  )
}
