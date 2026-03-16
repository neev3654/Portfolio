import { useTransform } from 'framer-motion'
import { parallaxSpeeds } from '../animations/scrollConfig.js'

// Given a spring-smoothed [0,1] chapter progress,
// return specialized raw y-offsets for 3 classic parallax layers
export function useParallaxLayers(progress) {
  // A section progress typically goes 0 -> 1 as it scrolls UP the screen.
  // The 'background' layer moves SLOWLY upward.
  // The 'content' layer moves at normal speed.
  // The 'foreground' layer moves FAST upward (past the content).
  
  // y moves in pixels
  // Reduce vertical shift so content stays visible while the section is pinned.
  // Clamp the transform once the section is over the “pinned” viewport window.
  const bgY = useTransform(progress, [0, 0.6, 1], [0, -40 * parallaxSpeeds.bg, -40 * parallaxSpeeds.bg])
  const contentY = useTransform(progress, [0, 0.6, 1], [0, -75 * parallaxSpeeds.mid, -75 * parallaxSpeeds.mid])
  const fgY = useTransform(progress, [0, 0.6, 1], [30, -150 * parallaxSpeeds.fg, -150 * parallaxSpeeds.fg])

  return { bgY, contentY, fgY }
}
