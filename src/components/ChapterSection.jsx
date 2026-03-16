import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useActiveSection } from '../hooks/useActiveSection.js'
import { PinnedContainerContext } from '../hooks/usePinnedContainer.js'

gsap.registerPlugin(ScrollTrigger)

/**
 * ChapterSection
 * - Pinned chapter container using GSAP ScrollTrigger.
 * - Cinematic transitions: scale, blur, and opacity.
 */
export default function ChapterSection({ id, children, className = '' }) {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const { markActive } = useActiveSection()

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current

    if (!section || !content) return

    const ctx = gsap.context(() => {
      // 1. Entrance animation: NEXT chapter slides upward with parallax
      gsap.fromTo(content, 
        { 
          y: 60, // reduced for tighter feel
          opacity: 0,
          scale: 1.01,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top top',
            scrub: 1, // Momentum scrubbing
            onEnter: () => markActive(id),
            onEnterBack: () => markActive(id),
          }
        }
      )

      // 2. Main Pinned Timeline: Fade out previous chapter, Scale + Blur
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1, // Momentum scrubbing
          pinSpacing: true,
          invalidateOnRefresh: true,
          onEnter: () => markActive(id),
          onEnterBack: () => markActive(id),
        }
      })

      tl.to(content, {
        opacity: 0,
        scale: 0.98,
        filter: 'blur(12px)',
        ease: 'power1.inOut',
      })
    }, section)

    return () => ctx.revert()
  }, [id, markActive])

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`chapter-container flex items-center justify-center bg-bg ${className}`}
    >
      <PinnedContainerContext.Provider value={sectionRef}>
        <div 
          ref={contentRef} 
          className="w-full h-full flex items-center justify-center will-change-composite px-6 md:px-10 lg:px-16"
        >
          {children}
        </div>
      </PinnedContainerContext.Provider>
    </section>
  )
}

