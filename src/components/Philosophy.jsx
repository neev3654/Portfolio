import { motion, useReducedMotion } from 'framer-motion'
import Section from './Section.jsx'
import { easeOutQuart, fade, fadeUp, stagger } from '../utils/animations.js'

const lines = ['Clean Code.', 'Scalable Systems.', 'Premium Motion.']

export default function Philosophy() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <Section id="philosophy" className="relative py-28 md:py-40">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0.35, scale: 1 }}
          animate={
            prefersReducedMotion
              ? { opacity: 0.25 }
              : { x: [0, 80, 0], opacity: [0.25, 0.4, 0.25] }
          }
          transition={{ duration: 14, repeat: Infinity, ease: easeOutQuart }}
          className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          variants={stagger(0.12, 0.05)}
          initial={prefersReducedMotion ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.p
            variants={fade}
            transition={{ duration: 0.6, ease: easeOutQuart }}
            className="text-xs font-semibold tracking-wide text-muted"
          >
            Development Philosophy
          </motion.p>

          <div className="mt-8">
            {lines.map((t) => (
              <motion.h2
                key={t}
                variants={fadeUp}
                transition={{ duration: 0.75, ease: easeOutQuart }}
                className="font-display text-5xl font-semibold leading-[0.98] tracking-tighter2 text-text sm:text-6xl md:text-7xl"
              >
                {t}
              </motion.h2>
            ))}
          </div>

          <motion.p
            variants={fade}
            transition={{ duration: 0.7, ease: easeOutQuart }}
            className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
          >
            I optimize for clarity and longevity. Systems should scale in
            complexity without collapsing—interfaces should feel effortless, not
            busy.
          </motion.p>
        </motion.div>
      </div>
    </Section>
  )
}

