import SignIn from './components/SignIn'

function App() {
  return (
    <div className="bg-base-200">
      <h1 className="text-2xl font-bold p-2 text-center bg-secondary text-white">
        EVENT ORBIT
      </h1>
      <div className="flex items-center justify-center min-h-screen">
        <SignIn />
      </div>
    </div>
  )
}

export default App
