import { useSpring, useTransform } from 'framer-motion'

export const chapterSpringConfig = {
  stiffness: 120,
  damping: 20,
  mass: 0.9,
}

// Given a raw scrollYProgress motion value, return a smoothed chapterProgress
export function useChapterProgress(scrollYProgress) {
  return useSpring(scrollYProgress, chapterSpringConfig)
}

// Shared transforms for layered parallax inside a chapter
export function useChapterLayers(progress) {
  const bgY = useTransform(progress, [0, 1], [40, -40])
  const midY = useTransform(progress, [0, 1], [20, -20])
  const fgY = useTransform(progress, [0, 1], [10, -10])

  const sectionScale = useTransform(progress, [0, 1], [1, 0.94])
  const sectionOpacity = useTransform(progress, [0, 0.7, 1], [1, 1, 0])
  const sectionBlur = useTransform(progress, [0, 1], [0, 6])

  const incomingOpacity = useTransform(progress, [0, 0.25, 0.6], [0, 1, 1])
  const incomingY = useTransform(progress, [0, 1], [40, 0])

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

