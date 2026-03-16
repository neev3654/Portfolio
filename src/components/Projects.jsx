import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/projects.js'
import ChapterSection from './ChapterSection.jsx'
import { useParallaxLayers } from '../hooks/useParallaxLayers.js'
import { useTextReveal } from '../hooks/useTextReveal.js'
import { fadeUp, stagger, easeOutQuart } from '../utils/animations.js'

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

  useLayoutEffect(() => {
    const el = trackRef.current
    const section = sectionRef.current
    if (!el || !section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ctx = gsap.context(() => {
      // Pin the section and move the track horizontally based on vertical scroll
      gsap.to(el, {
        x: () => -(el.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${el.scrollWidth}`,
          scrub: 1, // smooth scrub
          pin: true,
          invalidateOnRefresh: true,
        },
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

      <div ref={trackRef} className="flex flex-nowrap pl-6 md:pl-10 lg:pl-16 pr-[50vw] items-center h-[75vh]">
        {projects.map((p, idx) => (
          <div
            key={p.title}
            className="group relative flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] mr-10 h-full flex flex-col justify-center"
          >
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[24px] bg-card mb-8 shadow-sm transition-all duration-700 hover:shadow-2xl">
              <img
                src={p.image}
                alt={`${p.title} screenshot`}
                loading={idx === 0 ? "eager" : "lazy"}
                className="h-full w-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 px-2">
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
                <div className="flex flex-wrap gap-2">
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
  const prefersReducedMotion = useReducedMotion()
  const headingRef = useTextReveal({ stagger: 0.03, triggerStart: 'top 85%' })

  return (
    <>
      <ChapterSection id="projects" className="bg-bg text-text z-10 pb-0">
        {({ progress }) => {
          const { bgY, contentY } = useParallaxLayers(progress)

          return (
            <div className="mx-auto flex h-full max-w-7xl items-center px-6 md:px-10 lg:px-16 w-full relative">
              <motion.div 
                style={prefersReducedMotion ? undefined : { y: bgY }}
                className="absolute right-1/4 top-1/4 w-[500px] h-[500px] bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none"
              />

              <motion.div 
                style={prefersReducedMotion ? undefined : { y: contentY }}
                className="w-full max-w-4xl pt-20"
              >
                <p className="mb-4 text-xs font-semibold tracking-widest uppercase text-muted">
                  Chapter 03
                </p>
                <h2
                  ref={headingRef}
                  className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-medium leading-[1] tracking-tightest mb-6 text-text"
                >
                  Works that speak <br/> for themselves.
                </h2>
                <p className="max-w-2xl mt-8 text-xl text-[#86868b] leading-relaxed">
                  Each build is treated like a launch: clean narrative, strong visuals,
                  measurable performance. Scroll down to enter the gallery.
                </p>
              </motion.div>
            </div>
          )
        }}
      </ChapterSection>

      {/* HORIZONTAL GALLERY SECTION */}
      <section className="relative w-full bg-bg z-20">
        <HorizontalGallery />
      </section>
    </>
  )
}
