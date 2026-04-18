import { useEffect, useRef, useState, useCallback } from 'react'
import { FiAward, FiExternalLink, FiX, FiCalendar } from 'react-icons/fi'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { certificates } from '../data/certificatesData.js'
import ChapterSection from './ChapterSection.jsx'
import MaskedTextReveal from './MaskedTextReveal.jsx'
import { useIsStandaloneRoute } from '../hooks/useStandaloneRoute.js'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────
   Lightbox Modal — views certificate proof image
   ───────────────────────────────────────────── */
function Lightbox({ src, alt, onClose }) {
  const backdropRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: 'power2.out' }
    )
    gsap.fromTo(imgRef.current,
      { scale: 0.88, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: 'power3.out', delay: 0.08 }
    )
  }, [])

  const handleClose = useCallback(() => {
    gsap.to(imgRef.current, { scale: 0.92, opacity: 0, y: 20, duration: 0.25, ease: 'power2.in' })
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      delay: 0.08,
      onComplete: onClose,
    })
  }, [onClose])

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleClose])

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg/80 backdrop-blur-sm p-4"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Certificate proof: ${alt}`}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-card/90 text-text shadow-lg hover:bg-border/50 hover:scale-110 transition-all duration-300"
        aria-label="Close lightbox"
      >
        <FiX className="h-5 w-5" />
      </button>

      {/* Image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-2xl object-contain"
      />
    </div>
  )
}

/* ─────────────────────────────────────────────
   Single Certificate Card
   ───────────────────────────────────────────── */
function CertificateCard({ cert, onViewProof }) {
  const handleProof = () => {
    if (!cert.proof) return
    if (cert.proofType === 'link') {
      window.open(cert.proof, '_blank', 'noopener,noreferrer')
    } else {
      onViewProof(cert)
    }
  }

  return (
    <div className="cert-card group relative overflow-hidden rounded-2xl bg-card border border-border/50 p-7 md:p-8 card-hover-lift will-change-transform">
      {/* Accent gradient stripe at top */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Org logo / fallback icon */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-bg border border-border/30 group-hover:bg-accent-blue/10 transition-colors duration-500 overflow-hidden">
          {cert.logo ? (
            <img
              src={cert.logo}
              alt={`${cert.org} logo`}
              loading="lazy"
              className="h-7 w-7 object-contain"
            />
          ) : (
            <FiAward className="h-5 w-5 text-muted group-hover:text-accent-blue transition-colors duration-500" />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold tracking-widest uppercase text-muted truncate">
            {cert.org}
          </p>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold tracking-tight text-text leading-snug mb-3 line-clamp-2 min-h-[3.2rem]">
        {cert.title}
      </h3>

      {/* Date & credential */}
      <div className="flex items-center gap-2 mb-1">
        <FiCalendar className="h-3.5 w-3.5 text-muted flex-shrink-0" />
        <span className="text-[13px] text-muted font-medium">{cert.date}</span>
      </div>

      {cert.credentialId && (
        <p className="text-[11px] font-mono text-muted/60 tracking-wide mt-1 truncate">
          ID: {cert.credentialId}
        </p>
      )}

      {/* Divider */}
      <div className="h-px w-full bg-border/50 my-5 group-hover:bg-accent-blue/20 transition-colors duration-500" />

      {/* Proof button */}
      <button
        onClick={handleProof}
        disabled={!cert.proof}
        className="inline-flex items-center gap-2 rounded-full bg-text px-5 py-2.5 text-[13px] font-medium text-bg transition-all duration-300 hover:opacity-80 hover:scale-[1.03] hover:shadow-lg active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
      >
        {cert.proofType === 'link' ? 'Verify' : 'View Proof'}
        <FiExternalLink className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Certificates Section
   ───────────────────────────────────────────── */
export default function Certificates() {
  const containerRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)
  const [lightbox, setLightbox] = useState(null)
  const isStandalone = useIsStandaloneRoute()

  const onViewProof = useCallback((cert) => {
    setLightbox({ src: cert.proof, alt: cert.title })
  }, [])

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

        if (gridRef.current) {
          const cards = gsap.utils.toArray(gridRef.current.children)
          cards.forEach((card, i) => {
            gsap.fromTo(card,
              {
                y: 80,
                opacity: 0,
                scale: 0.92,
                transformOrigin: '50% 100%',
              },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                delay: i * 0.1,
                ease: 'power4.out',
                scrollTrigger: {
                  trigger: gridRef.current,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse',
                },
              }
            )
          })
        }
      } else {
        // ── STANDALONE: immediate animations ──
        if (headerRef.current) {
          gsap.fromTo(headerRef.current.children,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
          )
        }

        if (gridRef.current) {
          const cards = gsap.utils.toArray(gridRef.current.children)
          cards.forEach((card, i) => {
            gsap.fromTo(card,
              { y: 30, opacity: 0, scale: 0.96 },
              { y: 0, opacity: 1, scale: 1, duration: 0.7, delay: 0.15 + i * 0.08, ease: 'power3.out' }
            )
          })
        }
      }
    }, container)

    return () => ctx.revert()
  }, [isStandalone])

  return (
    <>
      <ChapterSection id="certificates" className="bg-bg text-text">
        <div ref={containerRef} className="mx-auto flex h-full max-w-7xl items-center w-full relative pt-24 md:pt-12">

          {/* Background bloom — consistent with Skills section */}
          <div className="absolute right-1/3 top-1/4 w-[500px] h-[500px] bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="w-full flex flex-col pt-12 md:pt-20 relative z-10">

            {/* HEADER */}
            <div ref={headerRef} className="max-w-4xl px-4 md:px-0">
              <p className="mb-4 text-xs font-semibold tracking-widest uppercase text-muted">
                Chapter 05
              </p>
              <MaskedTextReveal
                as="h2"
                text="Credentials that back it up."
                className="font-display text-2xl sm:text-4xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-tightest mb-4 text-text"
                mode="trigger"
                split="lines"
              />
              <p className="max-w-2xl mt-4 text-base md:text-xl text-muted leading-relaxed">
                Industry-recognised certifications and achievements that
                validate expertise and commitment to continuous learning.
              </p>
            </div>

            {/* CERTIFICATE GRID — 3 cols desktop · 2 tablet · 1 mobile */}
            <div
              ref={gridRef}
              className="mt-8 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl pb-12 md:pb-0 px-4 md:px-0"
            >
              {certificates.map((cert) => (
                <CertificateCard
                  key={cert.id}
                  cert={cert}
                  onViewProof={onViewProof}
                />
              ))}
            </div>

          </div>
        </div>
      </ChapterSection>

      {/* Lightbox overlay */}
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  )
}
