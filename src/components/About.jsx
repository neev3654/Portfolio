import { useEffect, useRef } from 'react'
import ChapterSection from './ChapterSection.jsx'
import MaskedTextReveal from './MaskedTextReveal.jsx'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePinnedContainer } from '../hooks/usePinnedContainer.js'
import { useIsStandaloneRoute } from '../hooks/useStandaloneRoute.js'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const containerRef = useRef(null)
  const bgLayer1Ref = useRef(null)
  const bgLayer2Ref = useRef(null)
  const contentRef = useRef(null)
  const cardsRef = useRef(null)
  const signatureRef = useRef(null)
  const isStandalone = useIsStandaloneRoute()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      if (!isStandalone) {
        // ── HOME: parallax + scroll-triggered entrances ──
        gsap.to(bgLayer1Ref.current, {
          y: -150,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })

        gsap.to(bgLayer2Ref.current, {
          y: -200,
          rotate: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })

        gsap.to(contentRef.current, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top center',
            end: 'bottom top',
            scrub: true,
          },
        })

        gsap.fromTo(signatureRef.current,
          { y: 100, opacity: 0, rotateX: -25, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            duration: 1.4,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: signatureRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        if (cardsRef.current) {
          const cards = gsap.utils.toArray(cardsRef.current.children)
          cards.forEach((card, i) => {
            gsap.fromTo(card,
              { y: 60 + i * 20, opacity: 0, scale: 0.9 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.9,
                delay: i * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: cardsRef.current,
                  start: 'top 80%',
                  toggleActions: 'play none none reverse',
                },
              }
            )

            gsap.to(card, {
              y: -(10 + i * 8),
              ease: 'none',
              scrollTrigger: {
                trigger: container,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            })
          })
        }
      } else {
        // ── STANDALONE: immediate fade-in tweens, no ScrollTrigger ──
        gsap.fromTo(signatureRef.current,
          { y: 40, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
        )

        if (cardsRef.current) {
          const cards = gsap.utils.toArray(cardsRef.current.children)
          cards.forEach((card, i) => {
            gsap.fromTo(card,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, delay: 0.2 + i * 0.1, ease: 'power3.out' }
            )
          })
        }
      }
    }, container)

    return () => ctx.revert()
  }, [isStandalone])

  return (
    <ChapterSection id="about" className="bg-bg text-text">
      <div ref={containerRef} className="mx-auto flex h-full max-w-7xl items-center w-full relative">

        {/* BACKGROUND LAYERS with parallax */}
        <div
          ref={bgLayer1Ref}
          className="absolute right-0 top-1/4 w-[800px] h-[800px] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none will-change-transform"
        />
        <div
          ref={bgLayer2Ref}
          className="absolute left-0 bottom-1/4 w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none will-change-transform"
        />

        <div className="w-full grid md:grid-cols-12 gap-12 md:gap-8 items-center relative z-10">

          {/* CONTENT */}
          <div ref={contentRef} className="md:col-span-12 lg:col-span-7 will-change-transform">
            <p className="mb-4 text-xs font-semibold tracking-widest uppercase text-muted">
              Chapter 01
            </p>
            <MaskedTextReveal
              as="h2"
              text="I engineer modern web experiences that perform as beautifully as they look."
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-tightest mb-8 text-text"
              mode="trigger"
              split="lines"
            />
            <div
              ref={cardsRef}
              className="grid grid-cols-2 gap-x-8 gap-y-12 mt-16 max-w-2xl"
            >
              {[
                { label: 'Frontend', desc: 'React, motion, UI systems' },
                { label: 'Backend', desc: 'Node, DB design, scaling' },
                { label: 'Quality', desc: 'Testing, observability, DX' },
                { label: 'Delivery', desc: 'Ship fast, iterate safely' }
              ].map(item => (
                <div key={item.label}>
                  <div className="text-sm font-semibold text-text mb-2">{item.label}</div>
                  <div className="text-[#86868b] leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SIGNATURE CARD */}
          <div className="md:col-span-12 lg:col-span-5 relative mt-12 lg:mt-0" style={{ perspective: '1000px' }}>
            <div
              ref={signatureRef}
              className="bg-card rounded-[32px] p-8 md:p-12 relative overflow-hidden will-change-transform border border-black/5"
              style={{ opacity: 0 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 pointer-events-none" />
              <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-6">Signature</p>
              <div className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-medium leading-[1.1] tracking-tight mb-6">
                <MaskedTextReveal as="div" text="Minimal surface." className="text-text" delay={0} mode="trigger" />
                <MaskedTextReveal as="div" text="Maximum intent." className="text-muted" delay={0.2} mode="trigger" />
              </div>
              <p className="text-[17px] leading-relaxed text-[#86868b]">
                Every interaction has a purpose. Motion is used to guide,
                emphasize, and reveal—not to distract.
              </p>
            </div>
          </div>

        </div>
      </div>
    </ChapterSection>
  )
}
