import { motion, useReducedMotion } from 'framer-motion'
import DepthSection from './DepthSection.jsx'
import { easeOutQuart, fadeUp, stagger } from '../utils/animations.js'

export default function Education() {
  const prefersReducedMotion = useReducedMotion()

  const items = [
    {
      title: 'B.Sc. in Computer Science',
      subtitle: 'University of Technology · Class of 2024',
      bullets: ['Strong foundations in algorithms, systems, and HCI.'],
    },
    {
      title: 'Certifications',
      subtitle: '',
      bullets: [
        'Meta Front-End Developer Certificate',
        'AWS Cloud Practitioner',
        'MongoDB Associate Developer',
      ],
    },
  ]

  return (
    <DepthSection id="education" index={3}>
      {({ layers }) => (
        <div className="mx-auto flex h-full max-w-6xl items-center px-5 md:px-8">
          <div className="w-full">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-wide text-muted">
            Education
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tighter2 text-text md:text-5xl">
            Intentional learning, applied directly to products.
          </h2>
        </div>

        <motion.div
          variants={stagger(0.1, 0.05)}
          initial={prefersReducedMotion ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          style={prefersReducedMotion ? undefined : { y: layers.midY }}
          className="mt-10 grid gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, ease: easeOutQuart }}
            className="rounded-[28px] border border-border bg-card/25 p-6 md:p-7"
          >
            <div className="text-xs font-semibold tracking-wide text-muted">
              Degree
            </div>
            <div className="mt-3 font-display text-2xl font-semibold tracking-tight text-text">
              {items[0].title}
            </div>
            <div className="mt-1 text-xs text-muted">{items[0].subtitle}</div>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {items[0].bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-[7px] h-[3px] w-3 rounded-full bg-accent/70" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, ease: easeOutQuart, delay: 0.05 }}
            className="rounded-[28px] border border-border bg-card/20 p-6 md:p-7"
          >
            <div className="text-xs font-semibold tracking-wide text-muted">
              Certifications
            </div>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {items[1].bullets.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/80 shadow-glow" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
          </div>
        </div>
      )}
    </DepthSection>
  )
}

