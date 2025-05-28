import Hero from './components/Hero'
import Banner from './components/Banner'
import { SparkleBackground } from '../../components/Sparkle'

function index() {
  return (
    <main className="overflow-hidden">
      <SparkleBackground />
      <Hero />
      <Banner />
      <Banner />
      <Banner />
      <Banner />
    </main>
  )
}

export default index
