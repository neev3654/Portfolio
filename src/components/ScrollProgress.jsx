import { motion, useReducedMotion } from 'framer-motion'
import { useScrollProgress } from '../hooks/useScrollProgress.js'

export default function ScrollProgress() {
  const scrollYProgress = useScrollProgress()
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="fixed left-0 top-0 z-[60] h-[3px] w-full bg-transparent">
      <motion.div
        aria-hidden="true"
        className="h-full w-full origin-left bg-gradient-to-r from-accent-blue/80 to-accent-purple/80 backdrop-blur-sm"
        style={{
          scaleX: prefersReducedMotion ? 1 : scrollYProgress,
        }}
      />
    </div>
  )
}
