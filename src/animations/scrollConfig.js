/**
 * scrollConfig.js
 * Cinematic timing and easing presets.
 */

export const scrollTimings = {
  enterStart: 0.0,
  headlineIn: 0.15,
  contentIn: 0.35,
  visualsIn: 0.55,
  exitStart: 0.8,
}

export const easing = {
  base: 'power3.out',
  smooth: 'expo.out',
  subtle: 'power2.out',
  cinemaEntrance: 'power4.out',
  cinemaExit: 'power2.inOut',
  luxuryReveal: 'expo.out',
}

export const parallaxSpeeds = {
  bg: 0.3,
  mid: 0.6,
  fg: 1.0,
  bloom: 0.4,
  card: 0.15,
}

export const scrubDefaults = {
  headline: { start: 'top 85%', end: 'top 35%', scrub: true },
  subtitle: { start: 'top 80%', end: 'top 45%', scrub: true },
  cards: { start: 'top 80%', end: 'bottom 60%', scrub: true },
  entrance: { start: 'top bottom', end: 'top top', scrub: true },
}
