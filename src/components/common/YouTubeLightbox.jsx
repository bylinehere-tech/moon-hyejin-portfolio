import { useEffect } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function YouTubeLightbox({ videoId, onClose }) {
  // ESC 키로 닫기
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // 열릴 때 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* 오버레이 */}
        <div
          className="absolute inset-0 bg-black/90"
          onClick={onClose}
        />

        {/* 컨텐츠 */}
        <motion.div
          className="relative w-full max-w-4xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 text-cream/70 hover:text-cream transition-colors"
            aria-label="Close"
          >
            <X size={28} />
          </button>

          {/* 16:9 iframe 컨테이너 */}
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <iframe
              className="absolute inset-0 w-full h-full rounded"
              src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
