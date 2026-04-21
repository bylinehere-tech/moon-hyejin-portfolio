import { motion, useReducedMotion } from 'framer-motion'

const GRID_STYLE = {
  backgroundImage: [
    'linear-gradient(rgba(40,45,60,0.08) 1px, transparent 1px)',
    'linear-gradient(90deg, rgba(40,45,60,0.08) 1px, transparent 1px)',
  ].join(', '),
  backgroundSize: '96px 96px',
  WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
  maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
}

export default function BackgroundGrid() {
  const reduce = useReducedMotion()
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
      style={GRID_STYLE}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0 : 1.6, delay: reduce ? 0 : 1.6, ease: 'easeOut' }}
    />
  )
}
