import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  {
    label: 'Work',
    children: [
      { label: 'Film',  href: '#promo-video' },
      { label: 'Stage', href: '#stage-video' },
    ],
  },
  { label: 'Studio',   href: '#about' },
  { label: 'Approach', href: '#clients' },
  { label: 'Contact',  href: '#contact' },
]

function scrollTo(href) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const num = (i) => String(i + 1).padStart(2, '0')

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [workOpen,  setWorkOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleLink = (href) => {
    setMenuOpen(false)
    setWorkOpen(false)
    setTimeout(() => scrollTo(href), 50)
  }

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream/95 backdrop-blur-sm border-b border-hairline' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1480px] mx-auto flex items-center justify-between h-16 px-6 md:px-12">

        {/* 로고 */}
        <button
          onClick={() => scrollTo('#hero')}
          className="flex items-center gap-3 group"
          aria-label="Chemiflow — Back to top"
        >
          <img
            src="/images/logo-trail.svg"
            alt=""
            className="h-6 w-auto transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-[17px] font-bold tracking-[-0.02em] text-navy group-hover:text-lavender transition-colors">
            Chemiflow
          </span>
        </button>

        {/* 데스크톱 메뉴 */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link, i) =>
            link.children ? (
              <div key={link.label} className="relative group">
                <button className="text-[12px] tracking-[0.04em] uppercase text-navy-65 hover:text-navy transition-colors flex items-center gap-1.5">
                  <span className="text-navy-45">{num(i)}</span>
                  <span>· {link.label}</span>
                  <span className="text-[10px]">▾</span>
                </button>
                <div className="absolute top-full left-0 mt-2 w-36 bg-cream border border-hairline opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {link.children.map((child) => (
                    <button
                      key={child.href}
                      onClick={() => handleLink(child.href)}
                      className="block w-full text-left px-4 py-2.5 text-[12px] tracking-[0.04em] uppercase text-navy-65 hover:text-navy hover:bg-angora/40 transition-colors"
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <button
                key={link.href}
                onClick={() => handleLink(link.href)}
                className="text-[12px] tracking-[0.04em] uppercase text-navy-65 hover:text-navy transition-colors inline-flex items-center gap-1.5"
              >
                <span className="text-navy-45">{num(i)}</span>
                <span>· {link.label}</span>
              </button>
            )
          )}

          {/* CTA 버튼 */}
          <button
            onClick={() => handleLink('#contact')}
            className="ml-2 px-4 py-2 bg-navy hover:bg-navy/90 text-cream text-[12px] tracking-[0.04em] uppercase rounded-md transition-colors"
          >
            Start a project →
          </button>
        </nav>

        {/* 모바일 햄버거 */}
        <button
          className="md:hidden text-navy p-1"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* 모바일 드로어 */}
      {menuOpen && (
        <div className="md:hidden bg-cream border-t border-hairline px-6 py-6 flex flex-col gap-1">
          <button
            onClick={() => setWorkOpen((v) => !v)}
            className="text-left py-3 text-[13px] tracking-[0.04em] uppercase text-navy-65 hover:text-navy transition-colors flex justify-between items-center"
          >
            <span><span className="text-navy-45 mr-2">01</span>· Work</span>
            <span className="text-[10px]">{workOpen ? '▲' : '▾'}</span>
          </button>
          {workOpen && (
            <div className="pl-6 flex flex-col gap-1 mb-1">
              <button onClick={() => handleLink('#promo-video')} className="text-left py-2 text-[13px] uppercase tracking-[0.04em] text-navy-65 hover:text-lavender transition-colors">Film</button>
              <button onClick={() => handleLink('#stage-video')} className="text-left py-2 text-[13px] uppercase tracking-[0.04em] text-navy-65 hover:text-lavender transition-colors">Stage</button>
            </div>
          )}
          <button onClick={() => handleLink('#about')}   className="text-left py-3 text-[13px] tracking-[0.04em] uppercase text-navy-65 hover:text-navy transition-colors"><span className="text-navy-45 mr-2">02</span>· Studio</button>
          <button onClick={() => handleLink('#clients')} className="text-left py-3 text-[13px] tracking-[0.04em] uppercase text-navy-65 hover:text-navy transition-colors"><span className="text-navy-45 mr-2">03</span>· Approach</button>
          <button onClick={() => handleLink('#contact')} className="text-left py-3 text-[13px] tracking-[0.04em] uppercase text-navy-65 hover:text-navy transition-colors"><span className="text-navy-45 mr-2">04</span>· Contact</button>
          <button
            onClick={() => handleLink('#contact')}
            className="mt-4 py-3 bg-navy hover:bg-navy/90 text-cream text-[12px] tracking-[0.04em] uppercase rounded-md transition-colors"
          >
            Start a project →
          </button>
        </div>
      )}
    </header>
  )
}
