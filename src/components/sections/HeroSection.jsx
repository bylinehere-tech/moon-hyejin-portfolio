import { motion } from 'framer-motion'
import aboutData from '../../data/about.json'

function scrollTo(href) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: 'easeOut' },
})

export default function HeroSection() {
  const hasVideo = Boolean(aboutData.heroVideoUrl)

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 배경: 영상 또는 그라데이션 플레이스홀더 */}
      {hasVideo ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={aboutData.heroVideoUrl}
          autoPlay
          muted
          loop
          playsInline
          poster=""
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-[#0f0c1a] to-[#13111E]">
          {/* 미묘한 그레인 텍스처 */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>
      )}

      {/* 오버레이 그라디언트 */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-bg-primary/30" />

      {/* 텍스트 컨텐츠 */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">

        <motion.p
          {...fadeUp(0.2)}
          className="text-accent text-sm tracking-[0.3em] uppercase mb-6 font-pretendard"
        >
          공연예술 영상감독
        </motion.p>

        <motion.h1
          {...fadeUp(0.4)}
          className="font-display text-hero font-black text-text-primary mb-6 leading-none"
        >
          문혜진
        </motion.h1>

        <motion.p
          {...fadeUp(0.6)}
          className="text-text-secondary text-lg md:text-xl mb-12 font-pretendard tracking-wide"
        >
          {aboutData.positioning}
        </motion.p>

        <motion.div
          {...fadeUp(0.8)}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => scrollTo('#promo-video')}
            className="px-8 py-3.5 border border-text-primary/40 text-text-primary hover:border-accent hover:text-accent text-sm tracking-widest transition-all duration-300"
          >
            작품 보기
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="px-8 py-3.5 bg-accent hover:bg-accent-hover text-bg-primary font-semibold text-sm tracking-widest transition-colors duration-300"
          >
            프로젝트 문의
          </button>
        </motion.div>
      </div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="text-xs text-text-secondary tracking-widest">SCROLL</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-text-secondary to-transparent"
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
