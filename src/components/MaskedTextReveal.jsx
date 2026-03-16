import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePinnedContainer } from '../hooks/usePinnedContainer.js'

gsap.registerPlugin(ScrollTrigger)

export default function MaskedTextReveal({ 
  text, 
  as: Component = 'div', 
  className = '',
  wordClassName = '',
  delay = 0,
}) {
  const containerRef = useRef(null)
  
  // Hook works best when inside a PinnedSection context. Optional.
  const contextPinnedContainer = usePinnedContainer()
  const actualPinnedContainer = contextPinnedContainer?.current

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const words = container.querySelectorAll('.word-inner')
    if (!words.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(words, 
        { y: '100%' },
        {
          y: '0%',
          ease: 'power3.out',
          duration: 1.2,
          stagger: 0.2, // As requested user
          delay: delay,
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            pinnedContainer: actualPinnedContainer,
            toggleActions: 'play none none reverse',
          }
        }
      )
    }, container)

    return () => ctx.revert()
  }, [delay, actualPinnedContainer])

  // Split text into words but keep spaces, e.g. ["Hello", " ", "World"]
  const words = typeof text === 'string' ? text.split(/(\s+)/) : []

  return (
    <Component ref={containerRef} className={`${className} flex flex-wrap`}>
      {words.map((word, i) => {
        // If it's a space or line break, just render it inside a pre block element
        if (word.trim() === '') {
          return <span key={`space-${i}`} className="whitespace-pre">{word}</span>
        }
        return (
          <span key={`word-${i}`} className={`inline-flex overflow-hidden relative align-bottom ${wordClassName}`}>
            <span className="inline-block word-inner will-change-transform translate-y-full">
              {word}
            </span>
          </span>
        )
      })}
    </Component>
  )
}
