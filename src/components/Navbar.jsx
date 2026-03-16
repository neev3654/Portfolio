import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { useActiveSection } from '../hooks/useActiveSection.js'
import { easeOutQuart } from '../utils/animations.js'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'leetcode', label: 'LeetCode' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const prefersReducedMotion = useReducedMotion()
  const { activeId, scrollToId } = useActiveSection()
  const [open, setOpen] = useState(false)

  const items = useMemo(() => navItems, [])

  const onNav = (id) => {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <header className="sticky top-0 z-40">
      <div className="pointer-events-none absolute inset-0 bg-bg/65 backdrop-blur-xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-border/70" />

      <div className="pointer-events-auto mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <button
          onClick={() => onNav('hero')}
          className="group inline-flex items-center gap-2 text-left"
        >
          <span className="h-2 w-2 rounded-full bg-accent/80 shadow-glow" />
          <span className="font-display text-sm font-semibold tracking-wide text-text">
            Neev Patel
          </span>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {items.map((it) => {
            const active = activeId === it.id
            return (
              <button
                key={it.id}
                onClick={() => onNav(it.id)}
                className="relative text-sm font-medium text-muted transition-colors hover:text-text"
              >
                <span className={active ? 'text-text' : undefined}>
                  {it.label}
                </span>
                <span
                  className={[
                    'absolute -bottom-2 left-0 h-px w-full origin-left bg-accent/80 transition-transform duration-300',
                    active ? 'scale-x-100' : 'scale-x-0',
                  ].join(' ')}
                />
              </button>
            )
          })}
        </nav>

        <button
          className="inline-flex items-center justify-center rounded-full border border-border bg-card/20 p-2 text-text/90 backdrop-blur md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: -10 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: easeOutQuart }}
            className="pointer-events-auto border-t border-border bg-bg/85 backdrop-blur-xl md:hidden"
          >
            <div className="mx-auto max-w-6xl px-5 py-4">
              <div className="grid gap-2">
                {items.map((it) => {
                  const active = activeId === it.id
                  return (
                    <button
                      key={it.id}
                      onClick={() => onNav(it.id)}
                      className={[
                        'flex items-center justify-between rounded-xl border px-4 py-3 text-sm',
                        active
                          ? 'border-accent/40 bg-card/40 text-text shadow-glow'
                          : 'border-border bg-card/20 text-muted',
                      ].join(' ')}
                    >
                      <span className="font-medium">{it.label}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

