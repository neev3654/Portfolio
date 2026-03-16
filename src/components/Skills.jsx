import { useEffect, useRef } from 'react'
import ChapterSection from './ChapterSection.jsx'
import { skillCategories } from '../data/skills.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Skills() {
  const containerRef = useRef(null)
  const gridRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      // Header Reveal
      gsap.from(headerRef.current.children, {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        }
      })

      // Skills Grid Items
      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          y: 40,
          opacity: 0,
          scale: 0.95,
          stagger: 0.05,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          }
        })
      }

      // Parallax Bloom
      gsap.to('.skills-bloom', {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      })
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <ChapterSection id="skills" className="bg-bg text-text">
      <div ref={containerRef} className="mx-auto flex h-full max-w-7xl items-center w-full relative">
        
        {/* BACKGROUND BLOOM */}
        <div className="skills-bloom absolute left-1/4 top-1/4 w-[600px] h-[600px] bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none will-change-transform" />

        <div className="w-full flex flex-col pt-20 relative z-10">
          
          {/* CONTENT HEADER */}
          <div ref={headerRef} className="max-w-4xl">
            <p className="mb-4 text-xs font-semibold tracking-widest uppercase text-muted">
              Chapter 02
            </p>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-tightest mb-6 text-text">
              Tools of the trade, mastered for production.
            </h2>
            <p className="max-w-2xl mt-8 text-xl text-[#86868b] leading-relaxed">
              A lean stack built for velocity—frontends that feel cinematic and
              backends that stay stable under real traffic.
            </p>
          </div>

          {/* SKILLS GRID */}
          <div
            ref={gridRef}
            className="mt-24 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl"
          >
            {skillCategories.map((category) => (
              <div
                key={category.id}
                className="group relative overflow-hidden rounded-2xl bg-white/5 p-8 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 will-change-transform"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-blue/20 text-accent-blue">
                    <category.Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-widest uppercase text-muted">
                      {category.category}
                    </p>
                    <h3 className="text-lg font-semibold text-text">
                      {category.title}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block rounded-full bg-white/10 px-3 py-1 text-sm text-text/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </ChapterSection>
  )
}
