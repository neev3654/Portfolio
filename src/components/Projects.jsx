import { useEffect, useRef } from 'react'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/projects.js'
import ChapterSection from './ChapterSection.jsx'

gsap.registerPlugin(ScrollTrigger)

function TechPill({ children }) {
  return (
    <span className="rounded-full bg-[#f5f5f7] px-3 py-1.5 text-[11px] font-semibold text-muted font-mono tracking-tight grayscale group-hover:grayscale-0 transition-all duration-300">
      {children}
    </span>
  )
}

function HorizontalGallery() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      // 1. Horizontal Scroll Timeline
      const totalWidth = track.scrollWidth - window.innerWidth
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${track.scrollWidth}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      })

      tl.to(track, {
        x: -totalWidth,
        ease: 'none',
      })

      // 2. Card Entrance Animations (Batch)
      const cards = gsap.utils.toArray('.project-card')
      cards.forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl, // Key for horizontal triggers
              start: 'left center+=200',
              toggleActions: 'play none none reverse',
            }
          }
        )

        // 3. Image Parallax inside the horizontal scroll
        const img = card.querySelector('.project-card-image')
        gsap.to(img, {
          x: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            containerAnimation: tl,
            start: 'left right',
            end: 'right left',
            scrub: true,
          }
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="h-screen w-full flex flex-col justify-center overflow-hidden bg-bg relative">
      <div className="absolute top-12 left-6 md:left-10 lg:left-16 z-20">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted">
          Chapter 03
        </p>
        <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight text-text">
          Selected Works
        </h3>
      </div>
      
      <div className="absolute top-12 right-6 md:right-10 lg:right-16 z-20 hidden text-xs font-semibold tracking-widest uppercase text-muted md:flex items-center gap-2">
        <span className="h-px w-8 bg-border"></span>
        Scroll to explore
      </div>

      <div ref={trackRef} className="flex flex-nowrap pl-6 md:pl-10 lg:pl-16 pr-[20vw] items-center h-[75vh]">
        {projects.map((p, idx) => (
          <div
            key={p.title}
            className="project-card group relative flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] mr-10 h-full flex flex-col justify-center will-change-transform"
          >
            <div className="project-card-image-container aspect-[16/10] mb-8 project-card-shadow">
              <img
                src={p.image}
                alt={`${p.title} screenshot`}
                loading={idx === 0 ? "eager" : "lazy"}
                className="project-card-image"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            <div className="project-card-details flex flex-col md:flex-row md:items-start justify-between gap-6 px-2">
              <div className="max-w-md">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-xs font-mono font-medium text-accent-blue bg-accent-blue/10 px-2 py-1 rounded-md">
                    0{idx + 1}
                  </span>
                  <h3 className="font-display text-3xl font-semibold tracking-tight text-text">
                    {p.title}
                  </h3>
                </div>
                <p className="text-base text-[#86868b] leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="flex flex-col items-start md:items-end gap-5">
                <div className="flex items-center gap-3">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-card hover:bg-[#e8e8ed] text-[#1d1d1f] transition-colors"
                  >
                    <FiGithub className="h-5 w-5" />
                  </a>
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-12 px-6 items-center justify-center rounded-full bg-[#1d1d1f] hover:bg-black text-white font-medium transition-colors"
                  >
                    View Project <FiExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <TechPill key={t}>{t}</TechPill>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  const containerRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      <ChapterSection id="projects" className="bg-bg text-text z-10 pb-0">
        <div ref={containerRef} className="mx-auto flex h-full max-w-7xl items-center w-full relative">
          <div className="absolute right-1/4 top-1/4 w-[500px] h-[500px] bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none" />

          <div ref={headerRef} className="w-full max-w-4xl pt-20 will-change-transform">
            <p className="mb-4 text-xs font-semibold tracking-widest uppercase text-muted">
              Chapter 03
            </p>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-medium leading-[1] tracking-tightest mb-6 text-text">
              Works that speak <br/> for themselves.
            </h2>
            <p className="max-w-2xl mt-8 text-xl text-[#86868b] leading-relaxed">
              Each build is treated like a launch: clean narrative, strong visuals,
              measurable performance. Scroll down to enter the gallery.
            </p>
          </div>
        </div>
      </ChapterSection>

      {/* HORIZONTAL GALLERY SECTION */}
      <section className="relative w-full bg-bg z-20">
        <HorizontalGallery />
      </section>
    </>
  )
}
