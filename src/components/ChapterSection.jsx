import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useActiveSection } from '../hooks/useActiveSection.js'
import { PinnedContainerContext } from '../hooks/usePinnedContainer.js'

gsap.registerPlugin(ScrollTrigger)

/**
 * ChapterSection
 * Cinematic section wrapper with dramatic scroll-driven transitions.
 * NO pinning — content flows naturally but transitions are jaw-dropping.
 */
export default function ChapterSection({ id, children, className = '' }) {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const overlayRef = useRef(null)
  const { markActive } = useActiveSection()

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    const overlay = overlayRef.current
    if (!section || !content) return

    const ctx = gsap.context(() => {
      // 1. Navbar tracking
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => markActive(id),
        onEnterBack: () => markActive(id),
      })

      // 2. DRAMATIC ENTRANCE: section scales up + fades in + slides up as it enters
      gsap.fromTo(content,
        {
          y: 60,
          opacity: 0,
          scale: 0.96,
          rotateX: 3,
          transformOrigin: '50% 100%',
          filter: 'blur(4px)',
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          filter: 'blur(0px)',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 100%',
            end: 'top 40%',
            scrub: true,
          },
        }
      )

      // 3. NO EXIT ANIMATION — content stays visible until next section covers it

      // 4. WIPE OVERLAY: a subtle gradient overlay sweeps across on entrance
      if (overlay) {
        gsap.fromTo(overlay,
          { scaleX: 1 },
          {
            scaleX: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'top 30%',
              scrub: true,
            },
          }
        )
      }
    }, section)

    return () => ctx.revert()
  }, [id, markActive])

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative w-full min-h-screen bg-bg overflow-hidden ${className}`}
      style={{ perspective: '1200px' }}
    >
      {/* Wipe overlay for dramatic entrance */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-30 pointer-events-none origin-right"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, var(--color-bg, #f5f5f7) 20%)',
        }}
      />

      <PinnedContainerContext.Provider value={sectionRef}>
        <div
          ref={contentRef}
          className="w-full min-h-screen flex items-center justify-center will-change-transform px-6 md:px-10 lg:px-16"
        >
          {children}
        </div>
      </PinnedContainerContext.Provider>
    </section>
  )
}
