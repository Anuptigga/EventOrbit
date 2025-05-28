import { Button } from '@/components/ui/button'
import { VscDebugStart } from 'react-icons/vsc'
import { assets } from '../../../assets/assets'
import { motion } from 'framer-motion'
import { FadeRight } from '../../../utility/animation'
import { useNavigate } from 'react-router-dom'
import { SparkleBackground } from '../../../components/Sparkle'

function Hero() {
  const navigate = useNavigate()
  return (
    <section className="pt-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 min-h-[650px] items-center relative">
        <div className="flex flex-col justify-center z-10">
          <div className="space-y-4 text-center md:text-left">
            <motion.h1
              variants={FadeRight(0.6)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="text-5xl lg:text-6xl font-bold leading-relaxed font-secondary"
            >
              Welcome to
              <br />
              Event <span className="text-primary">Orbit!</span>
            </motion.h1>
            <motion.p
              variants={FadeRight(0.8)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="text-2xl text-primary/80 font-medium tracking-wide"
            >
              Organize and manage all your college events with ease.
            </motion.p>
            <motion.p
              variants={FadeRight(1.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="text-lg text-accent-foreground font-medium tracking-wide"
            >
              Create events, track participation, and stay updated — all in one
              place. Empowering students to lead, manage, and make a difference
              through events.
            </motion.p>
            <motion.div
              variants={FadeRight(1.5)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="flex justify-center md:justify-start"
            >
              <Button onClick={() => navigate('/eventlist')}>
                <VscDebugStart />
                Explore Events
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Moon */}
        {/* <div className="hidden md:flex justify-center items-center z-10">
          <motion.img
            initial={{ opacity: 0, x: 200, rotate: 75 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: false }}
            src={assets.moon}
            alt="Moon Illustration"
            className="w-[300px] md:w-[500px] drop-shadow"
          />
        </div> */}

        {/* Star */}
        {/* <div className="absolute top-0 right-1/2 translate-x-1/2 md:translate-x-0  blur-sm opacity-80 rotate-[40deg]">
          <motion.img
            initial={{ opacity: 0, y: -200, rotate: 75 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
            viewport={{ once: false }}
            src={assets.star}
            alt="Star Illustration"
            className="w-full md:max-w-[300px]"
          />
        </div> */}
      </div>
    </section>
  )
}

export default Hero
