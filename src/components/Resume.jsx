import { useEffect, useRef, useState, useCallback } from 'react'
import { FiFileText, FiX, FiEye, FiDownload } from 'react-icons/fi'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ChapterSection from './ChapterSection.jsx'
import MaskedTextReveal from './MaskedTextReveal.jsx'
import { useIsStandaloneRoute } from '../hooks/useStandaloneRoute.js'

gsap.registerPlugin(ScrollTrigger)

/* ─── Resume PDF — Google Drive hosted ─── */
const RESUME_VIEW = 'https://drive.google.com/file/d/1-_bukCf56d4hSRew8Wja2q3-KkCsPBt5/preview'
const RESUME_DOWNLOAD = 'https://drive.google.com/uc?export=download&id=1-_bukCf56d4hSRew8Wja2q3-KkCsPBt5'

/* ─────────────────────────────────────────────
   PDF Viewer Modal — opens resume without download
   ───────────────────────────────────────────── */
function PDFViewerModal({ onClose }) {
  const backdropRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: 'power2.out' }
    )
    gsap.fromTo(panelRef.current,
      { scale: 0.92, opacity: 0, y: 40 },
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.08 }
    )
  }, [])

  const handleClose = useCallback(() => {
    gsap.to(panelRef.current, { scale: 0.95, opacity: 0, y: 30, duration: 0.25, ease: 'power2.in' })
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

  // Lock body scroll while modal is open
  useEffect(() => {
    const orig = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = orig }
  }, [])

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg/80 backdrop-blur-sm p-4"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Resume PDF viewer"
    >
      {/* Panel */}
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl h-[90vh] rounded-2xl bg-card border border-border/50 shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-card/90 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-bg border border-border/30">
              <FiFileText className="h-4 w-4 text-accent-blue" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text tracking-tight">Resume</p>
              <p className="text-[11px] text-muted">Neev Patel — PDF Document</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={RESUME_DOWNLOAD}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 px-4 items-center gap-2 rounded-full bg-border/20 text-text hover:bg-border/40 transition-all text-[13px] font-medium"
              aria-label="Download resume from modal"
            >
              <FiDownload className="h-4 w-4" />
              Download
            </a>
            <button
              onClick={handleClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-bg/80 text-text hover:bg-border/50 hover:scale-110 transition-all duration-300"
              aria-label="Close PDF viewer"
              id="resume-modal-close"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* PDF iframe — view-only, no download attribute */}
        <div className="flex-1 w-full bg-bg/50">
          <iframe
            src={RESUME_VIEW}
            title="Resume PDF"
            className="w-full h-full border-0"
            style={{ minHeight: '100%' }}
            allow="autoplay"
          />
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Resume Section
   ───────────────────────────────────────────── */
export default function Resume() {
  const containerRef = useRef(null)
  const headerRef = useRef(null)
  const cardRef = useRef(null)
  const [showPDF, setShowPDF] = useState(false)
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

        if (cardRef.current) {
          gsap.fromTo(cardRef.current,
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
              ease: 'power4.out',
              scrollTrigger: {
                trigger: cardRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
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

        if (cardRef.current) {
          gsap.fromTo(cardRef.current,
            { y: 30, opacity: 0, scale: 0.96 },
            { y: 0, opacity: 1, scale: 1, duration: 0.7, delay: 0.2, ease: 'power3.out' }
          )
        }
      }
    }, container)

    return () => ctx.revert()
  }, [isStandalone])

  return (
    <>
      <ChapterSection id="resume" className="bg-bg text-text">
        <div ref={containerRef} className="mx-auto flex h-full max-w-7xl items-center w-full relative pt-24 md:pt-12">

          {/* Background bloom */}
          <div className="absolute left-1/3 top-1/4 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="w-full flex flex-col pt-12 md:pt-20 relative z-10">

            {/* HEADER */}
            <div ref={headerRef} className="max-w-4xl px-4 md:px-0">
              <p className="mb-4 text-xs font-semibold tracking-widest uppercase text-muted">
                Chapter 07
              </p>
              <MaskedTextReveal
                as="h2"
                text="My professional story, one page."
                className="font-display text-2xl sm:text-4xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-tightest mb-4 text-text"
                mode="trigger"
                split="lines"
              />
              <p className="max-w-2xl mt-4 text-base md:text-xl text-muted leading-relaxed">
                A concise overview of experience, education, and technical skills —
                available for viewing right here.
              </p>
            </div>

            {/* RESUME CARD */}
            <div
              ref={cardRef}
              className="mt-8 md:mt-20 w-full max-w-2xl pb-12 md:pb-0 px-4 md:px-0"
            >
              <div className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 p-8 md:p-10 card-hover-lift will-change-transform">
                {/* Accent gradient stripe at top */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon + Info */}
                <div className="flex items-start gap-5 mb-6">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-bg border border-border/30 group-hover:bg-accent-blue/10 transition-colors duration-500">
                    <FiFileText className="h-6 w-6 text-muted group-hover:text-accent-blue transition-colors duration-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-text leading-snug mb-1">
                      Neev Patel — Resume
                    </h3>
                    <p className="text-sm text-muted">
                      PDF Document • Updated 2025
                    </p>
                  </div>
                </div>

                <p className="text-[15px] text-muted leading-relaxed mb-8">
                  View my full resume including work experience, education,
                  technical proficiencies, and notable achievements — all in one page.
                </p>

                {/* Divider */}
                <div className="h-px w-full bg-border/50 mb-6 group-hover:bg-accent-blue/20 transition-colors duration-500" />

                {/* View Button — NO download, only opens modal */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setShowPDF(true)}
                    id="resume-view-btn"
                    className="inline-flex items-center gap-2.5 rounded-full bg-text px-7 py-3 text-sm font-medium text-bg transition-all duration-300 hover:opacity-80 hover:scale-[1.03] hover:shadow-lg active:scale-[0.98]"
                  >
                    <FiEye className="h-4 w-4" />
                    View Resume
                  </button>
                  <a
                    href={RESUME_DOWNLOAD}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full border border-border/60 px-7 py-3 text-sm font-medium text-text transition-all duration-300 hover:bg-border/20 hover:scale-[1.03] active:scale-[0.98]"
                  >
                    <FiDownload className="h-4 w-4" />
                    Download PDF
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </ChapterSection>

      {/* PDF Viewer Modal */}
      {showPDF && (
        <PDFViewerModal onClose={() => setShowPDF(false)} />
      )}
    </>
  )
}
