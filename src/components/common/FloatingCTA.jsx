export default function FloatingCTA() {
  const handleClick = () => {
    const el = document.querySelector('#contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center z-40 md:hidden">
      <button
        onClick={handleClick}
        className="px-6 py-3 bg-accent hover:bg-accent-hover text-bg-primary font-semibold text-sm rounded-full shadow-lg transition-colors"
      >
        프로젝트 문의
      </button>
    </div>
  )
}
