import { useSpring, useTransform } from 'framer-motion'
import { parallaxSpeeds } from '../animations/scrollConfig.js'

export const chapterSpringConfig = {
  stiffness: 100,
  damping: 25,
  mass: 1,
}

// Given a raw scrollYProgress motion value from a chapter, return a smoothed chapterProgress
export function useChapterProgress(scrollYProgress) {
  return useSpring(scrollYProgress, chapterSpringConfig)
}

// Shared transforms for 3-layer parallax inside a chapter
export function useChapterLayers(progress) {
  // Light theme cinematic speeds (tighter movement than before)
  const bgY = useTransform(progress, [0, 1], [30 * parallaxSpeeds.bg, -30 * parallaxSpeeds.bg])
  // the content layer
  const midY = useTransform(progress, [0, 1], [60 * parallaxSpeeds.mid, -60 * parallaxSpeeds.mid])
  // the fast foreground layer
  const fgY = useTransform(progress, [0, 1], [100 * parallaxSpeeds.fg, -100 * parallaxSpeeds.fg])

  // Apple-style section scale effect: slightly shrink and fade previous sections
  const sectionScale = useTransform(progress, [0, 1], [1, 0.96])
  const sectionOpacity = useTransform(progress, [0, 0.8, 1], [1, 1, 0])
  const sectionBlur = useTransform(progress, [0, 1], [0, 8])

  // For sections sliding up over the previous one
  const incomingOpacity = useTransform(progress, [0, 0.2, 0.5], [0, 1, 1])
  const incomingY = useTransform(progress, [0, 1], [60, 0])

  return {
    bgY,
    midY,
    fgY,
    sectionScale,
    sectionOpacity,
    sectionBlur,
    incomingOpacity,
    incomingY,
  }
}
