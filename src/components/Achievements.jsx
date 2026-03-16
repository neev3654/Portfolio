import { animate, motion, useMotionValue, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import DepthSection from './DepthSection.jsx'
import { easeOutQuart, fadeUp, stagger } from '../utils/animations.js'

function CountUp({ value, duration = 1.2 }) {
  const prefersReducedMotion = useReducedMotion()
  const mv = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const unsub = mv.on('change', (v) => setDisplay(Math.round(v)))
    return () => unsub()
  }, [mv])

  useEffect(() => {
    if (prefersReducedMotion) {
      mv.set(value)
      return
    }
    const controls = animate(mv, value, {
      duration,
      ease: easeOutQuart,
    })
    return () => controls.stop()
  }, [duration, mv, prefersReducedMotion, value])

  return <span className="font-mono tabular-nums">{display}</span>
}

export default function Achievements() {
  const prefersReducedMotion = useReducedMotion()
  const stats = useMemo(
    () => [
      { label: 'Problems solved', value: 650 },
      { label: 'Contest rating', value: 1850 },
      { label: 'Badges earned', value: 14 },
    ],
    [],
  )

  const { ref, inView } = useInView({ threshold: 0.35, triggerOnce: true })

  return (
    <DepthSection id="leetcode" index={5}>
      {({ layers }) => (
        <div className="mx-auto flex h-full max-w-6xl items-center px-5 md:px-8">
          <div className="w-full">
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <h2 className="font-display text-4xl font-semibold leading-tight tracking-tighter2 text-text md:text-5xl">
              LeetCode Journey
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-text/90 md:text-lg">
              Consistency compounds. These metrics represent long-horizon
              practice—problem solving, systems thinking, and shipping.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="rounded-[28px] border border-border bg-card/20 p-6 md:p-7">
              <div className="text-xs font-semibold tracking-wide text-muted">
                Snapshot
              </div>
              <div className="mt-3 text-sm leading-relaxed text-muted">
                Replace with your real LeetCode stats when ready.
              </div>
            </div>
          </div>
        </div>

        <motion.div
          ref={ref}
          variants={stagger(0.12, 0.05)}
          initial={prefersReducedMotion ? 'show' : 'hidden'}
          animate={inView ? 'show' : 'hidden'}
          style={prefersReducedMotion ? undefined : { y: layers.midY }}
          className="mt-14 grid gap-4 sm:grid-cols-3"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              transition={{ duration: 0.7, ease: easeOutQuart }}
              className="rounded-[28px] border border-border bg-bg/20 p-6 backdrop-blur"
            >
              <div className="text-xs font-semibold tracking-wide text-muted">
                {s.label}
              </div>
              <div className="mt-5 font-display text-5xl font-semibold tracking-tighter2 text-text">
                {inView ? <CountUp value={s.value} /> : 0}
              </div>
              <div className="mt-6 h-px w-10 bg-border" />
            </motion.div>
          ))}
        </motion.div>
          </div>
        </div>
      )}
    </DepthSection>
  )
}

