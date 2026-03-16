import { motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useChapterScroll } from '../hooks/useChapterScroll.js'
import { useChapterLayers } from '../utils/scrollAnimations.js'
import { useActiveSection } from '../hooks/useActiveSection.js'

/**
 * ChapterSection
 *  - Full-height, pinned chapter with shared cinematic transitions.
 *  - children is a render prop receiving { progress, layers }.
 */
export default function ChapterSection({ id, children, className = '' }) {
  const prefersReducedMotion = useReducedMotion()
  const { markActive } = useActiveSection()
  const { ref, progress } = useChapterScroll()
  const layers = useChapterLayers(progress)
  const { sectionScale, sectionOpacity } = layers

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.5,
    rootMargin: '0px 0px -40% 0px',
  })

  // Merge refs
  const setRef = (node) => {
    ref.current = node
    inViewRef(node)
  }

  useEffect(() => {
    if (inView) markActive(id)
  }, [id, inView, markActive])

  return (
    <section
      id={id}
      ref={setRef}
      className={`relative min-h-[180svh] ${className}`}
    >
      <div className="sticky top-16 flex h-[calc(100svh-4rem)] items-stretch">
        <motion.div
          style={
            prefersReducedMotion
              ? undefined
              : {
                  scale: sectionScale,
                  opacity: sectionOpacity,
                }
          }
          className="relative z-10 flex h-full w-full items-center justify-center"
        >
          {children({ progress, layers })}
        </motion.div>
      </div>
    </section>
  )
}

