import { useEffect, useRef, useState } from 'react'
import { useEvent } from '../hooks/useEvent'
import { Form, useNavigation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

function EventRegistration() {
  const [category, setCategory] = useState('None')

  const { eventOpen, setEventOpen, selectedEventId } = useEvent()
  const formRef = useRef(null)

  const handleClose = () => {
    formRef.current?.reset()
    setEventOpen(false)
    setCategory('')
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
      <div className="fixed inset-0 z-[100] backdrop-blur-sm flex justify-center items-center">
        <Form
          ref={formRef}
          method="POST"
          action="/eventlist"
          className="relative bg-card p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4"
          onSubmit={() => (formRef.current.dataset.submitted = 'true')}
        >
          <h2 className="text-primary text-2xl font-bold text-center mb-6">
            Register to Event
          </h2>

          <input type="hidden" name="eventId" value={selectedEventId} />

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name<span className='text-destructive'>*</span></Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Full Name"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="branch">Branch<span className='text-destructive'>*</span></Label>
              <Input
                id="branch"
                name="branch"
                type="text"
                required
                placeholder="Branch"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="batch">Batch (Year)<span className='text-destructive'>*</span></Label>
              <Input
                id="batch"
                name="batch"
                type="number"
                required
                placeholder="Batch Year"
                className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="eventCategory">Event Category</Label>
              <input type='hidden' name="eventCategory" value={category} />
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="eventCategory" className="w-[180px] cursor-pointer">
                  <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent className='z-[101]'>
                  <SelectItem value="None">None</SelectItem>
                  <SelectItem value="Competition">Competition</SelectItem>
                  <SelectItem value="Workshop">Workshop</SelectItem>
                  <SelectItem value="Seminar">Seminar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email Address<span className='text-destructive'>*</span></Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number<span className='text-destructive'>*</span></Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="Phone Number"
              />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Button type="submit">Register</Button>
            <Button type="button" variant="secondary" onClick={handleClose}>
              Back
            </Button>
          </div>
        </Form>
      </div>
    )
  )
}

export default EventRegistration
