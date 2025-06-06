import { useContext } from 'react'
import { ThemeProviderContext } from '../theme-provider'

const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (!context) throw new Error('useTheme must be used within a ThemeProvider')
  return context
}

export { useTheme }
