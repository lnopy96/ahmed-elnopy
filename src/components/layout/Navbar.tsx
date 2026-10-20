import { useEffect, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { content } from '../../data/content'
import { useActiveSection } from '../../hooks/useActiveSection'
import { Button } from '../ui/Button'
import { ThemeToggle } from '../ui/ThemeToggle'

const { identity, nav, ui } = content
const sectionIds = nav.map((item) => item.id)

export function Navbar() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const close = () => window.innerWidth >= 1024 && setOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', close)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', close)
    }
  }, [open])

  const linkClass = (id: string) =>
    `transition-colors duration-200 hover:text-text ${active === id ? 'text-accent' : 'text-muted'}`

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-surface/70 backdrop-blur-md">
      <nav aria-label={ui.primaryNav} className="container-page flex h-16 items-center justify-between gap-6">
        <a
          href="#top"
          className="flex size-9 items-center justify-center rounded-md border border-accent/40 bg-accent-soft font-heading text-sm font-semibold text-accent"
        >
          <span aria-hidden="true">{identity.initials}</span>
          <span className="sr-only">
            {identity.name} — {ui.homeLink}
          </span>
        </a>

        <ul className="hidden items-center gap-6 text-sm lg:flex">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? 'location' : undefined}
                className={linkClass(item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button href="#contact" className="hidden sm:inline-flex">
            {ui.hireMe}
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? ui.closeMenu : ui.openMenu}
            className="flex size-10 items-center justify-center rounded-full border border-border text-text lg:hidden"
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-bg lg:hidden">
          <ul className="container-page flex flex-col py-4">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? 'location' : undefined}
                  className={`block border-b border-border py-4 font-heading text-xl ${linkClass(item.id)}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="container-page pb-8">
            <Button href="#contact" onClick={() => setOpen(false)} className="w-full">
              {ui.hireMe}
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
