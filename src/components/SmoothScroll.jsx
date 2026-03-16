import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const SmoothScrollContext = createContext({ lenis: null })

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null)
  const reqIdRef = useRef()

  useEffect(() => {
    // Initialize Lenis
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false, // keep native feel on touch
      touchMultiplier: 2,
    })

    setLenis(lenisInstance)

    // Integrate with GSAP ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Sync RAF
    const raf = (time) => {
      lenisInstance.raf(time)
      reqIdRef.current = requestAnimationFrame(raf)
    }
    reqIdRef.current = requestAnimationFrame(raf)

    // Clean up
    return () => {
      cancelAnimationFrame(reqIdRef.current)
      lenisInstance.destroy()
      gsap.ticker.remove(lenisInstance.raf)
    }
  }, [])

  return (
    <SmoothScrollContext.Provider value={{ lenis }}>
      {children}
    </SmoothScrollContext.Provider>
  )
}

export function useSmoothScroll() {
  return useContext(SmoothScrollContext)
}
