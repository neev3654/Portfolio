import { motion, useReducedMotion } from 'framer-motion'
import ChapterSection from './ChapterSection.jsx'
import DepthSection from './DepthSection.jsx'
import { skills } from '../data/skills.js'
import { easeOutQuart, fadeUp, stagger } from '../utils/animations.js'

export default function Skills() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <DepthSection id="skills" index={2}>
      {({ progress, layers }) => {
        const headingY = prefersReducedMotion
          ? undefined
          : { y: layers.fgY }
        const gridY = prefersReducedMotion
          ? undefined
          : { y: layers.midY }

        return (
          <div className="mx-auto flex h-full max-w-6xl items-center px-5 md:px-8">
            <div className="w-full">
        <div className="max-w-3xl">
          <motion.h2
            style={headingY}
            className="font-display text-4xl font-semibold leading-tight tracking-tighter2 text-text md:text-5xl"
          >
            Powered by Modern Technologies
          </motion.h2>
          <p className="mt-5 text-base leading-relaxed text-text/90 md:text-lg">
            A lean stack built for velocity—frontends that feel cinematic and
            backends that stay stable under real traffic.
          </p>
        </div>

        <motion.div
          variants={stagger(0.08, 0.05)}
          initial={prefersReducedMotion ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          style={gridY}
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
        >
          {skills.map(({ name, Icon }, idx) => (
            <motion.div
              key={name}
              variants={fadeUp}
              transition={{ duration: 0.55, ease: easeOutQuart, delay: idx * 0.01 }}
              whileHover={prefersReducedMotion ? undefined : { y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/25 p-5 backdrop-blur"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent" />
              </div>
              <div className="relative flex items-center gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-bg/30 text-text/90 transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-text">
                    {name}
                  </div>
                  <div className="mt-1 text-xs text-muted">
                    production-ready
                  </div>
                </div>
              </div>

              <motion.div
                aria-hidden="true"
                initial={false}
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { y: [0, -6, 0], opacity: [0.35, 0.6, 0.35] }
                }
                transition={{
                  duration: 6 + (idx % 3),
                  repeat: Infinity,
                  ease: easeOutQuart,
                }}
                className="pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-accent/10 blur-2xl"
              />
            </motion.div>
          ))}
        </motion.div>
            </div>
          </div>
        )
      }}
    </DepthSection>
  )
}

