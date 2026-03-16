/**
 * sectionTransitions.js
 * Shared chapter transition presets for cinematic scrollytelling.
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Multi-layer background parallax.
 * @param {Array<{element: Element, speed: number}>} layers
 * @param {Object} triggerOptions
 */
export function backgroundParallax(layers, triggerOptions = {}) {
  const {
    trigger,
    start = 'top bottom',
    end = 'bottom top',
    scrub = true,
    pinnedContainer = null,
  } = triggerOptions

  return layers.map(({ element, speed }) => {
    if (!element) return null
    return gsap.to(element, {
      y: () => -speed * 200,
      ease: 'none',
      scrollTrigger: {
        trigger: trigger || element,
        start,
        end,
        scrub,
        pinnedContainer,
      },
    })
  })
}

/**
 * Staggered reveal for a grid of elements with depth.
 * Cards translate upward + fade in + subtle scale, scrubbed to scroll.
 */
export function scrubStaggerReveal(elements, options = {}) {
  const {
    trigger,
    start = 'top 80%',
    end = 'bottom 60%',
    scrub = true,
    stagger = 0.08,
    yOffset = 60,
    pinnedContainer = null,
  } = options

  if (!elements || elements.length === 0) return null

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: trigger || elements[0],
      start,
      end,
      scrub,
      pinnedContainer,
    },
  })

  tl.fromTo(
    elements,
    { y: yOffset, opacity: 0, scale: 0.96 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      stagger,
      ease: 'power2.out',
      duration: 0.8,
    }
  )

  return tl
}

/**
 * Per-card parallax depth. Each card moves at a slightly different speed.
 */
export function depthParallax(cards, options = {}) {
  const {
    trigger,
    start = 'top bottom',
    end = 'bottom top',
    scrub = true,
    baseSpeed = 20,
    pinnedContainer = null,
  } = options

  return cards.map((card, i) => {
    if (!card) return null
    const speed = baseSpeed + (i % 3) * 15  // Vary speed per card
    return gsap.to(card, {
      y: -speed,
      ease: 'none',
      scrollTrigger: {
        trigger: trigger || card,
        start,
        end,
        scrub,
        pinnedContainer,
      },
    })
  })
}
