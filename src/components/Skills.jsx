import { useEffect, useRef } from 'react'
import ChapterSection from './ChapterSection.jsx'
import MaskedTextReveal from './MaskedTextReveal.jsx'
import { skillCategories } from '../data/skills.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePinnedContainer } from '../hooks/usePinnedContainer.js'

gsap.registerPlugin(ScrollTrigger)

export default function Skills() {
  const containerRef = useRef(null)
  const gridRef = useRef(null)
  const headerRef = useRef(null)
  const pinnedContainerRef = usePinnedContainer()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      const pinnedContainer = pinnedContainerRef?.current

      // Header Reveal
      gsap.from(headerRef.current.children, {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 70%', // More reliable trigger point
          pinnedContainer: pinnedContainer,
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
            start: 'top 75%',
            pinnedContainer: pinnedContainer,
          }
        })
      }

      // Parallax Bloom
      gsap.to('.skills-bloom', {
        y: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
          pinnedContainer: pinnedContainer,
        }
      })
    }, container)

    return () => ctx.revert()
  }, [pinnedContainerRef])

  return (
    <ChapterSection id="skills" className="bg-bg text-text">
      <div ref={containerRef} className="mx-auto flex h-full max-w-7xl items-center w-full relative pt-12">
        
        {/* BACKGROUND BLOOM */}
        <div className="skills-bloom absolute left-1/4 top-1/4 w-[600px] h-[600px] bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none will-change-transform" />

        <div className="w-full flex flex-col pt-20 relative z-10">
          
          {/* CONTENT HEADER */}
          <div ref={headerRef} className="max-w-4xl">
            <p className="mb-4 text-xs font-semibold tracking-widest uppercase text-muted">
              Chapter 02
            </p>
            <MaskedTextReveal
              as="h2"
              text="Tools of the trade, mastered for production."
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-tightest mb-6 text-text"
            />
            <p className="max-w-2xl mt-8 text-xl text-[#86868b] leading-relaxed">
              A lean stack built for velocity—frontends that feel cinematic and
              backends that stay stable under real traffic.
            </p>
          </div>

          {/* SKILLS GRID */}
          <div
            ref={gridRef}
            className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl"
          >
            {skillCategories.map((category) => (
              <div
                key={category.id}
                className="group relative overflow-hidden rounded-2xl bg-white/5 p-10 backdrop-blur-sm border border-white/10 hover:bg-white/12 transition-all duration-500 will-change-transform"
              >
                {/* CATEGORY NUMBER */}
                <span className="absolute top-8 right-8 text-xs font-mono text-muted tracking-widest opacity-40">
                  {category.id}
                </span>

                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white transition-colors group-hover:bg-accent-blue/20 group-hover:text-accent-blue">
                      <category.Icon className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="mb-10">
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted mb-2">
                      {category.category}
                    </p>
                    <h3 className="text-3xl font-bold text-text">
                      {category.title}
                    </h3>
                  </div>

                  <div className="h-px w-full bg-white/10 mb-10" />

                  <ul className="space-y-4">
                    {category.skills.map((skill) => (
                      <li
                        key={skill}
                        className="flex items-center gap-3 text-[15px] text-[#86868b] group-hover:text-text/90 transition-colors"
                      >
                        <span className="block h-1 w-1 rounded-full bg-[#86868b] opacity-50" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </ChapterSection>
  )
}
