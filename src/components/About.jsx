import { motion, useReducedMotion } from 'framer-motion'
import ChapterSection from './ChapterSection.jsx'
import { useParallaxLayers } from '../hooks/useParallaxLayers.js'
import { useTextReveal } from '../hooks/useTextReveal.js'
import { fadeUp, stagger, easeOutQuart } from '../utils/animations.js'

export default function About() {
  const prefersReducedMotion = useReducedMotion()
  const headingRef = useTextReveal({ stagger: 0.03, yOffset: 60, triggerStart: 'top 90%' })
  const highlightRef = useTextReveal({ stagger: 0.02, delay: 0.2, triggerStart: 'top 80%' })

  return (
    <ChapterSection id="about" className="bg-bg text-text z-10">
      {({ progress }) => {
        // Compute the 3 layer transforms based on the chapter's scroll progress
        const { bgY, contentY, fgY } = useParallaxLayers(progress)

        return (
          <div className="mx-auto flex h-full max-w-7xl items-center px-6 md:px-10 lg:px-16 w-full relative">
            
            {/* BACKGROUND LAYER */}
            <motion.div 
              style={prefersReducedMotion ? undefined : { y: bgY }}
              className="absolute right-0 top-1/4 w-[800px] h-[800px] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div 
              style={prefersReducedMotion ? undefined : { y: bgY }}
              className="absolute left-0 bottom-1/4 w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none"
            />

            <div className="w-full grid md:grid-cols-12 gap-12 md:gap-8 items-center">
              
              {/* CONTENT LAYER */}
              <motion.div 
                style={prefersReducedMotion ? undefined : { y: contentY }}
                className="md:col-span-12 lg:col-span-7"
              >
                <p className="mb-4 text-xs font-semibold tracking-widest uppercase text-muted">
                  Chapter 01
                </p>
                
                <h2 
                  ref={headingRef}
                  className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-tightest mb-8 text-text"
                >
                  I engineer modern web experiences that perform as beautifully as they look.
                </h2>
                
                <motion.div
                  variants={stagger(0.12, 0.3)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  className="grid grid-cols-2 gap-x-8 gap-y-12 mt-16 max-w-2xl"
                >
                  {[
                    { label: 'Frontend', desc: 'React, motion, UI systems' },
                    { label: 'Backend', desc: 'Node, DB design, scaling' },
                    { label: 'Quality', desc: 'Testing, observability, DX' },
                    { label: 'Delivery', desc: 'Ship fast, iterate safely' }
                  ].map(item => (
                    <motion.div key={item.label} variants={fadeUp} transition={{ duration: 0.8, ease: easeOutQuart }}>
                      <div className="text-sm font-semibold text-text mb-2">{item.label}</div>
                      <div className="text-[#86868b] leading-relaxed">{item.desc}</div>
                    </motion.div>
                  ))}
                </motion.div>

              </motion.div>

              {/* FOREGROUND LAYER */}
              <motion.div 
                style={prefersReducedMotion ? undefined : { y: fgY }}
                className="md:col-span-12 lg:col-span-5 relative mt-12 lg:mt-0"
              >
                <div className="bg-card rounded-[32px] p-8 md:p-12 relative overflow-hidden will-change-transform">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 pointer-events-none" />
                  
                  <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-6">
                    Signature
                  </p>
                  
                  <h3 
                    ref={highlightRef}
                    className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-medium leading-[1.1] tracking-tight text-text mb-6"
                  >
                    Minimal surface. <br/>
                    <span className="text-muted">Maximum intent.</span>
                  </h3>
                  
                  <p className="text-[17px] leading-relaxed text-[#86868b]">
                    Every interaction has a purpose. Motion is used to guide,
                    emphasize, and reveal—not to distract. Performance remains
                    non-negotiable.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        )
      }}
    </ChapterSection>
  )
}

