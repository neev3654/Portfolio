/**
 * textAnimations.js
 * Reusable SplitType-powered text animation utilities.
 * All animations are scroll-scrubbed by default.
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

const REDUCED_MOTION = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Split text and animate lines sliding up from a mask.
 * Each line is wrapped in overflow:hidden and translates from 100% to 0.
 */
export function createLineReveal(element, options = {}) {
  if (REDUCED_MOTION || !element) return null

  const {
    start = 'top 85%',
    end = 'top 40%',
    scrub = true,
    stagger = 0.1,
    pinnedContainer = null,
  } = options

  const split = new SplitType(element, { types: 'lines', tagName: 'span' })

  // Wrap each line in an overflow-hidden container
  split.lines?.forEach((line) => {
    const wrapper = document.createElement('div')
    wrapper.style.overflow = 'hidden'
    wrapper.style.display = 'block'
    line.parentNode.insertBefore(wrapper, line)
    wrapper.appendChild(line)
  })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub,
      pinnedContainer,
    },
  })

  tl.fromTo(
    split.lines,
    { yPercent: 110, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      stagger,
      ease: 'power3.out',
      duration: 1,
    }
  )

  return {
    timeline: tl,
    split,
    revert: () => {
      tl.kill()
      split.revert()
    },
  }
}

/**
 * Split text into words and stagger their reveal.
 */
export function createWordStagger(element, options = {}) {
  if (REDUCED_MOTION || !element) return null

  const {
    start = 'top 85%',
    end = 'top 40%',
    scrub = true,
    stagger = 0.05,
    pinnedContainer = null,
  } = options

  const split = new SplitType(element, { types: 'words', tagName: 'span' })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub,
      pinnedContainer,
    },
  })

  tl.fromTo(
    split.words,
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger,
      ease: 'power2.out',
      duration: 0.6,
    }
  )

  return {
    timeline: tl,
    split,
    revert: () => {
      tl.kill()
      split.revert()
    },
  }
}

/**
 * Split into characters and reveal with fade + translateY.
 */
export function createCharReveal(element, options = {}) {
  if (REDUCED_MOTION || !element) return null

  const {
    start = 'top 85%',
    end = 'top 40%',
    scrub = true,
    stagger = 0.015,
    pinnedContainer = null,
  } = options

  const split = new SplitType(element, { types: 'words, chars', tagName: 'span' })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub,
      pinnedContainer,
    },
  })

  tl.fromTo(
    split.chars,
    { y: 20, opacity: 0, rotateX: -40, transformOrigin: '50% 100%' },
    {
      y: 0,
      opacity: 1,
      rotateX: 0,
      stagger,
      ease: 'power3.out',
      duration: 0.5,
    }
  )

  return {
    timeline: tl,
    split,
    revert: () => {
      tl.kill()
      split.revert()
    },
  }
}
