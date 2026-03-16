import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import DepthSection from './DepthSection.jsx'
import { projects } from '../data/projects.js'
import { easeOutQuart, fadeUp, stagger } from '../utils/animations.js'

function TechPill({ children }) {
  return (
    <span className="rounded-full border border-border bg-bg/30 px-3 py-1 text-[11px] font-medium text-muted">
      {children}
    </span>
  )
}

function HorizontalShowcase() {
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [maxX, setMaxX] = useState(0)

  useLayoutEffect(() => {
    const el = trackRef.current
    const section = sectionRef.current
    if (!el || !section) return

    const compute = () => {
      const trackWidth = el.scrollWidth
      const viewportWidth = section.clientWidth
      setMaxX(Math.max(0, trackWidth - viewportWidth))
    }

    compute()
    const ro = new ResizeObserver(() => compute())
    ro.observe(el)
    ro.observe(section)
    return () => ro.disconnect()
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxX])

  return (
    <div
      ref={sectionRef}
      className="relative mt-16 h-[120svh] overflow-hidden rounded-[28px] border border-border bg-card/15"
    >
      <div className="sticky top-20 mx-auto h-[calc(100svh-7rem)] max-w-6xl px-5 md:px-8">
        <div className="pt-10 md:pt-14">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold tracking-wide text-muted">
                Horizontal Chapter
              </p>
              <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Momentum, translated.
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted md:text-base">
                As you scroll down, the highlights glide sideways—an Apple-like
                interaction that turns vertical intent into horizontal reveal.
              </p>
            </div>
            <div className="hidden text-xs text-muted md:block">
              Scroll ↓ to move →
            </div>
          </div>
        </div>

        <motion.div
          style={prefersReducedMotion ? undefined : { x }}
          className="mt-10 will-change-transform"
        >
          <div
            ref={trackRef}
            className="flex w-max gap-5 pr-10 md:gap-7"
          >
            {[
              {
                title: 'Performance first',
                body: '60fps motion with transform + opacity. Lazy-loaded media. Lean UI.',
              },
              {
                title: 'Systemic UI',
                body: 'Composable components, consistent spacing, and a motion language that scales.',
              },
              {
                title: 'Backend discipline',
                body: 'Clear data models, observability hooks, and deploy-ready architecture.',
              },
              {
                title: 'Shipping mindset',
                body: 'Iterate safely with good DX, strong defaults, and fast feedback loops.',
              },
              {
                title: 'Cinematic polish',
                body: 'Parallax, chapter reveals, and subtle glow—premium, never noisy.',
              },
            ].map((c) => (
              <div
                key={c.title}
                className="w-[280px] shrink-0 rounded-3xl border border-border bg-bg/30 p-6 md:w-[340px]"
              >
                <div className="text-xs font-semibold tracking-wide text-muted">
                  Highlight
                </div>
                <div className="mt-3 font-display text-xl font-semibold tracking-tight text-text">
                  {c.title}
                </div>
                <div className="mt-3 text-sm leading-relaxed text-muted">
                  {c.body}
                </div>
                <div className="mt-6 h-px w-10 bg-border" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function Projects() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <DepthSection id="projects" index={4}>
      {({ layers }) => (
        <div className="mx-auto flex h-full max-w-6xl items-center px-5 md:px-8">
          <div className="w-full">
        <div className="max-w-3xl">
          <motion.h2
            style={prefersReducedMotion ? undefined : { y: layers.fgY }}
            className="font-display text-4xl font-semibold leading-tight tracking-tighter2 text-text md:text-5xl"
          >
            Projects, Presented Like Products
          </motion.h2>
          <p className="mt-5 text-base leading-relaxed text-text/90 md:text-lg">
            Each build is treated like a launch: clean narrative, strong visuals,
            measurable performance.
          </p>
        </div>

        <motion.div
          variants={stagger(0.12, 0.08)}
          initial={prefersReducedMotion ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          style={prefersReducedMotion ? undefined : { y: layers.midY }}
          className="mt-14 grid gap-6 md:grid-cols-2"
        >
          {projects.map((p) => (
            <motion.article
              key={p.title}
              variants={fadeUp}
              transition={{ duration: 0.7, ease: easeOutQuart }}
              className="group relative overflow-hidden rounded-[28px] border border-border bg-card/20"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-bg/20">
                <img
                  src={p.image}
                  alt={`${p.title} screenshot`}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  referrerPolicy="no-referrer"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg/70" />
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 shadow-glow" />
                </div>
              </div>

              <div className="p-6 md:p-7">
                <div className="flex items-start justify-between gap-5">
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-2xl font-semibold tracking-tight text-text">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {p.description}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-border bg-bg/20 p-2 text-muted transition-colors hover:border-accent/40 hover:text-accent hover:shadow-glow"
                      aria-label="GitHub"
                    >
                      <FiGithub />
                    </a>
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-border bg-bg/20 p-2 text-muted transition-colors hover:border-accent/40 hover:text-accent hover:shadow-glow"
                      aria-label="Live demo"
                    >
                      <FiExternalLink />
                    </a>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <TechPill key={t}>{t}</TechPill>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <HorizontalShowcase />
          </div>
        </div>
      )}
    </DepthSection>
  )
}

