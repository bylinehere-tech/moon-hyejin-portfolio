// 6-blade aperture wedge path (starts at top, clockwise)
function polar(cx, cy, r, angleDeg) {
  const rad = (angleDeg - 90) * Math.PI / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}
function wedge(r, startDeg, endDeg) {
  const a = polar(0, 0, r, startDeg)
  const b = polar(0, 0, r, endDeg)
  return `M 0 0 L ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${r} ${r} 0 0 1 ${b.x.toFixed(2)} ${b.y.toFixed(2)} Z`
}

const BLADES = Array.from({ length: 6 }, (_, i) => ({
  d:    wedge(46, i * 60, (i + 1) * 60),
  fill: i % 2 === 0 ? '#AFA4CE' : '#282D3C',
}))

function Aperture() {
  return (
    <span
      aria-hidden="true"
      className="aperture-mark inline-block align-baseline"
      style={{ width: '0.64em', height: '0.64em', marginInline: '0.02em', verticalAlign: '-0.08em' }}
    >
      <svg viewBox="-50 -50 100 100" className="w-full h-full overflow-visible">
        <g className="aperture-blades">
          {BLADES.map((b, i) => (
            <path key={i} d={b.d} fill={b.fill} />
          ))}
        </g>
      </svg>
    </span>
  )
}

export default function ChemiflowWordmark({ className = '' }) {
  return (
    <div
      role="img"
      aria-label="Chemiflow"
      className={`chemiflow-title text-navy font-bold tracking-[-0.04em] leading-none select-none ${className}`}
    >
      <span aria-hidden="true">Chemifl</span>
      <Aperture />
      <span aria-hidden="true">w</span>
    </div>
  )
}
