import { motion, useReducedMotion, useTransform } from 'framer-motion'
import DepthSection from './DepthSection.jsx'
import { easeOutQuart } from '../utils/animations.js'

export default function About() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <DepthSection id="about" index={1}>
      {({ progress, layers }) => {
        const headingY = useTransform(progress, [0, 1], [0, -40])
        const contentOpacity = useTransform(progress, [0, 0.3, 0.8], [1, 1, 0])

        return (
          <div className="mx-auto flex h-full max-w-6xl items-center px-5 md:px-8">
            <div className="grid w-full gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6">
            <motion.h2
              style={prefersReducedMotion ? undefined : { y: headingY }}
              className="font-display text-4xl font-semibold leading-tight tracking-tighter2 text-text md:text-5xl"
            >
              Engineering Modern Web Experiences
            </motion.h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-text/90 md:text-lg">
              I design and build end‑to‑end products—from pixel-perfect interfaces
              to resilient APIs. My work blends performance, accessibility, and a
              premium motion language that feels intentional.
            </p>

            <motion.div
              style={prefersReducedMotion ? undefined : { opacity: contentOpacity }}
              className="mt-10 grid gap-3 sm:grid-cols-2"
            >
              {[
                { k: 'Frontend', v: 'React, motion, UI systems' },
                { k: 'Backend', v: 'Node, DB design, scaling' },
                { k: 'Quality', v: 'Testing, observability, DX' },
                { k: 'Delivery', v: 'Ship fast, iterate safely' },
              ].map((item) => (
                <div
                  key={item.k}
                  className="rounded-2xl border border-border bg-card/40 p-5"
                >
                  <div className="text-xs font-semibold tracking-wide text-text">
                    {item.k}
                  </div>
                  <div className="mt-2 text-sm text-muted">{item.v}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="md:col-span-6">
            <motion.div
              style={prefersReducedMotion ? undefined : { y: layers.midY }}
              transition={{ duration: 0.2, ease: easeOutQuart }}
              className="relative overflow-hidden rounded-[28px] border border-border bg-card/20 p-8 md:p-10"
            >
              <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-70" />
              <motion.div
                aria-hidden="true"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { scale: [1, 1.04, 1], opacity: [0.75, 0.9, 0.75] }
                }
                transition={{ duration: 8, repeat: Infinity, ease: easeOutQuart }}
                className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
              />
              <motion.div
                aria-hidden="true"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { x: [0, 18, 0], y: [0, -10, 0] }
                }
                transition={{ duration: 10, repeat: Infinity, ease: easeOutQuart }}
                className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl"
              />

              <motion.div
                style={prefersReducedMotion ? undefined : { y: layers.fgY }}
                className="relative"
              >
                <p className="text-xs font-semibold tracking-wide text-muted">
                  Signature
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-text md:text-3xl">
                  Minimal surface.
                  <span className="block text-muted">Maximum intent.</span>
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  Every interaction has a purpose. Motion is used to guide,
                  emphasize, and reveal—not to distract. Performance remains
                  non‑negotiable.
                </p>
                <div className="mt-8 flex items-center gap-3 text-xs text-muted">
                  <span className="h-px w-10 bg-border" />
                  transform + opacity only
                </div>
              </motion.div>
            </motion.div>
          </div>
            </div>
          </div>
        )
      }}
    </DepthSection>
  )
}

