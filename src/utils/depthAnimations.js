import { useSpring, useTransform } from 'framer-motion'

export const depthStep = 800

export const depthSpringConfig = {
  stiffness: 100,
  damping: 25,
  mass: 0.9,
}

// Given a base index in the scene and a scroll progress value [0,1],
// compute depth-related transforms for a section.
export function useDepthTransforms(progress, index) {
  const smooth = useSpring(progress, depthSpringConfig)
  const baseZ = -index * depthStep

  const z = useTransform(smooth, [0, 1], [baseZ + depthStep * 0.6, baseZ])
  const scale = useTransform(smooth, [0, 1], [0.9, 1])
  const opacity = useTransform(smooth, [0, 0.4, 1], [0.45, 1, 0.85])

  return { z, scale, opacity }
}

