import { motion, useReducedMotion } from 'framer-motion'
import { useScrollProgress } from '../hooks/useScrollProgress.js'

export default function ScrollProgress() {
  const scrollYProgress = useScrollProgress()
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="fixed left-0 top-0 z-50 h-[2px] w-full bg-transparent">
      <motion.div
        aria-hidden="true"
        className="h-full w-full origin-left bg-accent/80"
        style={{
          scaleX: prefersReducedMotion ? 1 : scrollYProgress,
        }}
      />
    </div>
  )
}

