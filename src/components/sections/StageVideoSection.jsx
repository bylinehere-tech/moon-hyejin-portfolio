import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import SectionWrapper   from '../common/SectionWrapper'
import GenreFilter      from '../common/GenreFilter'
import PlaceholderImage from '../common/PlaceholderImage'
import YouTubeLightbox  from '../common/YouTubeLightbox'
import stageData from '../../data/stage-videos.json'

const GENRE_MAP = { 음악극: '기타', 다원예술극: '기타', 무용: '기타', 페스티벌: '기타', 방송: '기타' }
const normalize = (g) => GENRE_MAP[g] || g

function RoleTag({ role }) {
  return (
    <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-navy-65">
      <span className="inline-block w-1.5 h-px bg-lavender" aria-hidden="true" />
      {role}
    </span>
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
      <div className="absolute inset-0 bg-navy/85" onClick={onClose} />
      <motion.div
        className="relative bg-cream border border-hairline rounded-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-navy-65 hover:text-navy transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="relative">
          {stills.length > 0 ? (
            <>
              <img
                src={stills[stillIdx]}
                alt={`${item.title} 스틸 ${stillIdx + 1}`}
                className="w-full aspect-video object-cover rounded-t-xl"
              />
              {stills.length > 1 && (
                <>
                  <button onClick={() => setStillIdx((i) => (i - 1 + stills.length) % stills.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-navy/60 hover:bg-navy/80 rounded-full p-1.5 transition-colors"
                    aria-label="Previous still">
                    <ChevronLeft size={16} className="text-cream" />
                  </button>
                  <button onClick={() => setStillIdx((i) => (i + 1) % stills.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-navy/60 hover:bg-navy/80 rounded-full p-1.5 transition-colors"
                    aria-label="Next still">
                    <ChevronRight size={16} className="text-cream" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                    {stills.map((_, i) => (
                      <button key={i} onClick={() => setStillIdx(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${i === stillIdx ? 'bg-lavender' : 'bg-cream/50'}`}
                        aria-label={`Go to still ${i + 1}`} />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <PlaceholderImage aspectRatio="16/9" label="무대 스틸컷 준비 중" className="rounded-t-xl" />
          )}

          {item.clipUrl && (
            <button
              onClick={() => setLightbox(true)}
              className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-navy hover:bg-navy/90 text-cream text-[11px] tracking-[0.08em] uppercase px-3 py-1.5 rounded-md transition-colors"
            >
              <Play size={12} /> 실황 클립
            </button>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h3 className="text-xl font-medium tracking-[-0.015em] text-navy">{item.title}</h3>
            <span className="text-[12px] tracking-[0.08em] uppercase text-navy-45 shrink-0">{item.year}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-4 border-t border-hairline pt-3">
            <RoleTag role={item.roleType} />
            <span className="text-[10px] tracking-[0.1em] uppercase text-navy-45">
              {normalize(item.genre)}
            </span>
          </div>

          {item.client && (
            <p className="text-[13px] text-navy-65 mb-3">제작 · {item.client}</p>
          )}
          {item.description && (
            <p className="text-[14px] text-navy-65 leading-relaxed">{item.description}</p>
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
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className="group cursor-pointer text-left border-t border-hairline pt-4 transition-[padding] duration-300 hover:pl-4"
      onClick={() => onClick(item)}
    >
      <div className="overflow-hidden mb-4">
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

      <div className="flex items-center justify-between gap-2 mb-2">
        <RoleTag role={item.roleType} />
        <span className="text-[10px] tracking-[0.08em] uppercase text-navy-45">
          {item.year}
        </span>
      </div>
      <h3 className="text-[16px] font-medium tracking-[-0.015em] text-navy group-hover:text-lavender transition-colors leading-snug mb-1">
        {item.title}
      </h3>
      <div className="text-[12px] text-navy-65">
        {normalize(item.genre)}{item.client ? ` · ${item.client}` : ''}
      </div>
    </motion.button>
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
    <SectionWrapper id="stage-video">
      <div className="mb-12">
        <p className="text-[11px] tracking-[0.12em] uppercase text-navy-65 mb-6">
          <span className="text-navy font-medium mr-2.5">02</span>Work · Stage
        </p>
        <h2 className="text-h2 font-semibold text-navy max-w-[18ch] mb-4">
          무대영상 디자인 — 프로젝션 & 라이브
        </h2>
        <p className="text-[17px] leading-[1.6] text-navy-65 max-w-[46ch]">
          공연 무대 위 프로젝션·백그라운드·인터랙티브. 무대를 완성하는 영상 디자인.
        </p>
      </div>

      <GenreFilter selected={genre} onChange={(g) => { setGenre(g); setExpanded(false) }} />

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 mb-12"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <StageCard key={item.id} item={item} onClick={setSelected} />
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

      <AnimatePresence>
        {selected && <ExpandedView item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </SectionWrapper>
  )
}
