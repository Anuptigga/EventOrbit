import { useEffect, useRef } from 'react'
import { useTheme } from './ui/hook/useTheme'

export function SparkleBackground() {
  const canvasRef = useRef(null)
  const starsRef = useRef([])
  const animationRef = useRef(null)
  const colorRef = useRef('255, 255, 255') // default to white
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const numStars = 250

    function resizeCanvas() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function createStars() {
      starsRef.current = Array.from({ length: numStars }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2 + 0.5,
        alpha: Math.random(),
        dx: Math.random() * 0.05,
      }))
    }

    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const starColor = colorRef.current
      for (let star of starsRef.current) {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI)
        ctx.fillStyle = `rgba(${starColor}, ${star.alpha})`
        ctx.fill()
      }
    }

    function animateStars() {
      for (let star of starsRef.current) {
        star.alpha += star.dx
        if (star.alpha <= 0 || star.alpha >= 1) star.dx *= -1
      }
      drawStars()
      animationRef.current = requestAnimationFrame(animateStars)
    }

    resizeCanvas()
    createStars()
    animateStars()

    const handleResize = () => {
      resizeCanvas()
      createStars()
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  useEffect(() => {
    const resolved =
      theme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : theme

    colorRef.current = resolved === 'dark' ? '255, 255, 255' : '0, 0, 0'
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  )
}
