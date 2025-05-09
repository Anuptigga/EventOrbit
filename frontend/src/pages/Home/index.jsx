import React from 'react'
import Hero from './components/Hero'
import Banner from './components/Banner'

function index() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Banner />
      <Banner />
      <Banner />
      <Banner />
    </main>
  )
}

export default index
