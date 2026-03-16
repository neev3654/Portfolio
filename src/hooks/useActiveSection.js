import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

const ActiveSectionContext = createContext(null)

export function ActiveSectionProvider({ children }) {
  const [activeId, setActiveId] = useState('hero')

  const markActive = useCallback((id) => {
    setActiveId((prev) => (prev === id ? prev : id))
  }, [])

  const scrollToId = useCallback((id) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const value = useMemo(
    () => ({
      activeId,
      markActive,
      scrollToId,
    }),
    [activeId, markActive, scrollToId],
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

