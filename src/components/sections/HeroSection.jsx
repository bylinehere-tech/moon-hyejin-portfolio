import aboutData from '../../data/about.json'

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
      className="relative min-h-screen max-w-[1480px] mx-auto pt-[160px] pb-[120px] px-6 md:px-12 grid md:grid-cols-[1.05fr_1fr] gap-16 items-center"
    >
      {/* 좌: 입자 → 곡선 SVG */}
      <div className="mark-stage relative w-full aspect-square max-w-[380px] md:max-w-[640px] mx-auto">
        <svg
          className="hero-symbol w-full h-full overflow-visible"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <line
            className="ghost-line"
            x1="30.91" y1="66.38" x2="67.63" y2="40.67"
            stroke="#282D3C"
            strokeWidth="0.25"
            strokeDasharray="1.5 2.5"
          />
          <path
            className="curve-base"
            d="M 30.91 66.38 Q 29.27 36.61 67.63 40.67"
            fill="none" stroke="#AFA4CE" strokeWidth="1.5" strokeLinecap="round"
          />
          <path
            className="curve-taper"
            d="M 30.91 66.38 Q 29.27 36.61 67.63 40.67"
            fill="none" stroke="#AFA4CE" strokeWidth="3" strokeLinecap="round"
          />
          <g className="p-small">
            <circle cx="30.91" cy="66.38" r="3.5" fill="#282D3C" />
          </g>
          <g className="p-large">
            <circle cx="67.63" cy="40.67" r="7" fill="#AFA4CE" />
          </g>
        </svg>
      </div>

      {/* 우: Copy 컬럼 */}
      <div className="copy max-w-[560px]">
        <p className="hero-eyebrow flex items-center gap-3 text-[12px] tracking-[0.12em] uppercase text-navy-65 mb-6">
          <span className="inline-block w-5 h-px bg-lavender" aria-hidden="true" />
          {hero?.eyebrow ?? 'Chemiflow · Film & performance studio · Seoul'}
        </p>

        <div className="display-lines mb-8">
          <h1 aria-label="We film the reaction between things.">
            {h1Lines.map((line, i) => (
              <span key={i} className="line">
                <span dangerouslySetInnerHTML={{ __html: line }} />
              </span>
            ))}
          </h1>
        </div>

        <p
          className="hero-deck text-[19px] leading-[1.55] text-navy-65 max-w-[48ch] mb-12 [&>b]:text-navy [&>b]:font-medium"
          dangerouslySetInnerHTML={{ __html: hero?.deck ?? '' }}
        />

        <dl className="hero-meta grid grid-cols-3 gap-6 md:gap-10 pt-7 border-t border-hairline max-w-[520px]">
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
