import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useActiveSection } from '../hooks/useActiveSection.js'

export default function Section({
  id,
  children,
  className = '',
  threshold = 0.55,
  rootMargin = '0px 0px -25% 0px',
}) {
  const { markActive } = useActiveSection()
  const { ref, inView } = useInView({ threshold, rootMargin })

  useEffect(() => {
    if (inView) markActive(id)
  }, [id, inView, markActive])

  return (
    <section id={id} ref={ref} className={className}>
      {children}
    </section>
  )
}

