import { useEffect, useRef } from 'react'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/projects.js'
import ChapterSection from './ChapterSection.jsx'
import MaskedTextReveal from './MaskedTextReveal.jsx'
import { usePinnedContainer } from '../hooks/usePinnedContainer.js'
import { useIsStandaloneRoute } from '../hooks/useStandaloneRoute.js'

gsap.registerPlugin(ScrollTrigger)

function TechPill({ children }) {
  return (
    <span className="rounded-full bg-card px-3 py-1.5 text-[11px] font-semibold text-muted font-mono tracking-tight grayscale group-hover:grayscale-0 transition-all duration-300">
      {children}
    </span>
  )
}

function HorizontalGallery() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const counterRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth - window.innerWidth
      const cardCount = projects.length
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${track.scrollWidth}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (counterRef.current) {
              const current = Math.min(cardCount, Math.ceil(self.progress * cardCount) || 1)
              counterRef.current.textContent = `0${current} / 0${cardCount}`
            }
          },
        },
      })

      tl.to(track, {
        x: -totalWidth,
        ease: 'none',
      })

      // Card animations
      const cards = gsap.utils.toArray('.project-card')
      cards.forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: 'left center+=200',
              toggleActions: 'play none none reverse',
            },
          }
        )

        const img = card.querySelector('.project-card-image')
        if (img) {
          gsap.fromTo(img,
            { scale: 1.1, filter: 'blur(6px)' },
            {
              scale: 1,
              filter: 'blur(0px)',
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                containerAnimation: tl,
                start: 'left center+=200',
                toggleActions: 'play none none reverse',
              },
            }
          )

          gsap.to(img, {
            x: 30,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          })
        }
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="h-screen w-full flex flex-col overflow-hidden bg-bg relative">
      {/* Gallery header - properly positioned at top */}
      <div className="flex items-center justify-between px-6 md:px-10 lg:px-16 pt-10 pb-6 flex-shrink-0">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-muted">
            Chapter 03
          </p>
          <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight text-text">
            Selected Works
          </h3>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <span ref={counterRef} className="text-xs font-mono font-medium text-accent-blue tracking-widest">01 / 0{projects.length}</span>
          <span className="text-xs font-semibold tracking-widest uppercase text-muted flex items-center gap-2">
            <span className="h-px w-8 bg-border" />
            Scroll to explore
          </span>
        </div>
      </div>

      {/* Horizontal track */}
      <div ref={trackRef} className="flex flex-nowrap pl-6 md:pl-10 lg:pl-16 pr-[20vw] items-center flex-1">
        {projects.map((p, idx) => (
          <div
            key={p.title}
            className="project-card group relative flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] mr-10 h-full flex flex-col justify-center will-change-transform"
          >
            <div className="project-card-image-container aspect-[16/10] mb-8">
              <img
                src={p.image}
                alt={`${p.title} screenshot`}
                loading={idx === 0 ? "eager" : "lazy"}
                className="project-card-image"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-border/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            <div className="project-card-details flex flex-col gap-4 px-2">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono font-medium text-accent-blue bg-accent-blue/10 px-2 py-1 rounded-md">
                  0{idx + 1}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-text">
                  {p.title}
                </h3>
              </div>
              <p className="text-base text-muted leading-relaxed max-w-md">
                {p.description}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-card hover:bg-border/30 hover:scale-105 text-text transition-all duration-300"
                >
                  <FiGithub className="h-4 w-4" />
                </a>
                <a
                  href={p.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 px-5 items-center justify-center rounded-full bg-text hover:opacity-80 hover:scale-[1.03] text-bg text-sm font-medium transition-all duration-300"
                >
                  View Project <FiExternalLink className="ml-2 h-3.5 w-3.5" />
                </a>
                {p.tech.map((t) => (
                  <TechPill key={t}>{t}</TechPill>
                ))}
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
  const pinnedContainerRef = usePinnedContainer()
  const isStandalone = useIsStandaloneRoute()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pinnedContainer = pinnedContainerRef?.current
      
      if (headerRef.current) {
        if (!isStandalone) {
          gsap.from(headerRef.current.children, {
            y: 50,
            opacity: 0,
            stagger: 0.12,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 70%',
              pinnedContainer,
            },
          })
        } else {
          gsap.fromTo(headerRef.current.children,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
          )
        }
      }
    })

    return () => ctx.revert()
  }, [pinnedContainerRef, isStandalone])

  return (
    <>
      <ChapterSection id="projects" className="bg-bg text-text z-10 pb-0">
        <div ref={containerRef} className="mx-auto flex h-full max-w-7xl items-center w-full relative">
          <div className="absolute right-1/4 top-1/4 w-[500px] h-[500px] bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none" />

          <div ref={headerRef} className="w-full max-w-4xl pt-20 will-change-transform">
            <p className="mb-4 text-xs font-semibold tracking-widest uppercase text-muted">
              Chapter 03
            </p>
            <div className="font-display text-3xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-medium leading-[1] tracking-tightest mb-6 text-text">
              <MaskedTextReveal as="div" text="Works that speak" delay={0} mode="trigger" split="lines" />
              <MaskedTextReveal as="div" text="for themselves." delay={0.2} mode="trigger" split="lines" />
            </div>
            <p className="max-w-2xl mt-8 text-xl text-muted leading-relaxed">
              Each build is treated like a launch: clean narrative, strong visuals,
              measurable performance. Scroll down to enter the gallery.
            </p>
          </div>
        </div>
      </ChapterSection>

      {/* HORIZONTAL GALLERY */}
      <section className="relative w-full bg-bg z-20">
        <HorizontalGallery />
      </section>
    </>
  )
}
