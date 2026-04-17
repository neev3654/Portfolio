import { createContext, useContext } from 'react'
import { useLocation } from 'react-router-dom'

const StandaloneRouteContext = createContext(false)

/**
 * Returns true when the component is rendered on an isolated route
 * (e.g. /certificates, /hackathons) and NOT inside the Home page ("/").
 * 
 * When true, GSAP ScrollTrigger-based entrance animations should be
 * replaced with immediate tweens, because the element is already at
 * the top of the viewport and ScrollTrigger start points will never fire.
 */
export function useIsStandaloneRoute() {
  return useContext(StandaloneRouteContext)
}

export { StandaloneRouteContext }
