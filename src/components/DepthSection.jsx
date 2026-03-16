import { motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useChapterScroll } from '../hooks/useChapterScroll.js'
import { useChapterLayers } from '../utils/scrollAnimations.js'
import { useDepthScroll } from '../hooks/useDepthScroll.js'
import { useActiveSection } from '../hooks/useActiveSection.js'

/**
 * DepthSection
 *  - Full-height, pinned chapter with 3D depth transforms.
 *  - children is a render prop receiving { progress, layers, depth }.
 */
export default function DepthSection({ id, index, children, className = '' }) {
  const prefersReducedMotion = useReducedMotion()
  const { markActive } = useActiveSection()

  const { ref, progress } = useChapterScroll()
  const layers = useChapterLayers(progress)
  const depth = useDepthScroll(progress, index)

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
      className={`relative min-h-[140svh] ${className}`}
    >
      <div className="sticky top-16 flex h-[calc(100svh-5rem)] items-stretch [transform-style:preserve-3d]">
        <motion.div
          style={
            prefersReducedMotion
              ? undefined
              : {
                  z: depth.z,
                  scale: depth.scale,
                  opacity: depth.opacity,
                }
          }
          className="relative z-10 flex h-full w-full items-center justify-center [transform-style:preserve-3d]"
        >
          {children({ progress, layers, depth })}
        </motion.div>
      </div>
    </section>
  )
}

