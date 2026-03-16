import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { useSmoothScroll } from '../components/SmoothScroll.jsx'

const ActiveSectionContext = createContext(null)

export function ActiveSectionProvider({ children }) {
  const [activeId, setActiveId] = useState('hero')
  const { lenis } = useSmoothScroll()

  const markActive = useCallback((id) => {
    setActiveId((prev) => (prev === id ? prev : id))
  }, [])

  const scrollToId = useCallback(
    (id) => {
      if (lenis) {
        // Use Lenis to scroll smoothly
        lenis.scrollTo(`#${id}`, { offset: 0, duration: 1.2 })
      } else {
        // Fallback if Lenis is not ready
        const el = document.getElementById(id)
        if (!el) return
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
    [lenis]
  )

  const value = useMemo(
    () => ({
      activeId,
      markActive,
      scrollToId,
    }),
    [activeId, markActive, scrollToId]
  )

  return createElement(ActiveSectionContext.Provider, { value }, children)
}

export function useActiveSection() {
  const ctx = useContext(ActiveSectionContext)
  if (!ctx) {
    throw new Error('useActiveSection must be used within ActiveSectionProvider')
  }
  return ctx
}
