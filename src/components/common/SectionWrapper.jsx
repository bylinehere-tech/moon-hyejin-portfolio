import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function SectionWrapper({ id, children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <section id={id} ref={ref} className={`section-padding relative ${className}`}>
      <span
        aria-hidden="true"
        className="absolute top-0 left-6 right-6 md:left-12 md:right-12 h-px bg-hairline"
      />
      <motion.div
        className="container-max"
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </section>
  )
}
