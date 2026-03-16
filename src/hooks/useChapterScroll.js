import { useRef } from 'react'
import { useScroll } from 'framer-motion'
import { useChapterProgress } from '../utils/scrollAnimations.js'

// Hook to drive chapter-style scroll for a section.
// Returns { ref, progress } where progress is a spring-smooth MotionValue [0,1].
export function useChapterScroll(options) {
  const targetRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
    ...options,
  })

  const progress = useChapterProgress(scrollYProgress)
  return { ref: targetRef, progress }
}

