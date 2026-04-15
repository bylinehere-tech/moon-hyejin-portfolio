const GENRES = ['전체', '뮤지컬', '연극', '오페라', '콘서트', '국악', '기타']

export default function GenreFilter({ selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {GENRES.map((genre) => (
        <button
          key={genre}
          onClick={() => onChange(genre)}
          className={`px-4 py-1.5 text-sm rounded-full border transition-all duration-200 ${
            selected === genre
              ? 'bg-accent border-accent text-bg-primary font-semibold'
              : 'border-border-custom text-text-secondary hover:border-accent hover:text-accent'
          }`}
        >
          {genre}
        </button>
      ))}
    </div>
  )
}
