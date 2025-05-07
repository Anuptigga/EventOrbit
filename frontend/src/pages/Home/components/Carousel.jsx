import { useEffect, useState } from 'react'
import { assets } from '../../../assets/assets'

const Carousel = () => {
  const slides = [1, 2, 3, 4]
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleSlideChange = (nextSlide) => {
    document.getElementById(nextSlide).scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
      window.location.hash = `#${slides[currentSlide]}`
    }, 3000) // Changes every 3 seconds

    return () => clearInterval(interval) // Clean up interval
  }, [currentSlide])

  return (
    <div className="w-full max-w-screen-md mx-auto m-4">
      <div className="carousel w-full">
        {slides.map((slide, index) => (
          <div key={slide} id={slide} className="carousel-item relative w-full">
            <img
              src={assets[`c_img${slide}`]}
              className="w-full max-h-96 object-cover rounded-lg"
              alt={`Slide ${index + 1}`}
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <button
                className="btn btn-circle"
                onClick={() => {
                  handleSlideChange(
                    slides[(index - 1 + slides.length) % slides.length]
                  )
                }}
              >
                ❮
              </button>
              <button
                className="btn btn-circle"
                onClick={() =>
                  handleSlideChange(slides[(index + 1) % slides.length])
                }
              >
                ❯
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Carousel
