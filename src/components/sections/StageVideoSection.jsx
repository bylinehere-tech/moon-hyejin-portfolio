import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, X, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import SectionWrapper   from '../common/SectionWrapper'
import GenreFilter      from '../common/GenreFilter'
import PlaceholderImage from '../common/PlaceholderImage'
import YouTubeLightbox  from '../common/YouTubeLightbox'
import stageData from '../../data/stage-videos.json'

const GENRE_MAP = { 음악극: '기타', 다원예술극: '기타', 무용: '기타', 페스티벌: '기타', 방송: '기타' }
const normalize = (g) => GENRE_MAP[g] || g

const ROLE_COLORS = {
  '프로젝션 디자인':   'bg-accent/10 text-accent border-accent/30',
  '백그라운드 영상':   'bg-accent-sub/10 text-accent-sub border-accent-sub/30',
  '인터랙티브 효과':   'bg-accent/10 text-accent border-accent/30',
  '무대영상 디자인':   'bg-accent-sub/10 text-accent-sub border-accent-sub/30',
}

function RoleTag({ role }) {
  const cls = ROLE_COLORS[role] || 'bg-bg-tertiary text-text-secondary border-border-custom'
  return (
    <span className={`text-xs border px-2 py-0.5 rounded-full ${cls}`}>{role}</span>
  )
}

function ExpandedView({ item, onClose }) {
  const [stillIdx, setStillIdx] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const stills = item.stills?.length ? item.stills : []

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/85" onClick={onClose} />
      <motion.div
        className="relative bg-bg-secondary border border-border-custom rounded-lg w-full max-w-2xl max-h-[85vh] overflow-y-auto"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* 닫기 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-text-secondary hover:text-text-primary transition-colors"
        >
          <X size={20} />
        </button>

        {/* 스틸컷 슬라이더 */}
        <div className="relative">
          {stills.length > 0 ? (
            <>
              <img
                src={stills[stillIdx]}
                alt={`${item.title} 스틸 ${stillIdx + 1}`}
                className="w-full aspect-video object-cover rounded-t-lg"
              />
              {stills.length > 1 && (
                <>
                  <button onClick={() => setStillIdx((i) => (i - 1 + stills.length) % stills.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-1.5 transition-colors">
                    <ChevronLeft size={16} className="text-white" />
                  </button>
                  <button onClick={() => setStillIdx((i) => (i + 1) % stills.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-1.5 transition-colors">
                    <ChevronRight size={16} className="text-white" />
                  </button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {stills.map((_, i) => (
                      <button key={i} onClick={() => setStillIdx(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${i === stillIdx ? 'bg-accent' : 'bg-white/40'}`} />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <PlaceholderImage aspectRatio="16/9" label="무대 스틸컷 준비 중" className="rounded-t-lg" />
          )}

          {/* 실황 클립 버튼 */}
          {item.clipUrl && (
            <button
              onClick={() => setLightbox(true)}
              className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-bg-primary text-xs font-semibold px-3 py-1.5 rounded transition-colors"
            >
              <Play size={12} /> 실황 클립
            </button>
          )}
        </div>

        {/* 상세 정보 */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="font-display text-xl font-bold text-text-primary">{item.title}</h3>
            <span className="text-text-secondary text-sm shrink-0">{item.year}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <RoleTag role={item.roleType} />
            <span className="text-xs border border-border-custom text-text-secondary px-2 py-0.5 rounded-full">
              {normalize(item.genre)}
            </span>
          </div>

          {item.client && (
            <p className="text-text-secondary text-sm mb-3">제작: {item.client}</p>
          )}
          {item.description && (
            <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
          )}
        </div>
      </motion.div>

      {lightbox && (
        <YouTubeLightbox
          videoId={item.clipUrl.replace('https://www.youtube.com/watch?v=', '')}
          onClose={() => setLightbox(false)}
        />
      )}
    </motion.div>
  )
}

function StageCard({ item, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className="group cursor-pointer bg-bg-secondary hover:bg-bg-tertiary border border-border-custom hover:border-accent/30 rounded-lg overflow-hidden transition-all duration-300"
      onClick={() => onClick(item)}
    >
      {/* 썸네일 */}
      <div className="overflow-hidden">
        {item.stills?.[0] ? (
          <img
            src={item.stills[0]}
            alt={item.title}
            loading="lazy"
            className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <PlaceholderImage aspectRatio="16/9" />
        )}
      </div>

      {/* 카드 정보 */}
      <div className="p-4">
        <h3 className="text-text-primary text-sm font-semibold mb-2 group-hover:text-accent transition-colors leading-snug">
          {item.title}
        </h3>
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <RoleTag role={item.roleType} />
        </div>
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <span>{normalize(item.genre)}</span>
          <span>·</span>
          <span>{item.year}</span>
          {item.client && <><span>·</span><span>{item.client}</span></>}
        </div>
      </div>
    </motion.div>
  )
}

export default function StageVideoSection() {
  const [genre,    setGenre]    = useState('전체')
  const [expanded, setExpanded] = useState(false)
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    const base = genre === '전체' ? stageData : stageData.filter((v) => normalize(v.genre) === genre)
    return expanded ? base : base.filter((v) => v.featured)
  }, [genre, expanded])

  const allFiltered = useMemo(
    () => genre === '전체' ? stageData : stageData.filter((v) => normalize(v.genre) === genre),
    [genre]
  )

  return (
    <SectionWrapper id="stage-video" className="bg-bg-secondary">
      {/* 섹션 헤더 */}
      <div className="mb-10">
        <p className="text-accent text-xs tracking-[0.3em] uppercase mb-3">Portfolio</p>
        <h2 className="font-display text-section font-bold text-text-primary">무대영상</h2>
        <p className="text-text-secondary mt-3 text-sm max-w-md">
          공연 무대 위 프로젝션·백그라운드·인터랙티브 효과. 무대를 완성하는 영상 디자인.
        </p>
      </div>

      <GenreFilter selected={genre} onChange={(g) => { setGenre(g); setExpanded(false) }} />

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <StageCard key={item.id} item={item} onClick={setSelected} />
          ))}
        </AnimatePresence>
      </motion.div>

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

      <AnimatePresence>
        {selected && <ExpandedView item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </SectionWrapper>
  )
}
