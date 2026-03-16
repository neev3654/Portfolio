import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useTextReveal({
  stagger = 0.015,
  yOffset = 40,
  delay = 0,
  scrub = false,
  triggerStart = 'top 85%',
} = {}) {
  const ref = useRef(null)

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return

    // Split text into words and then characters manually, wrapped in spans
    // Note: We only split direct text nodes to avoid destroying child elements
    const childNodes = Array.from(el.childNodes)
    const originalContent = el.innerHTML
    let hasSplit = false

    // Simple text splitter if element only contains text
    if (childNodes.length === 1 && childNodes[0].nodeType === Node.TEXT_NODE) {
      const text = childNodes[0].textContent
      const words = text.split(' ')
      el.innerHTML = ''
      
      words.forEach((word, index) => {
        const wordSpan = document.createElement('span')
        wordSpan.style.display = 'inline-block'
        wordSpan.style.whiteSpace = 'nowrap'
        
        const chars = word.split('')
        chars.forEach(char => {
          const span = document.createElement('span')
          span.textContent = char
          span.style.opacity = '0'
          span.style.display = 'inline-block'
          span.className = 'reveal-char'
          wordSpan.appendChild(span)
        })
        
        el.appendChild(wordSpan)
        
        if (index < words.length - 1) {
          el.appendChild(document.createTextNode(' '))
        }
      })
      hasSplit = true
    } else {
      // If it contains nested elements, we just animate those as the targets
      const elements = el.querySelectorAll('.reveal-target')
      elements.forEach(el => {
        el.style.opacity = '0'
      })
    }

    const targets = hasSplit ? el.querySelectorAll('.reveal-char') : el.querySelectorAll('.reveal-target, .reveal-char')
    
    // Create animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          y: yOffset,
          opacity: 0,
          rotateX: -40, // slight flip effect typical in Apple displays
          transformOrigin: '50% 100%',
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: stagger,
          duration: 0.8,
          ease: 'power3.out',
          delay: delay,
          scrollTrigger: {
            trigger: el,
            start: triggerStart,
            scrub: scrub,
          },
        }
      )
    }, el)

    return () => {
      ctx.revert()
      // Optional: restore original content on unmount
      if (hasSplit) {
         // keep it split for layout reasons
      }
    }
  }, [stagger, yOffset, delay, scrub, triggerStart])

  return ref
}
