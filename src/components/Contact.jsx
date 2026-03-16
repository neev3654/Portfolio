import { motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState } from 'react'
import Section from './Section.jsx'
import { easeOutQuart, fadeUp, stagger } from '../utils/animations.js'

function Field({ label, children }) {
  return (
    <label className="grid gap-2 text-sm text-muted">
      <span className="text-xs font-semibold tracking-wide text-muted">
        {label}
      </span>
      {children}
    </label>
  )
}

export default function Contact() {
  const prefersReducedMotion = useReducedMotion()
  const initial = useMemo(() => ({ name: '', email: '', message: '' }), [])
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState('idle') // idle | success

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('Contact form submit:', form)
    setStatus('success')
    setForm(initial)
    window.setTimeout(() => setStatus('idle'), 2400)
  }

  return (
    <Section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-12 md:grid-cols-12 md:items-start">
          <div className="md:col-span-6">
            <h2 className="font-display text-4xl font-semibold leading-tight tracking-tighter2 text-text md:text-5xl">
              Let&apos;s Build Something Great
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              If you’re launching a product, refining a UI, or scaling a system,
              I’d love to help. Send a message and I’ll respond quickly.
            </p>
          </div>

          <div className="md:col-span-6">
            <motion.form
              onSubmit={onSubmit}
              variants={stagger(0.1, 0.05)}
              initial={prefersReducedMotion ? 'show' : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-[28px] border border-border bg-card/20 p-6 md:p-7"
            >
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.7, ease: easeOutQuart }}
                className="grid gap-5"
              >
                <Field label="Name">
                  <input
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    required
                    className="h-12 rounded-2xl border border-border bg-bg/30 px-4 text-sm text-text outline-none transition-colors placeholder:text-muted/70 focus:border-accent/40"
                    placeholder="Your name"
                  />
                </Field>

                <Field label="Email">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    required
                    className="h-12 rounded-2xl border border-border bg-bg/30 px-4 text-sm text-text outline-none transition-colors placeholder:text-muted/70 focus:border-accent/40"
                    placeholder="you@domain.com"
                  />
                </Field>

                <Field label="Message">
                  <textarea
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    required
                    rows={5}
                    className="resize-none rounded-2xl border border-border bg-bg/30 px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-muted/70 focus:border-accent/40"
                    placeholder="Tell me what you're building…"
                  />
                </Field>

                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <motion.button
                    whileHover={prefersReducedMotion ? undefined : { y: -1 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                    transition={{ duration: 0.2, ease: easeOutQuart }}
                    className="inline-flex items-center justify-center rounded-full bg-text px-6 py-3 text-sm font-semibold text-bg hover:shadow-glow"
                    type="submit"
                  >
                    Send message
                  </motion.button>

                  <motion.div
                    aria-live="polite"
                    initial={false}
                    animate={status === 'success' ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                    transition={{ duration: 0.25, ease: easeOutQuart }}
                    className="text-xs font-medium text-accent"
                  >
                    Message sent. Thanks!
                  </motion.div>
                </div>
              </motion.div>
            </motion.form>
          </div>
        </div>
      </div>
    </Section>
  )
}

