import React from 'react'
import {assets} from '../../../assets/assets'
import { FadeLeft } from '../../../utility/animation'
import { motion } from 'framer-motion'
import Button from '../../../components/Button'

function Banner() {
  return (
    <section className="bg-secondary py-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-40 px-4">
        {/* Image */}
        <div className="flex justify-center md:justify-end">
          <motion.img
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.5 }}
            viewport={{ once: false }}
            src={assets.tech}
            alt="Technology"
            className="w-[300px] md:w-[400px] h-full object-cover rounded-xl shadow-lg drop-shadow-2xl"
          />
        </div>

        {/* Text Content */}
        <div className="text-center md:text-left space-y-6 max-w-xl mx-auto md:mx-0">
          <motion.h1
            variants={FadeLeft(0.5)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="text-4xl lg:text-6xl font-bold uppercase"
          >
            Build with Confidence
          </motion.h1>

          <motion.p
            variants={FadeLeft(0.7)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="text-lg leading-relaxed"
          >
            Empower your ideas with modern, scalable, and secure technology. Our
            platform provides all the tools you need to develop, deploy, and
            grow—faster and smarter.
          </motion.p>

          <motion.p
            variants={FadeLeft(0.9)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="text-lg"
          >
            From startups to enterprises, we're trusted by developers worldwide
            to bring their innovations to life.
          </motion.p>

          <motion.div
            variants={FadeLeft(1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="flex justify-center md:justify-start"
          >
            <Button className="primary-btn">Explore Events</Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Banner
