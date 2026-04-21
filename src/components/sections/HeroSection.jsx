import aboutData from '../../data/about.json'
import ChemiflowWordmark from '../common/ChemiflowWordmark'

function scrollTo(href) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function HeroSection() {
  const { hero, meta, stats } = aboutData
  const h1Lines = hero?.h1Lines ?? ['We film', 'the <em>reaction</em>', 'between things.']

  return (
    <section
      id="hero"
      className="relative min-h-screen max-w-[1480px] mx-auto pt-[160px] pb-[120px] px-6 md:px-12 flex flex-col items-center justify-center text-center"
    >
      {/* 메인 타이틀 로고 */}
      <ChemiflowWordmark className="text-[clamp(64px,13vw,180px)] mb-14 md:mb-20" />

      {/* 보조 카피 컬럼 */}
      <div className="copy max-w-[640px]">
        <p className="hero-eyebrow inline-flex items-center gap-3 text-[12px] tracking-[0.12em] uppercase text-navy-65 mb-6">
          <span className="inline-block w-5 h-px bg-lavender" aria-hidden="true" />
          {hero?.eyebrow ?? 'Chemiflow · Film & performance studio · Seoul'}
          <span className="inline-block w-5 h-px bg-lavender" aria-hidden="true" />
        </p>

        <div className="display-lines mb-8">
          <h1
            aria-label="We film the reaction between things."
            className="!text-[clamp(28px,3.6vw,44px)]"
          >
            {h1Lines.map((line, i) => (
              <span key={i} className="line">
                <span dangerouslySetInnerHTML={{ __html: line }} />
              </span>
            ))}
          </h1>
        </div>

        <p
          className="hero-deck text-[17px] leading-[1.6] text-navy-65 mx-auto max-w-[52ch] mb-12 [&>b]:text-navy [&>b]:font-medium"
          dangerouslySetInnerHTML={{ __html: hero?.deck ?? '' }}
        />

        <dl className="hero-meta grid grid-cols-3 gap-6 md:gap-10 pt-7 border-t border-hairline max-w-[560px] mx-auto text-left">
          <div>
            <dt className="text-[10.5px] tracking-[0.1em] uppercase text-navy-45">Est.</dt>
            <dd className="text-[15px] font-medium text-navy mt-1">{meta?.est ?? 'Seoul · 2022'}</dd>
          </div>
          <div>
            <dt className="text-[10.5px] tracking-[0.1em] uppercase text-navy-45">Works</dt>
            <dd className="text-[15px] font-medium text-navy mt-1">{stats?.totalWorks ?? '80+'} filmed</dd>
          </div>
          <div>
            <dt className="text-[10.5px] tracking-[0.1em] uppercase text-navy-45">Now booking</dt>
            <dd className="text-[15px] font-medium text-navy mt-1">{meta?.booking ?? 'Q3 · 2026'}</dd>
          </div>
        </dl>
      </div>

      {/* 스크롤 큐 */}
      <button
        type="button"
        onClick={() => scrollTo('#promo-video')}
        aria-label="Scroll to Work · Film"
        className="hero-scroll absolute left-1/2 bottom-7 -translate-x-1/2 flex flex-col items-center gap-2.5 text-[10px] tracking-[0.14em] uppercase text-navy-45 hover:text-navy transition-colors"
      >
        <span>Scroll</span>
        <span className="relative w-px h-8 overflow-hidden bg-gradient-to-b from-navy-45 to-transparent">
          <span className="hero-scroll-tick absolute -top-4 left-0 w-px h-4 bg-navy" />
        </span>
        <span>01 / 04</span>
      </button>
    </section>
  )
}
