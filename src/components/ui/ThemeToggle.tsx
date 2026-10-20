import { useState } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { content } from '../../data/content'

type Theme = 'light' | 'dark'

const themeColors: Record<Theme, string> = { dark: '#070B14', light: '#F6F7FA' }

function applyTheme(theme: Theme) {
  const root = document.documentElement
  if (theme === 'light') root.dataset.theme = 'light'
  else delete root.dataset.theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColors[theme])
  try {
    localStorage.setItem('theme', theme)
  } catch {
    // storage blocked: theme still applies for this visit
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'light' ? 'light' : 'dark',
  )
  const next: Theme = theme === 'light' ? 'dark' : 'light'

  return (
    <button
      type="button"
      onClick={() => {
        applyTheme(next)
        setTheme(next)
      }}
      aria-label={next === 'light' ? content.ui.themeToLight : content.ui.themeToDark}
      title={next === 'light' ? content.ui.themeToLight : content.ui.themeToDark}
      className="flex size-10 items-center justify-center rounded-full border border-border text-text transition-colors duration-200 hover:text-accent"
    >
      {theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
    </button>
  )
}
