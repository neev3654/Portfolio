import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { usePinnedContainer } from '../hooks/usePinnedContainer.js'
import { useIsStandaloneRoute } from '../hooks/useStandaloneRoute.js'

gsap.registerPlugin(ScrollTrigger)

/**
 * MaskedTextReveal
 * Cinematic text reveal using SplitType.
 * On standalone routes, plays immediately without ScrollTrigger.
 */
export default function MaskedTextReveal({ 
  text, 
  as: Component = 'div', 
  className = '',
  delay = 0,
  mode = 'scrub',
  split = 'lines',
  scrubStart = 'top 88%',
  scrubEnd = 'top 45%',
}) {
  const containerRef = useRef(null)
  const contextPinnedContainer = usePinnedContainer()
  const actualPinnedContainer = contextPinnedContainer?.current
  const isStandalone = useIsStandaloneRoute()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const splitInstance = new SplitType(container, {
      types: split === 'words' ? 'words' : 'lines',
      tagName: 'span',
    })

    const targets = split === 'words' ? splitInstance.words : splitInstance.lines

    if (!targets || targets.length === 0) {
      splitInstance.revert()
      return
    }

    // Wrap each target in an overflow-hidden mask
    targets.forEach((el) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display = split === 'words' ? 'inline-flex' : 'block'
      if (split === 'words') {
        wrapper.style.marginRight = '0.3em'
      }
      el.parentNode.insertBefore(wrapper, el)
      wrapper.appendChild(el)
    })

    const ctx = gsap.context(() => {
      if (mode === 'scrub' && !isStandalone) {
        // ── HOME: scroll-scrubbed reveal (for Hero) ──
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: scrubStart,
            end: scrubEnd,
            scrub: true,
            pinnedContainer: actualPinnedContainer,
          },
        })

        tl.fromTo(
          targets,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            stagger: split === 'words' ? 0.04 : 0.12,
            ease: 'power3.out',
            duration: 1,
            delay,
          }
        )
      } else {
        // ── ENTRANCE TRIGGER (Works universally for standalone & Home) ──
        gsap.fromTo(
          targets,
          { yPercent: 110 },
          {
            yPercent: 0,
            ease: 'power3.out',
            duration: 1.2,
            stagger: split === 'words' ? 0.05 : 0.2,
            delay,
            scrollTrigger: {
              trigger: container,
              start: 'top 90%',
              pinnedContainer: isStandalone ? undefined : actualPinnedContainer,
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, container)

    return () => {
      ctx.revert()
      // Unwrap custom injected wrappers so React doesn't crash on unmount
      targets.forEach((el) => {
        const wrapper = el.parentNode
        const parent = wrapper?.parentNode
        if (wrapper && parent && wrapper.tagName.toLowerCase() === 'div' && wrapper.style.overflow === 'hidden') {
          parent.insertBefore(el, wrapper)
          parent.removeChild(wrapper)
        }
      })
      splitInstance.revert()
    }
  }, [delay, actualPinnedContainer, mode, split, scrubStart, scrubEnd, text, isStandalone])

  return (
    <Component
      ref={containerRef}
      className={className}
    >
      {text}
    </Component>
  )
}
