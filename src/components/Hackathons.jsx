import { useEffect, useRef } from 'react'
import {
  FiGithub,
  FiPlay,
  FiMapPin,
  FiCalendar,
  FiTarget,
  FiZap,
  FiCheckCircle,
} from 'react-icons/fi'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { hackathons } from '../data/hackathonData.js'
import ChapterSection from './ChapterSection.jsx'
import MaskedTextReveal from './MaskedTextReveal.jsx'
import { useIsStandaloneRoute } from '../hooks/useStandaloneRoute.js'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────
   Badge config — colours & labels per result
   ───────────────────────────────────────────── */
const BADGE_CONFIG = {
  winner: {
    label: '🏆 Winner',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    glow: 'shadow-amber-100',
    dot: 'bg-amber-400',
  },
  'runner-up': {
    label: '🥈 Runner-up',
    bg: 'bg-slate-50',
    text: 'text-slate-600',
    border: 'border-slate-200',
    glow: 'shadow-slate-100',
    dot: 'bg-slate-400',
  },
  finalist: {
    label: '⭐ Finalist',
    bg: 'bg-violet-50',
    text: 'text-violet-600',
    border: 'border-violet-200',
    glow: 'shadow-violet-100',
    dot: 'bg-violet-400',
  },
  participant: {
    label: '✦ Participant',
    bg: 'bg-sky-50',
    text: 'text-sky-600',
    border: 'border-sky-200',
    glow: 'shadow-sky-100',
    dot: 'bg-sky-400',
  },
}

/* ─────────────────────────────────────────────
   Tech pill — reused from project pattern
   ───────────────────────────────────────────── */
function TechPill({ children }) {
  return (
    <span className="rounded-full bg-border/20 px-2.5 py-1 text-[10px] font-semibold text-muted font-mono tracking-tight">
      {children}
    </span>
  )
}

/* ─────────────────────────────────────────────
   Single timeline card
   ───────────────────────────────────────────── */
