export default function PlaceholderImage({ aspectRatio = '16/9', label = '', className = '' }) {
  const [w, h] = aspectRatio.split('/').map(Number)
  const paddingTop = `${(h / w) * 100}%`

  return (
    <div className={`relative w-full overflow-hidden rounded ${className}`} style={{ paddingTop }}>
      <div className="absolute inset-0 bg-gradient-to-br from-bg-tertiary to-bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border border-border-custom rounded-full flex items-center justify-center mx-auto mb-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-secondary">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          {label && <p className="text-xs text-text-secondary">{label}</p>}
        </div>
      </div>
    </div>
  )
}
