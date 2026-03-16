import { useState, useMemo, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useActiveSection } from '../hooks/useActiveSection.js'

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
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const gradientRef = useRef(null)
  const descRef = useRef(null)
  const formRef = useRef(null)
  const footerRef = useRef(null)
  const { markActive } = useActiveSection()

  const initial = useMemo(() => ({ name: '', email: '', message: '' }), [])
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Navbar tracking
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom bottom',
        onEnter: () => markActive('contact'),
        onEnterBack: () => markActive('contact'),
      })

      // Headline dramatic entrance
      const headlineTl = gsap.timeline({
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      headlineTl
        .fromTo(headlineRef.current,
          { y: 80, opacity: 0, scale: 0.9, filter: 'blur(6px)' },
          { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out' }
        )
        .fromTo(gradientRef.current,
          { y: 50, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power4.out' },
          '-=0.7'
        )
        .fromTo(descRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )

      // Form — slide up + perspective tilt
      gsap.fromTo(formRef.current,
        { y: 80, opacity: 0, rotateX: -15, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Footer stagger
      if (footerRef.current) {
        gsap.from(footerRef.current.children, {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [markActive])

  const onSubmit = (e) => {
    e.preventDefault()
    setStatus('success')
    setForm(initial)
    window.setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <section id="contact" ref={sectionRef} className="relative w-full bg-bg text-text">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-24 md:py-32">

        <div className="w-full grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* CTA */}
          <div className="flex flex-col will-change-transform">
            <p className="mb-6 text-xs font-semibold tracking-widest uppercase text-muted">
              Chapter 04 · Finale
            </p>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-medium leading-[0.95] tracking-tightest mb-2 text-text">
              <span ref={headlineRef} className="block" style={{ opacity: 0 }}>Let's Build</span>
              <span ref={gradientRef} className="block text-gradient" style={{ opacity: 0 }}>Something Great.</span>
            </h2>
            <p ref={descRef} className="max-w-xl mt-6 text-lg md:text-xl text-[#86868b] leading-relaxed" style={{ opacity: 0 }}>
              If you're launching a product, refining a UI, or scaling a system,
              I'd love to help. Send a message and I'll respond within 24 hours.
            </p>
          </div>

          {/* Form */}
          <div
            ref={formRef}
            className="bg-card rounded-[32px] p-8 md:p-10 border border-black/5 shadow-2xl relative overflow-hidden will-change-transform"
            style={{ opacity: 0, perspective: '1000px' }}
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
                  className="w-full sm:w-auto h-14 px-8 rounded-full bg-[#1d1d1f] text-white font-medium text-[15px] hover:bg-black hover:scale-[1.04] active:scale-95 transition-all duration-300 flex items-center justify-center shadow-lg shadow-black/10"
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

        {/* Footer */}
        <div ref={footerRef} className="w-full mt-24 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8 pb-8 text-sm">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="font-display text-xl font-semibold tracking-tight text-text">Neev Patel.</div>
            <div className="mt-2 text-[#86868b]">Full Stack Developer <span className="hidden md:inline"> · </span> Cinematic product experiences</div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <a className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 hover:bg-white/10 hover:text-white hover:scale-105 transition-all duration-300 text-[#86868b]" href="https://github.com/yourname" target="_blank" rel="noreferrer">GitHub</a>
            <a className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 hover:bg-white/10 hover:text-white hover:scale-105 transition-all duration-300 text-[#86868b]" href="https://linkedin.com/in/yourname" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 hover:bg-white/10 hover:text-white hover:scale-105 transition-all duration-300 text-[#86868b]" href="mailto:you@domain.com">Email</a>
          </div>
        </div>
      </div>
    </section>
  )
}
