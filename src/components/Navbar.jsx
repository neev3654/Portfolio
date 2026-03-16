import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { useActiveSection } from '../hooks/useActiveSection.js'
import { easeOutQuart } from '../utils/animations.js'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
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
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="absolute inset-0 bg-white/70 backdrop-blur-xl border-b border-black/[0.04]" />

      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 lg:px-16">
        <button
          onClick={() => onNav('hero')}
          className="group inline-flex items-center gap-3 text-left"
        >
          <span className="font-display text-base font-semibold tracking-tight text-[#1d1d1f] transition-opacity group-hover:opacity-70">
            Neev Patel.
          </span>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {items.map((it) => {
            const active = activeId === it.id
            return (
              <button
                key={it.id}
                onClick={() => onNav(it.id)}
                className="relative text-[13px] font-medium tracking-wide text-[#86868b] transition-colors hover:text-[#1d1d1f] uppercase"
              >
                <span className={active ? 'text-[#1d1d1f]' : undefined}>
                  {it.label}
                </span>
                <span
                  className={[
                    'absolute -bottom-[22px] left-0 h-[2px] w-full origin-left bg-[#1d1d1f] transition-transform duration-300',
                    active ? 'scale-x-100' : 'scale-x-0',
                  ].join(' ')}
                />
              </button>
            )
          })}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-card/50 text-[#1d1d1f] md:hidden backdrop-blur-sm"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: easeOutQuart }}
            className="border-b border-black/[0.04] bg-white/95 backdrop-blur-xl md:hidden overflow-hidden"
          >
            <div className="mx-auto px-6 py-6 border-t border-black/[0.04]">
              <div className="grid gap-2">
                {items.map((it) => {
                  const active = activeId === it.id
                  return (
                    <button
                      key={it.id}
                      onClick={() => onNav(it.id)}
                      className={[
                        'flex items-center justify-between rounded-2xl px-5 py-4 text-sm font-medium transition-colors',
                        active
                          ? 'bg-[#f5f5f7] text-[#1d1d1f]'
                          : 'bg-transparent text-[#86868b] hover:bg-[#f5f5f7]/50',
                      ].join(' ')}
                    >
                      <span>{it.label}</span>
                      {active && <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />}
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
