export default function FloatingCTA() {
  const handleClick = () => {
    const el = document.querySelector('#contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center z-40 md:hidden">
      <button
        onClick={handleClick}
        className="px-6 py-3 bg-navy hover:bg-navy/90 text-cream text-[12px] tracking-[0.04em] uppercase rounded-full shadow-lg transition-colors"
      >
        Start a project
      </button>
    </div>
  )
}
