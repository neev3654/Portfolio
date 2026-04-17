import { useEffect, useRef, useState, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiMenu, FiX, FiArrowLeft } from 'react-icons/fi'
import { useActiveSection } from '../hooks/useActiveSection.js'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'hackathons', label: 'Hackathons' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const { activeId, scrollToId } = useActiveSection()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  
  const navigate = useNavigate()
  const location = useLocation()
  
  const items = useMemo(() => navItems, [])

  /**
   * Flush ALL GSAP state before React unmounts components.
   * ScrollTrigger.pin() and SplitType inject wrapper <div>s that React
   * doesn't know about. If React tries to remove child nodes that have
   * been reparented by GSAP, it throws "removeChild" NotFoundError and
   * the entire render tree crashes → blank screen.
   */
  const cleanupBeforeNavigate = () => {
    // Kill all active tweens so nothing is mid-animation
    gsap.killTweensOf('*')
    // Revert all ScrollTrigger instances (removes pin spacers, wrappers, etc.)
    ScrollTrigger.getAll().forEach(st => st.kill(true))
    // Clear any cached scroll data
    ScrollTrigger.clearScrollMemory('manual')
  }

  const onNav = (id) => {
    setOpen(false)
    cleanupBeforeNavigate()
    navigate(`/${id}`)
  }

  const goHome = () => {
    setOpen(false)
    cleanupBeforeNavigate()
    navigate('/')
  }

  useEffect(() => {
    if (menuRef.current) {
      if (open) {
        gsap.to(menuRef.current, {
          height: 'auto',
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out',
          display: 'block'
        })
      } else {
        gsap.to(menuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power3.in',
          display: 'none'
        })
      }
    }
  }, [open])

  // If we are on an isolated route (e.g. /about), strictly highlight that item.
  // Otherwise, fallback to the scroll-based active section from the Home page.
  const routeSegment = location.pathname.split('/')[1];
  const actualActiveId = (routeSegment && navItems.some(item => item.id === routeSegment)) 
    ? routeSegment 
    : activeId;

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="absolute inset-0 bg-white/70 backdrop-blur-xl border-b border-black/[0.04]" />

      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 lg:px-16">
        <button
          onClick={() => {
            if (location.pathname !== '/') {
              goHome()
            } else {
              onNav('hero')
            }
          }}
          className="group inline-flex items-center gap-3 text-left"
        >
          {location.pathname !== '/' && (
            <FiArrowLeft className="text-[#1d1d1f] w-4 h-4 transition-transform group-hover:-translate-x-1" />
          )}
          <span className="font-display text-sm md:text-base font-semibold tracking-tight text-[#1d1d1f] transition-opacity group-hover:opacity-70">
            Neev Patel.
          </span>
        </button>

        <nav className="hidden items-center gap-6 lg:flex">
          {items.map((it) => {
            const active = actualActiveId === it.id
            return (
              <button
                key={it.id}
                onClick={() => onNav(it.id)}
                className="relative text-[12px] font-medium tracking-wide text-[#86868b] transition-colors hover:text-[#1d1d1f] uppercase"
              >
                <span className={active ? 'text-[#1d1d1f]' : undefined}>
                  {it.label}
                </span>
                <span
                  className={[
                    'absolute -bottom-[20px] left-0 h-[2px] w-full origin-left bg-[#1d1d1f] transition-transform duration-300',
                    active ? 'scale-x-100' : 'scale-x-0',
                  ].join(' ')}
                />
              </button>
            )
          })}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-card/50 text-[#1d1d1f] lg:hidden backdrop-blur-sm"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="border-b border-black/[0.04] bg-white/95 backdrop-blur-xl lg:hidden overflow-hidden hidden opacity-0 h-0"
      >
        <div className="mx-auto px-6 py-6 border-t border-black/[0.04]">
          <div className="grid gap-2">
            {items.map((it) => {
              const active = actualActiveId === it.id
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
      </div>
    </header>
  )
}
