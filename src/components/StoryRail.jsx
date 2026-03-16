import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'
import { useActiveSection } from '../hooks/useActiveSection.js'
import { easeOutQuart, fadeUp, stagger } from '../utils/animations.js'
import { skills } from '../data/skills.js'
import { projects } from '../data/projects.js'

const chapters = ['about', 'skills', 'philosophy', 'projects', 'achievements']

export default function StoryRail() {
  const prefersReducedMotion = useReducedMotion()
  const { markActive } = useActiveSection()

  const outerRef = useRef(null)
  const trackRef = useRef(null)
  const [maxX, setMaxX] = useState(0)

  useLayoutEffect(() => {
    const outer = outerRef.current
    const track = trackRef.current
    if (!outer || !track) return

    const compute = () => {
      const totalWidth = track.scrollWidth
      const viewportWidth = outer.clientWidth
      setMaxX(Math.max(0, totalWidth - viewportWidth))
    }

    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(outer)
    ro.observe(track)
    return () => ro.disconnect()
  }, [])

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxX])

  // Map vertical scroll progress to active chapter for nav highlight
  scrollYProgress.on('change', (v) => {
    const index = Math.min(
      chapters.length - 1,
      Math.max(0, Math.floor(v * chapters.length)),
    )
    const id = chapters[index]
    markActive(id)
  })

  return (
    <section
      id="story"
      ref={outerRef}
      className="relative mt-10 h-[520svh] bg-bg"
    >
      <div className="pointer-events-none absolute inset-0 bg-subtle-grid bg-grid opacity-[0.04]" />

      <div className="sticky top-16 flex h-[calc(100svh-4rem)] items-center">
        <motion.div
          style={prefersReducedMotion ? undefined : { x }}
          className="will-change-transform"
        >
          <div
            ref={trackRef}
            className="flex gap-8 px-5 md:gap-10 md:px-8"
          >
            {/* About */}
            <motion.div
              id="about"
              variants={stagger(0.1, 0.05)}
              initial={prefersReducedMotion ? 'show' : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
              className="flex min-w-[min(100vw,72rem)] flex-col justify-center"
            >
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6, ease: easeOutQuart }}
                className="text-xs font-semibold tracking-wide text-muted"
              >
                Chapter 01 · About
              </motion.p>
              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.8, ease: easeOutQuart }}
                className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tighter2 text-text sm:text-5xl md:text-6xl"
              >
                Engineering Modern Web Experiences
              </motion.h2>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.85, ease: easeOutQuart }}
                className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg"
              >
                I treat interfaces like product launches: composed, cinematic,
                and backed by robust systems that hold up in production.
              </motion.p>
            </motion.div>

            {/* Skills */}
            <motion.div
              id="skills"
              variants={stagger(0.08, 0.02)}
              initial={prefersReducedMotion ? 'show' : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
              className="flex min-w-[min(100vw,72rem)] flex-col justify-center"
            >
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6, ease: easeOutQuart }}
                className="text-xs font-semibold tracking-wide text-muted"
              >
                Chapter 02 · Stack
              </motion.p>
              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.8, ease: easeOutQuart }}
                className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tighter2 text-text sm:text-5xl md:text-6xl"
              >
                Powered by Modern Technologies
              </motion.h2>
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.9, ease: easeOutQuart }}
                className="mt-8 grid max-w-xl grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5"
              >
                {skills.slice(0, 8).map(({ name, Icon }) => (
                  <div
                    key={name}
                    className="group rounded-2xl border border-border bg-card/25 p-3 text-center text-xs text-muted backdrop-blur"
                  >
                    <div className="mx-auto mb-2 grid h-9 w-9 place-items-center rounded-xl border border-border bg-bg/30 text-text group-hover:border-accent/40 group-hover:text-accent">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>{name}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Philosophy */}
            <motion.div
              id="philosophy"
              variants={stagger(0.1, 0.04)}
              initial={prefersReducedMotion ? 'show' : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
              className="flex min-w-[min(100vw,72rem)] flex-col items-center justify-center text-center"
            >
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6, ease: easeOutQuart }}
                className="text-xs font-semibold tracking-wide text-muted"
              >
                Chapter 03 · Philosophy
              </motion.p>
              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.8, ease: easeOutQuart }}
                className="mt-5 font-display text-4xl font-semibold leading-[0.98] tracking-tighter2 text-text sm:text-5xl md:text-6xl"
              >
                Clean Code.
                <span className="block">Scalable Systems.</span>
                <span className="block text-muted">Premium Motion.</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.9, ease: easeOutQuart }}
                className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg"
              >
                I design for the long run: readable codebases, stable APIs, and
                motion that feels like part of the product, not decoration.
              </motion.p>
            </motion.div>

            {/* Projects */}
            <motion.div
              id="projects"
              variants={stagger(0.08, 0.03)}
              initial={prefersReducedMotion ? 'show' : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
              className="flex min-w-[min(100vw,80rem)] flex-col justify-center"
            >
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6, ease: easeOutQuart }}
                className="text-xs font-semibold tracking-wide text-muted"
              >
                Chapter 04 · Launches
              </motion.p>
              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.8, ease: easeOutQuart }}
                className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tighter2 text-text sm:text-5xl md:text-6xl"
              >
                Projects, Presented Like Products
              </motion.h2>
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.9, ease: easeOutQuart }}
                className="mt-7 grid gap-4 md:grid-cols-2"
              >
                {projects.slice(0, 2).map((p) => (
                  <div
                    key={p.title}
                    className="overflow-hidden rounded-3xl border border-border bg-card/30"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover opacity-90 transition-transform duration-700 ease-out hover:scale-[1.04]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg/80" />
                    </div>
                    <div className="p-5">
                      <div className="text-sm font-semibold text-text">
                        {p.title}
                      </div>
                      <div className="mt-2 line-clamp-2 text-xs text-muted">
                        {p.description}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              id="achievements"
              variants={stagger(0.08, 0.03)}
              initial={prefersReducedMotion ? 'show' : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
              className="flex min-w-[min(100vw,72rem)] flex-col justify-center"
            >
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6, ease: easeOutQuart }}
                className="text-xs font-semibold tracking-wide text-muted"
              >
                Chapter 05 · LeetCode & Achievements
              </motion.p>
              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.8, ease: easeOutQuart }}
                className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tighter2 text-text sm:text-5xl md:text-6xl"
              >
                Proof, in Numbers
              </motion.h2>
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.9, ease: easeOutQuart }}
                className="mt-7 grid max-w-xl gap-4 sm:grid-cols-3"
              >
                {[
                  { label: 'Problems solved', value: '650+' },
                  { label: 'Contest rating', value: '1850' },
                  { label: 'Badges', value: '14' },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-3xl border border-border bg-bg/20 p-5"
                  >
                    <div className="text-xs font-semibold tracking-wide text-muted">
                      {s.label}
                    </div>
                    <div className="mt-3 font-display text-3xl font-semibold tracking-tighter2 text-text">
                      {s.value}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

