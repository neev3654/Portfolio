import { useEffect, useRef } from 'react'
import ChapterSection from './ChapterSection.jsx'
import MaskedTextReveal from './MaskedTextReveal.jsx'
import { skillCategories } from '../data/skills.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Skills() {
  const containerRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      // Bloom parallax
      gsap.to('.skills-bloom', {
        y: -150,
        scale: 1.2,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Header stagger entrance
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          y: 40,
          opacity: 0,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      // Cards — dramatic staggered entrance with 3D depth
      if (gridRef.current) {
        const cards = gsap.utils.toArray(gridRef.current.children)

        cards.forEach((card, i) => {
          // Staggered 3D entrance
          gsap.fromTo(card,
            {
              y: 100,
              opacity: 0,
              rotateY: i === 0 ? 15 : i === 2 ? -15 : 0,
              rotateX: 10,
              scale: 0.85,
              transformOrigin: '50% 100%',
            },
            {
              y: 0,
              opacity: 1,
              rotateY: 0,
              rotateX: 0,
              scale: 1,
              duration: 1.2,
              delay: i * 0.15,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: gridRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          )

          // Per-card floating parallax at different speeds
          gsap.to(card, {
            y: -(20 + i * 12),
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
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <ChapterSection id="skills" className="bg-bg text-text">
      <div ref={containerRef} className="mx-auto flex h-full max-w-7xl items-center w-full relative pt-24 md:pt-12">

        {/* BACKGROUND BLOOM */}
        <div className="skills-bloom absolute left-1/4 top-1/4 w-[600px] h-[600px] bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none will-change-transform" />

        <div className="w-full flex flex-col pt-12 md:pt-20 relative z-10" style={{ perspective: '1000px' }}>

          {/* HEADER */}
          <div ref={headerRef} className="max-w-4xl px-4 md:px-0">
            <p className="mb-4 text-xs font-semibold tracking-widest uppercase text-muted">
              Chapter 02
            </p>
            <MaskedTextReveal
              as="h2"
              text="Tools of the trade, mastered for production."
              className="font-display text-2xl sm:text-4xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-tightest mb-4 text-text"
              mode="trigger"
              split="lines"
            />
            <p className="max-w-2xl mt-4 text-base md:text-xl text-[#86868b] leading-relaxed">
              A lean stack built for velocity—frontends that feel cinematic and
              backends that stay stable under real traffic.
            </p>
          </div>

          {/* SKILLS GRID */}
          <div
            ref={gridRef}
            className="mt-8 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl pb-12 md:pb-0 px-4 md:px-0"
            style={{ perspective: '800px' }}
          >
            {skillCategories.map((category) => (
              <div
                key={category.id}
                className="group relative overflow-hidden rounded-2xl bg-white/5 p-8 md:p-10 backdrop-blur-sm border border-white/10 transition-all duration-500 will-change-transform hover:bg-white/[0.08] hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent-blue/5"
              >
                <span className="absolute top-8 right-8 text-xs font-mono text-muted tracking-widest opacity-40">
                  {category.id}
                </span>

                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white transition-all duration-700 group-hover:bg-accent-blue/20 group-hover:text-accent-blue group-hover:rotate-[360deg] group-hover:scale-110">
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

                  <div className="h-px w-full bg-white/10 mb-10 transition-all duration-500 group-hover:bg-accent-blue/30" />

                  <ul className="space-y-4">
                    {category.skills.map((skill, i) => (
                      <li
                        key={skill}
                        className="flex items-center gap-3 text-[15px] text-[#86868b] group-hover:text-text/90 transition-all duration-300"
                        style={{ transitionDelay: `${i * 50}ms` }}
                      >
                        <span className="block h-1.5 w-1.5 rounded-full bg-[#86868b] opacity-50 group-hover:bg-accent-blue group-hover:opacity-100 transition-all duration-300" />
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
