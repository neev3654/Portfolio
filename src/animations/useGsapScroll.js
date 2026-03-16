import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useGsapScroll(setup) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      setup(gsap, ScrollTrigger)
    })
    return () => ctx.revert()
  }, [setup])
}