function HackathonCard({ hack, index, isLast }) {
  const badge = BADGE_CONFIG[hack.badge] || BADGE_CONFIG.participant

  return (
    <div className="hack-card group relative flex gap-6 md:gap-10 will-change-transform">

      {/* ── TIMELINE SPINE ── */}
      <div className="relative flex flex-col items-center flex-shrink-0">
        {/* Dot */}
        <div className={`relative z-10 flex h-5 w-5 items-center justify-center rounded-full border-[3px] border-bg ${badge.dot} shadow-md transition-transform duration-500 group-hover:scale-125`}>
          <div className="absolute inset-0 rounded-full animate-pulse opacity-20" style={{ backgroundColor: 'inherit' }} />
        </div>
        {/* Vertical line */}
        {!isLast && (
          <div className="w-px flex-1 bg-gradient-to-b from-border/50 to-transparent min-h-[40px]" />
        )}
      </div>

      {/* ── CARD BODY ── */}
      <div className="flex-1 pb-12 md:pb-16">
        <div className="overflow-hidden rounded-2xl bg-card border border-border/50 p-6 md:p-8 card-hover-lift transition-all duration-500 will-change-transform">

          {/* Top row: badge + meta */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            {/* Badge */}
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold tracking-wide border ${badge.bg} ${badge.text} ${badge.border} shadow-sm ${badge.glow}`}
            >
              {badge.label}
            </span>

            {/* Date + location */}
            <div className="flex items-center gap-4 text-[12px] text-muted font-medium">
              <span className="inline-flex items-center gap-1.5">
                <FiCalendar className="h-3 w-3" />
                {hack.date}
              </span>
              {hack.location && (
                <span className="inline-flex items-center gap-1.5">
                  <FiMapPin className="h-3 w-3" />
                  {hack.location}
                </span>
              )}
            </div>
          </div>

          {/* Event name */}
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-text leading-snug mb-1">
            {hack.event}
          </h3>
          {hack.organizer && (
            <p className="text-[13px] text-muted font-medium mb-5">
              by {hack.organizer}
            </p>
          )}

          {/* Divider */}
          <div className="h-px w-full bg-border/50 mb-5 group-hover:bg-accent-blue/15 transition-colors duration-500" />

          {/* Content blocks */}
          <div className="space-y-4 mb-6">
            {/* Problem */}
            <div className="flex gap-3">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-400 mt-0.5">
                <FiTarget className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-widest uppercase text-muted mb-1">Problem</p>
                <p className="text-[14px] text-text/80 leading-relaxed">{hack.problem}</p>
              </div>
            </div>

            {/* Solution */}
            <div className="flex gap-3">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-accent-blue mt-0.5">
                <FiZap className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-widest uppercase text-muted mb-1">Solution</p>
                <p className="text-[14px] text-text/80 leading-relaxed">{hack.solution}</p>
              </div>
            </div>

            {/* Outcome */}
            <div className="flex gap-3">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500 mt-0.5">
                <FiCheckCircle className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-widest uppercase text-muted mb-1">Outcome</p>
                <p className="text-[14px] text-text/80 leading-relaxed">{hack.outcome}</p>
              </div>
            </div>
          </div>

          {/* Tech stack */}
          {hack.tech?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {hack.tech.map((t) => (
                <TechPill key={t}>{t}</TechPill>
              ))}
            </div>
          )}

          {/* Links */}
          {(hack.links?.github || hack.links?.demo) && (
            <div className="flex items-center gap-3 pt-1">
              {hack.links.github && (
                <a
                  href={hack.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-bg hover:bg-border/30 hover:scale-105 text-text transition-all duration-300"
                  aria-label={`${hack.event} GitHub repo`}
                >
                  <FiGithub className="h-4 w-4" />
                </a>
              )}
              {hack.links.demo && (
                <a
                  href={hack.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 px-4 items-center justify-center rounded-full bg-text hover:opacity-80 hover:scale-[1.03] text-bg text-[12px] font-medium transition-all duration-300"
                >
                  <FiPlay className="mr-1.5 h-3 w-3" /> Demo
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Hackathons Section (Timeline layout)
   ───────────────────────────────────────────── */
export default function Hackathons() {
  const containerRef = useRef(null)
  const headerRef = useRef(null)
  const timelineRef = useRef(null)
  const lineRef = useRef(null)
  const isStandalone = useIsStandaloneRoute()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      if (!isStandalone) {
        // ── HOME: scroll-triggered ──
        if (headerRef.current) {
          gsap.from(headerRef.current.children, {
            y: 40,
            opacity: 0,
            stagger: 0.15,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          })
        }

        if (timelineRef.current) {
          const cards = gsap.utils.toArray('.hack-card')

          cards.forEach((card, i) => {
            gsap.fromTo(
              card,
              {
                x: i % 2 === 0 ? -40 : 40,
                y: 50,
                opacity: 0,
                scale: 0.96,
              },
              {
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: 'power4.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 88%',
                  toggleActions: 'play none none reverse',
                },
              }
            )
          })
        }

        if (lineRef.current && timelineRef.current) {
          gsap.fromTo(
            lineRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: timelineRef.current,
                start: 'top 70%',
                end: 'bottom 50%',
                scrub: true,
              },
            }
          )
        }
      } else {
        // ── STANDALONE: immediate animations ──
        if (headerRef.current) {
          gsap.fromTo(headerRef.current.children,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
          )
        }

        if (timelineRef.current) {
          const cards = gsap.utils.toArray('.hack-card')
          cards.forEach((card, i) => {
            gsap.fromTo(card,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, delay: 0.15 + i * 0.1, ease: 'power3.out' }
            )
          })
        }

        if (lineRef.current) {
          gsap.set(lineRef.current, { scaleY: 1 })
        }
      }
    }, container)

    return () => ctx.revert()
  }, [isStandalone])

  return (
    <ChapterSection id="hackathons" className="bg-bg text-text">
      <div
        ref={containerRef}
        className="mx-auto flex h-full max-w-7xl items-center w-full relative pt-24 md:pt-12"
      >
        {/* Background bloom */}
        <div className="absolute left-1/4 bottom-1/4 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full flex flex-col pt-12 md:pt-20 relative z-10">

          {/* HEADER */}
          <div ref={headerRef} className="max-w-4xl px-4 md:px-0">
            <p className="mb-4 text-xs font-semibold tracking-widest uppercase text-muted">
              Chapter 06
            </p>
            <MaskedTextReveal
              as="h2"
              text="Built under pressure, shipped on time."
              className="font-display text-2xl sm:text-4xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-tightest mb-4 text-text"
              mode="trigger"
              split="lines"
            />
            <p className="max-w-2xl mt-4 text-base md:text-xl text-muted leading-relaxed">
              Hackathons sharpen the instinct to ideate, architect, and ship
              under extreme constraints. Here are the battles.
            </p>
          </div>

          {/* TIMELINE */}
          <div
            ref={timelineRef}
            className="relative mt-10 md:mt-20 max-w-3xl w-full px-4 md:px-0 pb-12 md:pb-0"
          >
            {/* Animated vertical accent line behind the dots */}
            <div
              ref={lineRef}
              className="absolute left-[13px] md:left-[13px] top-0 bottom-0 w-px origin-top"
              style={{
                background:
                  'linear-gradient(180deg, #2997ff 0%, #a259ff 50%, transparent 100%)',
              }}
            />

            {hackathons.map((hack, idx) => (
              <HackathonCard
                key={hack.id}
                hack={hack}
                index={idx}
                isLast={idx === hackathons.length - 1}
              />
            ))}
          </div>

        </div>
      </div>
    </ChapterSection>
  )
}
