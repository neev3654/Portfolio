import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { usePinnedContainer } from '../hooks/usePinnedContainer.js'

gsap.registerPlugin(ScrollTrigger)

/**
 * MaskedTextReveal
 * Cinematic text reveal using SplitType.
 * 
 * mode='scrub' (default): animation is scrubbed to scroll position
 * mode='trigger': animation plays on scroll trigger (enter viewport)
 * split='lines' | 'words' (default lines)
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

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Use SplitType for precise text splitting
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
      if (mode === 'scrub') {
        // Scroll-scrubbed reveal
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
          {
            yPercent: 110,
            opacity: 0,
          },
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
        // Trigger-based reveal (original behavior)
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
              pinnedContainer: actualPinnedContainer,
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, container)

    return () => {
      ctx.revert()
      splitInstance.revert()
    }
  }, [delay, actualPinnedContainer, mode, split, scrubStart, scrubEnd])

  return (
    <Component
      ref={containerRef}
      className={className}
    >
      {text}
    </Component>
  )
}
