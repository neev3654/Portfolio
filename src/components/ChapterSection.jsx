import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useActiveSection } from '../hooks/useActiveSection.js'
import { PinnedContainerContext } from '../hooks/usePinnedContainer.js'
import { useIsStandaloneRoute } from '../hooks/useStandaloneRoute.js'

gsap.registerPlugin(ScrollTrigger)

/**
 * ChapterSection
 * Cinematic section wrapper.
 * On Home ("/") → scrub-based entrance.
 * On standalone route → immediate fade-in.
 */
export default function ChapterSection({ id, children, className = '' }) {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const overlayRef = useRef(null)
  const { markActive } = useActiveSection()
  const isStandalone = useIsStandaloneRoute()

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    const overlay = overlayRef.current
    if (!section || !content) return

    const ctx = gsap.context(() => {
      // Navbar tracking
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => markActive(id),
        onEnterBack: () => markActive(id),
      })

      if (!isStandalone) {
        // ── HOME PAGE: scrub-based cinematic entrance ──
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
      } else {
        // ── STANDALONE ROUTE: immediate fade-in ──
        gsap.set(content, { opacity: 1, y: 0, scale: 1, rotateX: 0, filter: 'blur(0px)' })
        gsap.fromTo(content,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.05 }
        )

        if (overlay) {
          gsap.set(overlay, { scaleX: 0 })
        }
      }
    }, section)

    return () => ctx.revert()
  }, [id, markActive, isStandalone])

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative w-full min-h-screen bg-bg overflow-hidden ${className}`}
      style={{ perspective: '1200px' }}
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 z-30 pointer-events-none origin-right"
        style={{
          background: isStandalone
            ? 'none'
            : `linear-gradient(90deg, transparent 0%, rgb(var(--color-bg)) 20%)`,
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
