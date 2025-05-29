import CreateEvent from './components/CreateEvent'

function index() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 pt-30">
      <div className="w-full max-w-4xl p-10 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">
          Create New Event
        </h2>
        <CreateEvent />
      </div>
    </div>
  )
}

export default index
