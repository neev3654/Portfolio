import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useActiveSection } from '../hooks/useActiveSection.js'
import HeroScene from './HeroScene.jsx'
import { useTextReveal } from '../hooks/useTextReveal.js'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const { scrollToId } = useActiveSection()
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  
  const headingRef = useTextReveal({ stagger: 0.04, delay: 0.2, start: 'top 85%', end: 'bottom 25%' })
  const subRef = useTextReveal({ stagger: 0.02, delay: 0.8, yOffset: 20, start: 'top 85%', end: 'bottom 25%' })

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Pin scene and zoom into text
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%', // 150% of viewport scrolling
          scrub: 1, // Smooth scrub
          pin: true,
        },
      })

      // Drive CSS variables for the Three.js scene and content scaling
      tl.to(contentRef.current, {
        opacity: 0,
        scale: 1.5, // Apple-style dramatic push-in
        filter: 'blur(10px)',
        '--scroll-zoom': 1, // Read by Three.js
        ease: 'power2.in',
      })
    }, sectionRef)

    // Set initial custom property
    if (contentRef.current) {
      contentRef.current.style.setProperty('--scroll-zoom', '0')
    }

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={sectionRef} className="scene-section bg-bg">
      <HeroScene scrollTargetRef={contentRef} />

      <div 
        ref={contentRef} 
        className="relative h-screen w-full flex flex-col items-center justify-center text-center px-4 will-change-transform"
        style={{ '--scroll-zoom': 0 }}
      >
        <p className="mb-6 text-sm md:text-base font-medium tracking-widest uppercase text-muted">
          <span className="reveal-target inline-block">Software Engineer</span>
        </p>
        
        <h1 
          ref={headingRef}
          className="font-display text-7xl sm:text-8xl md:text-[10rem] font-thin leading-[0.9] tracking-tightest text-text mb-8"
        >
          Neev Patel.
        </h1>
        
        <h2 
          ref={subRef}
          className="max-w-3xl text-xl md:text-3xl font-medium text-text/80 leading-snug"
        >
          I design and build <span className="text-gradient">cinematic digital experiences</span> that bridge the gap between engineering and aesthetics.
        </h2>

        <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center reveal-target">
          <button
            onClick={() => scrollToId('projects')}
            className="group flex flex-col items-center gap-2 cursor-pointer transition-transform hover:scale-105 active:scale-95"
            aria-label="Scroll to projects"
          >
            <span className="text-xs font-medium uppercase tracking-widest text-muted group-hover:text-text transition-colors">
              Explore
            </span>
            <span className="h-10 w-px bg-border group-hover:bg-text transition-colors" />
          </button>
        </div>
      </div>
    </section>
  )
}
