import { motion } from 'framer-motion'
import DepthSection from './DepthSection.jsx'
import { skillCategories } from '../data/skills.js'
import { stagger } from '../utils/animations.js'
import { useTextReveal } from '../hooks/useTextReveal.js'

export default function Skills() {
  const headingRef = useTextReveal({ stagger: 0.03, triggerStart: 'top 85%' })

  return (
    <DepthSection id="skills" index={2} className="bg-bg text-text">
      {({ progress }) => {
        return (
          <div className="mx-auto flex h-full max-w-7xl items-center px-6 md:px-10 lg:px-16 w-full relative">
            
            {/* BACKGROUND LAYER */}
            <motion.div 
              className="absolute left-1/4 top-1/4 w-[600px] h-[600px] bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none"
            />

            <div className="w-full flex flex-col pt-20">
              
              {/* CONTENT LAYER - HEADER */}
              <motion.div 
                className="max-w-4xl"
              >
                <p className="mb-4 text-xs font-semibold tracking-widest uppercase text-muted">
                  Chapter 02
                </p>
                <h2
                  ref={headingRef}
                  className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-tightest mb-6 text-text"
                >
                  Tools of the trade, mastered for production.
                </h2>
                <p className="max-w-2xl mt-8 text-xl text-[#86868b] leading-relaxed">
                  A lean stack built for velocity—frontends that feel cinematic and
                  backends that stay stable under real traffic.
                </p>
              </motion.div>

              {/* FOREGROUND LAYER - GRID */}
              <motion.div
                variants={stagger(0.06, 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="mt-24 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl"
              >
                {skillCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 },
                    }}
                    className="group relative overflow-hidden rounded-2xl bg-white/5 p-8 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-blue/20 text-accent-blue">
                        <category.Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold tracking-widest uppercase text-muted">
                          {category.category}
                        </p>
                        <h3 className="text-lg font-semibold text-text">
                          {category.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-block rounded-full bg-white/10 px-3 py-1 text-sm text-text/80"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

            </div>
          </div>
        )
      }}
    </DepthSection>
  )
}
