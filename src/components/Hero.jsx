import { motion, useReducedMotion, useTransform } from 'framer-motion'
import DepthSection from './DepthSection.jsx'
import { easeOutQuart } from '../utils/animations.js'
import { useActiveSection } from '../hooks/useActiveSection.js'

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const { scrollToId } = useActiveSection()

  return (
    <DepthSection id="hero" index={0}>
      {({ progress, layers }) => {
        const headlineScale = useTransform(progress, [0, 1], [1, 0.86])
        const headlineY = useTransform(progress, [0, 1], [0, -80])
        const heroOpacity = useTransform(progress, [0, 0.6, 1], [1, 1, 0])
        const nextRevealOpacity = useTransform(progress, [0.35, 0.9], [0, 1])

        return (
          <div className="relative h-full w-full overflow-hidden bg-bg">
            <motion.div
              style={prefersReducedMotion ? undefined : { y: layers.bgY }}
              className="pointer-events-none absolute inset-0 bg-hero-glow opacity-90"
            />
            <div className="pointer-events-none absolute inset-0 bg-subtle-grid bg-grid opacity-[0.06]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />

            <motion.div
              style={
                prefersReducedMotion ? undefined : { opacity: heroOpacity }
              }
              className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-5 pb-24 pt-20 md:px-8"
            >
              <motion.div
                style={prefersReducedMotion ? undefined : { y: layers.midY }}
                className="max-w-4xl"
              >
                <p className="mb-4 text-xs font-semibold tracking-wide text-accent">
                  // WELCOME TO MY PORTFOLIO
                </p>

                <motion.h1
                  style={
                    prefersReducedMotion
                      ? undefined
                      : { scale: headlineScale, y: headlineY }
                  }
                  className="font-display text-5xl font-semibold leading-[1.02] tracking-tighter2 text-text sm:text-6xl md:text-[3.6rem]"
                >
                  Hi, I&apos;m{' '}
                  <span className="block text-accent">Neev Patel</span>
                </motion.h1>

                <p className="mt-5 text-lg font-semibold text-text">
                  Full Stack Developer crafting robust web experiences.
                </p>

                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text/90 md:text-base">
                  I specialize in building high-performance, scalable web
                  applications using modern front-end and back-end technologies.
                  With a passion for clean code and intuitive user interfaces, I
                  transform complex problems into elegant digital solutions.
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <motion.button
                    whileHover={prefersReducedMotion ? undefined : { y: -1 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                    transition={{ duration: 0.2, ease: easeOutQuart }}
                    onClick={() => scrollToId('projects')}
                    className="inline-flex items-center justify-center rounded-full bg-text px-6 py-3 text-sm font-semibold text-bg"
                  >
                    Download Résumé
                  </motion.button>
                  <motion.button
                    whileHover={prefersReducedMotion ? undefined : { y: -1 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                    transition={{ duration: 0.2, ease: easeOutQuart }}
                    onClick={() => scrollToId('contact')}
                    className="inline-flex items-center justify-center rounded-full border border-border bg-card/20 px-6 py-3 text-sm font-semibold text-text backdrop-blur hover:border-accent/30 hover:shadow-glow"
                  >
                    Contact
                  </motion.button>
                </div>
              </motion.div>

              <div className="mt-16 flex items-center gap-4 text-xs text-muted">
                <span className="h-px w-10 bg-border" />
                Scroll to reveal the story
              </div>
            </motion.div>

            <motion.div
              aria-hidden="true"
              style={
                prefersReducedMotion
                  ? undefined
                  : { opacity: nextRevealOpacity, y: layers.incomingY }
              }
              className="pointer-events-none absolute inset-x-0 bottom-10 flex justify-center text-[0.7rem] uppercase tracking-[0.2em] text-muted/70"
            >
              Chapter 01 · About
            </motion.div>
          </div>
        )
      }}
    </DepthSection>
  )
}

