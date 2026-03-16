import { useEffect, useRef } from 'react'
import ChapterSection from './ChapterSection.jsx'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const containerRef = useRef(null)
  const bgLayer1Ref = useRef(null)
  const bgLayer2Ref = useRef(null)
  const contentRef = useRef(null)
  const cardsRef = useRef(null)
  const signatureRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      // Parallax effect for backgrounds
      gsap.to(bgLayer1Ref.current, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      })

      gsap.to(bgLayer2Ref.current, {
        y: -150,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      })

      // Content parallax (slight delay)
      gsap.to(contentRef.current, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top center',
          end: 'bottom top',
          scrub: true,
        }
      })

      // Signature card entry
      gsap.from(signatureRef.current, {
        y: 60,
        opacity: 0,
        rotateX: -15,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: signatureRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        }
      })

      // Grid items entry
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
          }
        })
      }
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <ChapterSection id="about" className="bg-bg text-text z-10">
      <div ref={containerRef} className="mx-auto flex h-full max-w-7xl items-center w-full relative">
        
        {/* BACKGROUND LAYER */}
        <div 
          ref={bgLayer1Ref}
          className="absolute right-0 top-1/4 w-[800px] h-[800px] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none will-change-transform"
        />
        <div 
          ref={bgLayer2Ref}
          className="absolute left-0 bottom-1/4 w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none will-change-transform"
        />

        <div className="w-full grid md:grid-cols-12 gap-12 md:gap-8 items-center relative z-10">
          
          {/* CONTENT LAYER */}
          <div ref={contentRef} className="md:col-span-12 lg:col-span-7 will-change-transform">
            <p className="mb-4 text-xs font-semibold tracking-widest uppercase text-muted">
              Chapter 01
            </p>
            
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-tightest mb-8 text-text">
              I engineer modern web experiences that perform as beautifully as they look.
            </h2>
            
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

          {/* FOREGROUND LAYER */}
          <div className="md:col-span-12 lg:col-span-5 relative mt-12 lg:mt-0 perspective-1000">
            <div 
              ref={signatureRef}
              className="bg-card rounded-[32px] p-8 md:p-12 relative overflow-hidden will-change-composite border border-black/5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 pointer-events-none" />
              
              <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-6">
                Signature
              </p>
              
              <h3 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-medium leading-[1.1] tracking-tight text-text mb-6">
                Minimal surface. <br/>
                <span className="text-muted">Maximum intent.</span>
              </h3>
              
              <p className="text-[17px] leading-relaxed text-[#86868b]">
                Every interaction has a purpose. Motion is used to guide,
                emphasize, and reveal—not to distract. Performance remains
                non-negotiable.
              </p>
            </div>
          </div>

        </div>
      </div>
    </ChapterSection>
  )
}

