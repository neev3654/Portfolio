import { useState, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import ChapterSection from './ChapterSection.jsx'
import { useTextReveal } from '../hooks/useTextReveal.js'
import { fadeUp, easeOutQuart } from '../utils/animations.js'

function Field({ label, children }) {
  return (
    <label className="grid gap-2 text-[15px] font-medium text-text">
      {label}
      {children}
    </label>
  )
}

export default function Contact() {
  const prefersReducedMotion = useReducedMotion()
  const headingRef = useTextReveal({ stagger: 0.05, scrub: false, triggerStart: 'top 75%' })
  
  const initial = useMemo(() => ({ name: '', email: '', message: '' }), [])
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState('idle')

  const onSubmit = (e) => {
    e.preventDefault()
    setStatus('success')
    setForm(initial)
    window.setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <ChapterSection id="contact" className="bg-bg text-text min-h-[100svh]">
      {({ progress }) => (
        <div className="mx-auto flex h-full max-w-7xl items-center px-6 md:px-10 lg:px-16 w-full relative z-10 pt-20">
          <div className="w-full grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Massive CTA */}
            <div className="flex flex-col">
              <p className="mb-6 text-xs font-semibold tracking-widest uppercase text-muted">
                Chapter 04 · Finale
              </p>
              <h2
                ref={headingRef}
                className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-medium leading-[0.95] tracking-tightest mb-8 text-text"
              >
                Let&apos;s Build Something <span className="text-gradient inline-block">Great.</span>
              </h2>
              <p className="max-w-xl text-xl text-[#86868b] leading-relaxed">
                If you’re launching a product, refining a UI, or scaling a system,
                I’d love to help. Send a message and I’ll respond within 24 hours.
              </p>
            </div>

            {/* Form */}
            <motion.div
              variants={fadeUp}
              initial={prefersReducedMotion ? 'show' : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: easeOutQuart, delay: 0.2 }}
              className="bg-card rounded-[32px] p-8 md:p-10 border border-black/5 shadow-2xl shadow-black-[0.02] relative overflow-hidden"
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

                  <motion.div
                    initial={false}
                    animate={status === 'success' ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, ease: easeOutQuart }}
                    className="text-sm font-semibold text-accent-blue"
                  >
                    Received. Thank you.
                  </motion.div>
                </div>
              </form>
            </motion.div>

          </div>
        </div>
      )}
    </ChapterSection>
  )
}
