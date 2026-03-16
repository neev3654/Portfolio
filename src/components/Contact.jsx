import { useState, useMemo, useEffect, useRef } from 'react'
import ChapterSection from './ChapterSection.jsx'
import MaskedTextReveal from './MaskedTextReveal.jsx'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePinnedContainer } from '../hooks/usePinnedContainer.js'

gsap.registerPlugin(ScrollTrigger)

function Field({ label, children }) {
  return (
    <label className="grid gap-2 text-[15px] font-medium text-text">
      {label}
      {children}
    </label>
  )
}

export default function Contact() {
  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const formRef = useRef(null)
  const pinnedContainerRef = usePinnedContainer()
  
  const initial = useMemo(() => ({ name: '', email: '', message: '' }), [])
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pinnedContainer = pinnedContainerRef?.current

      // Content Reveal
      gsap.from(contentRef.current.children, {
        x: -40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 85%',
          pinnedContainer: pinnedContainer,
        }
      })

      // Form Fade Up
      gsap.from(formRef.current, {
        y: 60,
        opacity: 0,
        rotateX: -10,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 90%',
          pinnedContainer: pinnedContainer,
        }
      })
    })

    return () => ctx.revert()
  }, [pinnedContainerRef])

  const onSubmit = (e) => {
    e.preventDefault()
    setStatus('success')
    setForm(initial)
    window.setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <ChapterSection id="contact" className="bg-bg text-text min-h-[100svh]">
      <div ref={containerRef} className="mx-auto flex h-full max-w-7xl items-center w-full relative z-10 pt-20">
        <div className="w-full grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Massive CTA */}
          <div ref={contentRef} className="flex flex-col will-change-transform">
            <p className="mb-6 text-xs font-semibold tracking-widest uppercase text-muted">
              Chapter 04 · Finale
            </p>
            <h2 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-medium leading-[0.95] tracking-tightest mb-8 text-text flex items-center flex-wrap gap-x-[1rem]">
              <MaskedTextReveal as="span" text="Let's Build Something" className="inline-flex flex-wrap" delay={0} />
              <MaskedTextReveal as="span" text="Great." className="text-gradient inline-block" delay={0.4} />
            </h2>
            <p className="max-w-xl text-xl text-[#86868b] leading-relaxed">
              If you’re launching a product, refining a UI, or scaling a system,
              I’d love to help. Send a message and I’ll respond within 24 hours.
            </p>
          </div>

          {/* Form */}
          <div
            ref={formRef}
            className="bg-card rounded-[32px] p-8 md:p-10 border border-black/5 shadow-2xl shadow-black-[0.02] relative overflow-hidden will-change-composite"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-blue to-accent-purple" />
            
            <form onSubmit={onSubmit} className="grid gap-6">
              <Field label="Name">
                <input
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  required
                  className="h-14 rounded-[16px] bg-white px-5 text-base text-text outline-none border border-black/5 focus:border-accent-blue/50 focus:ring-4 focus:ring-accent-blue/10 transition-all placeholder:text-muted/60"
                  placeholder="Jane Doe"
                />
              </Field>

              <Field label="Email">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  required
                  className="h-14 rounded-[16px] bg-white px-5 text-base text-text outline-none border border-black/5 focus:border-accent-blue/50 focus:ring-4 focus:ring-accent-blue/10 transition-all placeholder:text-muted/60"
                  placeholder="jane@example.com"
                />
              </Field>

              <Field label="Message">
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  required
                  rows={4}
                  className="resize-none rounded-[16px] bg-white px-5 py-4 text-base text-text outline-none border border-black/5 focus:border-accent-blue/50 focus:ring-4 focus:ring-accent-blue/10 transition-all placeholder:text-muted/60"
                  placeholder="Tell me about your project..."
                />
              </Field>

              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto h-14 px-8 rounded-full bg-[#1d1d1f] text-white font-medium text-[15px] hover:bg-black hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center shadow-lg shadow-black/10"
                >
                  Send Message
                </button>

                <div
                  className={`text-sm font-semibold text-accent-blue transition-all duration-300 ${status === 'success' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                >
                  Received. Thank you.
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </ChapterSection>
  )
}
