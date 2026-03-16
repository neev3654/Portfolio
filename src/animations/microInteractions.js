/**
 * microInteractions.js
 * Subtle polish: magnetic hover, button pulse, etc.
 */
import gsap from 'gsap'

/**
 * Magnetic hover effect — element subtly follows cursor within bounds.
 * Call on mouseenter, track on mousemove, reset on mouseleave.
 */
export function magneticHover(element, strength = 0.3) {
  if (!element) return () => {}

  const onMove = (e) => {
    const rect = element.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(element, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const onLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    })
  }

  element.addEventListener('mousemove', onMove)
  element.addEventListener('mouseleave', onLeave)

  return () => {
    element.removeEventListener('mousemove', onMove)
    element.removeEventListener('mouseleave', onLeave)
  }
}

/**
 * Button pulse — gentle hover glow.
 * Adds a scale + shadow animation on hover.
 */
export function buttonPulse(element) {
  if (!element) return () => {}

  const onEnter = () => {
    gsap.to(element, {
      scale: 1.04,
      boxShadow: '0 8px 30px rgba(41, 151, 255, 0.15)',
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const onLeave = () => {
    gsap.to(element, {
      scale: 1,
      boxShadow: '0 0px 0px rgba(0,0,0,0)',
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  element.addEventListener('mouseenter', onEnter)
  element.addEventListener('mouseleave', onLeave)

  return () => {
    element.removeEventListener('mouseenter', onEnter)
    element.removeEventListener('mouseleave', onLeave)
  }
}
