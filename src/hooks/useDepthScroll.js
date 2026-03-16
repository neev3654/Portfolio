import { useDepthTransforms } from '../utils/depthAnimations.js'

// Hook to derive depth transforms for a chapter from its scroll progress.
// Expects a MotionValue progress [0,1] and a depth index (0,1,2,...).
export function useDepthScroll(progress, index) {
  return useDepthTransforms(progress, index)
}

