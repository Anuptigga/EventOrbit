import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from './ui/hook/useTheme'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [isToggling, setIsToggling] = useState(false)

  const resolvedTheme =
    theme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : theme

  const toggleTheme = () => {
    if (isToggling) return // prevent multiple rapid clicks
    setIsToggling(true)

    setTimeout(() => {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
      setIsToggling(false)
    }, 300) // delay of 300ms
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      disabled={isToggling}
      aria-busy={isToggling}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
