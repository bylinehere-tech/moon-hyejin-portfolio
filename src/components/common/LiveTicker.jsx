import aboutData from '../../data/about.json'

export default function LiveTicker() {
  const leftLabel  = aboutData.ticker?.leftLabel  ?? 'Studio · now booking Q3 2026'
  const rightLabel = aboutData.ticker?.rightLabel ?? aboutData.contactEmail ?? 'hello@chemiflow.studio'
  const href       = rightLabel?.includes('@') ? `mailto:${rightLabel}` : '#contact'

  return (
    <footer className="relative z-10 border-t border-hairline px-6 md:px-12 py-6 flex flex-wrap gap-3 justify-between items-center text-[11px] tracking-[0.1em] uppercase text-navy-65">
      <span className="inline-flex items-center gap-2.5">
        <span className="live-dot inline-block w-1.5 h-1.5 rounded-full bg-lavender" />
        {leftLabel}
      </span>
      <a
        href={href}
        className="inline-flex items-center gap-1.5 hover:text-navy transition-colors"
      >
        {rightLabel}
        <span aria-hidden="true">· ↗</span>
      </a>
    </footer>
  )
}
