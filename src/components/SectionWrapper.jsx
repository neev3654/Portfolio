import { forwardRef } from 'react'

const SectionWrapper = forwardRef(function SectionWrapper(
  { id, className = '', children },
  ref,
) {
  return (
    <section
      id={id}
      ref={ref}
      className={`relative min-h-screen flex items-center py-16 md:py-24 ${className}`}
    >
      <div className="w-full max-w-6xl mx-auto px-5 md:px-8">{children}</div>
    </section>
  )
})

export default SectionWrapper

