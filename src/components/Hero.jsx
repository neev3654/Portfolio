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

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const ctx = gsap.context(() => {
      // Pin scene and zoom into text
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          scrub: 1,
          pin: true,
          pinSpacing: true,
          onEnter: () => markActive('hero'),
          onEnterBack: () => markActive('hero'),
        },
      })

      // Dramatic Push-in Animation
      tl.to(content, {
        opacity: 0,
        scale: 1.5,
        filter: 'blur(10px)',
        '--scroll-zoom': 1,
        ease: 'power2.in',
      })

      // Smooth revealing of the subtext and button on load
      gsap.from('.hero-reveal', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.5,
      })
    }, section)

    // Set initial custom property for Three.js
    if (content) {
      content.style.setProperty('--scroll-zoom', '0')
    }

    return () => ctx.revert()
  }, [markActive])

  return (
    <section id="hero" ref={sectionRef} className="chapter-container bg-bg">
      <HeroScene scrollTargetRef={contentRef} />

      <div 
        ref={contentRef} 
        className="relative h-full w-full flex flex-col items-center justify-center text-center px-6 md:px-10 lg:px-16 will-change-composite"
        style={{ '--scroll-zoom': 0 }}
      >
        <div className="hero-reveal">
          <p className="mb-6 text-sm md:text-base font-medium tracking-widest uppercase text-muted">
            Software Engineer
          </p>
          
          <h1 className="font-display text-7xl sm:text-8xl md:text-[10rem] font-thin leading-[0.9] tracking-tightest text-text mb-8">
            Neev Patel.
          </h1>
          
          <h2 className="max-w-3xl text-xl md:text-3xl font-medium text-text/80 leading-snug">
            I design and build <span className="text-gradient">cinematic digital experiences</span> that bridge the gap between engineering and aesthetics.
          </h2>
        </div>

        <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center hero-reveal">
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
