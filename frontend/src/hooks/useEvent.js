import { useContext } from 'react'
import { EventContext } from '../contexts/EventContext'

function useEvent() {
  const context = useContext(EventContext)
  if (context === undefined)
    throw new Error('EventContext was used outside of its Provider')
  return context
}

export { useEvent }
