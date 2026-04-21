import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play } from 'lucide-react'
import SectionWrapper from '../common/SectionWrapper'
import GenreFilter    from '../common/GenreFilter'
import YouTubeLightbox from '../common/YouTubeLightbox'
import PlaceholderImage from '../common/PlaceholderImage'
import promoData from '../../data/promo-videos.json'

const GENRE_MAP = { 음악극: '기타', 무용: '기타', 페스티벌: '기타', 방송: '기타' }
const normalize = (g) => GENRE_MAP[g] || g

function VideoCard({ item, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className="group cursor-pointer"
      onClick={() => onClick(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden mb-4">
        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.title}
            loading="lazy"
            className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <PlaceholderImage aspectRatio="16/9" />
        )}

        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 bg-navy/70 flex flex-col items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 border border-lavender rounded-full flex items-center justify-center">
                <Play size={18} className="text-lavender ml-0.5" />
              </div>
              <span className="text-[10px] text-lavender tracking-[0.14em] uppercase">
                {item.youtubeId ? 'Play' : 'Coming soon'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="border-t border-hairline pt-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] tracking-[0.1em] uppercase text-navy-45">
            {normalize(item.genre)}
          </span>
          <span className="text-[10px] tracking-[0.08em] uppercase text-navy-45">
            {item.year}
          </span>
        </div>
        <h3 className="text-[15px] font-medium tracking-[-0.01em] text-navy group-hover:text-lavender transition-colors leading-snug mb-1">
          {item.title}
        </h3>
        {item.client && (
          <p className="text-[12px] text-navy-65">{item.client}</p>
        )}
      </div>
    </motion.div>
  )
}

export default function PromoVideoSection() {
  const [genre,    setGenre]    = useState('전체')
  const [expanded, setExpanded] = useState(false)
  const [lightbox, setLightbox] = useState(null)

  const filtered = useMemo(() => {
    const base = genre === '전체' ? promoData : promoData.filter((v) => normalize(v.genre) === genre)
    return expanded ? base : base.filter((v) => v.featured)
  }, [genre, expanded])

  const allFiltered = useMemo(() => {
    return genre === '전체' ? promoData : promoData.filter((v) => normalize(v.genre) === genre)
  }, [genre])

  const handleCardClick = (item) => {
    if (item.youtubeId) setLightbox(item.youtubeId)
  }

  return (
    <SectionWrapper id="promo-video">
      <div className="mb-12">
        <p className="text-[11px] tracking-[0.12em] uppercase text-navy-65 mb-6">
          <span className="text-navy font-medium mr-2.5">01</span>Work · Film
        </p>
        <h2 className="text-h2 font-semibold text-navy max-w-[18ch] mb-4">
          홍보영상 — 브랜드 & 공연 필름
        </h2>
        <p className="text-[17px] leading-[1.6] text-navy-65 max-w-[46ch]">
          공연의 티저·트레일러·브랜드 캠페인. 10년간 축적한 필름 워크를 모았습니다.
        </p>
      </div>

      <GenreFilter selected={genre} onChange={(g) => { setGenre(g); setExpanded(false) }} />

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 mb-12"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <VideoCard key={item.id} item={item} onClick={handleCardClick} />
          ))}
        </AnimatePresence>
      </motion.div>

      {allFiltered.length > allFiltered.filter((v) => v.featured).length && (
        <div>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase text-navy-65 hover:text-lavender transition-colors"
          >
            {expanded ? '← Collapse' : `View all (${allFiltered.length}) →`}
          </button>
        </div>
      )}

      {lightbox && (
        <YouTubeLightbox videoId={lightbox} onClose={() => setLightbox(null)} />
      )}
    </SectionWrapper>
  )
}
