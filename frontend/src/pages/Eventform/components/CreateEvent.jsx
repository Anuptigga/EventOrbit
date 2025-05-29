import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { GiCrossMark } from 'react-icons/gi'
import { DatePicker } from '../../../components/DatePicker'

function CreateEvent() {
  const [newCategory, setNewCategory] = useState('')
  const [eventCategory, setEventCategory] = useState([])
  const [date, setDate] = useState('')

  const actionData = useActionData()
  const navigation = useNavigation()
  const navigate = useNavigate()
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const handleAddCategory = () => {
    const trimmed = newCategory.trim()
    if (!trimmed) return toast.error('Category cannot be empty')
    if (
      trimmed &&
      !eventCategory.some((cat) => cat.toLowerCase() === trimmed.toLowerCase())
    ) {
      setEventCategory([...eventCategory, trimmed])
      setNewCategory('')
    } else {
      toast.error('Category already exists')
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

      <div className="flex flex-col space-y-2">
        <Label className="text-secondary font-semibold">
          Event Name <span className="text-destructive">*</span>
        </Label>
        <Input type="text" name="eventName" required placeholder="Event Name" />
      </div>

      <div className="flex flex-col space-y-2">
        <Label className="text-secondary font-semibold">
          Event Description <span className="text-destructive">*</span>
        </Label>
        <Textarea
          name="eventDescription"
          required
          placeholder="Describe your event"
        />
      </div>

      <input type="hidden" name="eventDate" value={date} />
      <div className="flex flex-col space-y-2">
        <Label className="text-secondary font-semibold">
          Event Date <span className="text-destructive">*</span>
        </Label>
        <DatePicker date={date} setDate={setDate} />
      </div>

      <div className="flex flex-col space-y-2">
        <Label className="text-secondary font-semibold">
          Event Venue <span className="text-destructive">*</span>
        </Label>
        <Input type="text" name="eventVenue" required placeholder="Venue" />
      </div>

      <div className="flex flex-col space-y-2">
        <Label className="text-secondary font-semibold">
          Event Poster <span className="text-destructive">*</span>
        </Label>
        <input
          type="file"
          name="img"
          accept="image/*"
          required
          className="file:mr-4 file:rounded-full file:border-0 file:px-4 file:py-2 file:text-sm font-semibold file:text-primary-foreground file:bg-primary file:cursor-pointer"
        />
      </div>

      {/* --- Category Input --- */}
      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-bold text-primary mb-3">
          Event Categories (Optional)
        </h3>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
          <Input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="e.g. Sports, Cultural"
            // className="flex-1 px-4 py-2 rounded-lg border outline-none"
          />
          <Button
            type="button"
            onClick={handleAddCategory}
            className="px-4 py-2 rounded-lg text-lg"
          >
            Add Category
          </Button>
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
                className="text-primary font-bold cursor-pointer"
              >
                <GiCrossMark />
              </button>
            </div>
          ))}
        </div>
      </div>

      <Button type="submit" className="w-full px-4 py-2 rounded-lg text-lg">
        Create Event
      </Button>
    </Form>
  )
}

export default CreateEvent
