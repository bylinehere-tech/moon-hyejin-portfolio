const GENRES = ['전체', '뮤지컬', '연극', '오페라', '콘서트', '국악', '기타']

export default function GenreFilter({ selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-3 mb-10 border-t border-hairline pt-5">
      {GENRES.map((genre, i) => {
        const active = selected === genre
        return (
          <button
            key={genre}
            onClick={() => onChange(genre)}
            className={`flex items-center gap-2 text-[12px] tracking-[0.04em] uppercase transition-colors pb-1 ${
              active
                ? 'text-navy border-b border-lavender'
                : 'text-navy-65 hover:text-navy border-b border-transparent'
            }`}
          >
            <span className="text-[10px] text-navy-45">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span>{genre}</span>
          </button>
        )
      })}
    </div>
  )
}
