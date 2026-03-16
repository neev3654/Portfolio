import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useActiveSection } from '../hooks/useActiveSection.js'
import HeroScene from './HeroScene.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const { scrollToId, markActive } = useActiveSection()
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const taglineRef = useRef(null)
  const headlineRef = useRef(null)
  const subtitleRef = useRef(null)
  const exploreRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // 1. Pin + cinematic push-in zoom
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%',
          scrub: 1.5,
          pin: true,
          pinSpacing: true,
          onEnter: () => markActive('hero'),
          onEnterBack: () => markActive('hero'),
        },
      })

      // Softer zoom-in exit — content stays partially visible until next section covers it
      tl.to(content, {
        opacity: 0.3,
        scale: 1.2,
        filter: 'blur(10px)',
        y: -60,
        ease: 'power2.in',
      })

      // 2. Staggered load-in sequence
      const loadTimeline = gsap.timeline({ delay: 0.3 })

      loadTimeline
        .fromTo(taglineRef.current,
          { y: 30, opacity: 0, filter: 'blur(4px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }
        )
        .fromTo(headlineRef.current,
          { y: 60, opacity: 0, scale: 0.9, filter: 'blur(8px)' },
          { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out' },
          '-=0.4'
        )
        .fromTo(subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(exploreRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.4'
        )

      // 3. Explore button float
      gsap.to(exploreRef.current, {
        y: -8,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2.5,
      })

      // 4. Subtle parallax on content during scroll
      gsap.to(taglineRef.current, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(subtitleRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, section)

    if (content) {
      content.style.setProperty('--scroll-zoom', '0')
    }

    return () => ctx.revert()
  }, [markActive, scrollToId])

  return (
    <section id="hero" ref={sectionRef} className="chapter-container bg-bg">
      <HeroScene scrollTargetRef={contentRef} />

      <div
        ref={contentRef}
        className="relative h-full w-full flex flex-col items-center justify-center text-center px-6 md:px-10 lg:px-16 will-change-composite"
        style={{ '--scroll-zoom': 0 }}
      >
        <div>
          <p ref={taglineRef} className="mb-6 text-sm md:text-base font-medium tracking-widest uppercase text-muted" style={{ opacity: 0 }}>
            Software Engineer
          </p>
          <h1 ref={headlineRef} className="font-display text-4xl sm:text-6xl md:text-[10rem] font-thin leading-[0.9] tracking-tightest text-text mb-8" style={{ opacity: 0 }}>
            Neev Patel.
          </h1>
          <h2 ref={subtitleRef} className="max-w-3xl text-xl md:text-3xl font-medium text-text/80 leading-snug" style={{ opacity: 0 }}>
            I design and build <span className="text-gradient">cinematic digital experiences</span> that bridge the gap between engineering and aesthetics.
          </h2>
        </div>

        <div ref={exploreRef} className="absolute bottom-16 left-0 right-0 flex flex-col items-center" style={{ opacity: 0 }}>
          <button
            onClick={() => scrollToId('about')}
            className="group flex flex-col items-center gap-2 cursor-pointer transition-transform hover:scale-105 active:scale-95"
            aria-label="Scroll to about"
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
