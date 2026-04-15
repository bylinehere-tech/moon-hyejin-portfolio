import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, ChevronDown } from 'lucide-react'
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
      {/* 썸네일 */}
      <div className="relative overflow-hidden rounded mb-3">
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

        {/* 호버 오버레이 */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 border-2 border-accent rounded-full flex items-center justify-center">
                <Play size={20} className="text-accent ml-0.5" />
              </div>
              <span className="text-xs text-text-secondary tracking-widest">
                {item.youtubeId ? 'PLAY' : 'COMING SOON'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 카드 정보 */}
      <div>
        <h3 className="text-text-primary text-sm font-semibold leading-snug mb-1.5 group-hover:text-accent transition-colors">
          {item.title}
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-accent border border-accent/40 px-2 py-0.5 rounded-full">
            {normalize(item.genre)}
          </span>
          <span className="text-xs text-text-secondary">{item.year}</span>
          {item.client && <span className="text-xs text-text-secondary">· {item.client}</span>}
        </div>
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
    <SectionWrapper id="promo-video" className="bg-bg-primary">
      {/* 섹션 헤더 */}
      <div className="mb-10">
        <p className="text-accent text-xs tracking-[0.3em] uppercase mb-3">Portfolio</p>
        <h2 className="font-display text-section font-bold text-text-primary">홍보영상</h2>
        <p className="text-text-secondary mt-3 text-sm max-w-md">
          공연의 티저·트레일러·프로모션 영상. 10년간 함께한 작품들을 소개합니다.
        </p>
      </div>

      <GenreFilter selected={genre} onChange={(g) => { setGenre(g); setExpanded(false) }} />

      {/* 그리드 */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <VideoCard key={item.id} item={item} onClick={handleCardClick} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* 더보기 / 접기 */}
      {allFiltered.length > allFiltered.filter((v) => v.featured).length && (
        <div className="flex justify-center">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors border border-border-custom hover:border-accent px-6 py-2.5 rounded"
          >
            {expanded ? '접기' : `전체 보기 (${allFiltered.length}편)`}
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      )}

      {/* 라이트박스 */}
      {lightbox && (
        <YouTubeLightbox videoId={lightbox} onClose={() => setLightbox(null)} />
      )}
    </SectionWrapper>
  )
}
