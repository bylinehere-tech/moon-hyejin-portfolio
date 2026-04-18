import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  {
    label: '작품',
    children: [
      { label: '홍보영상', href: '#promo-video' },
      { label: '무대영상', href: '#stage-video' },
    ],
  },
  { label: '감독 소개', href: '#about' },
  { label: '실적',     href: '#clients' },
  { label: '문의',     href: '#contact' },
]

function scrollTo(href) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [workOpen,  setWorkOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 메뉴 열릴 때 스크롤 잠금
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
        scrolled ? 'bg-bg-primary/95 backdrop-blur-sm border-b border-border-custom' : 'bg-transparent'
      }`}
    >
      <div className="container-max flex items-center justify-between h-16 px-4 md:px-8 lg:px-16">

        {/* 로고 */}
        <button
          onClick={() => scrollTo('#hero')}
          className="flex items-center gap-2.5 group"
          aria-label="Chemiflow — 문혜진 홈으로"
        >
          <img
            src="/images/logo-trail.svg"
            alt=""
            className="h-7 w-auto transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-display italic text-lg font-normal text-text-primary tracking-wide group-hover:text-accent transition-colors">
            Chemiflow
          </span>
        </button>

        {/* 데스크톱 메뉴 */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div key={link.label} className="relative group">
                <button className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1">
                  {link.label}
                  <span className="text-xs">▾</span>
                </button>
                {/* 서브메뉴 */}
                <div className="absolute top-full left-0 mt-2 w-36 bg-bg-secondary border border-border-custom rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {link.children.map((child) => (
                    <button
                      key={child.href}
                      onClick={() => handleLink(child.href)}
                      className="block w-full text-left px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors first:rounded-t last:rounded-b"
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
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.label}
              </button>
            )
          )}

          {/* CTA 버튼 */}
          <button
            onClick={() => handleLink('#contact')}
            className="ml-2 px-4 py-2 bg-accent hover:bg-accent-hover text-bg-primary text-sm font-semibold rounded transition-colors"
          >
            프로젝트 문의
          </button>
        </nav>

        {/* 모바일 햄버거 */}
        <button
          className="md:hidden text-text-primary p-1"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 모바일 드로어 */}
      {menuOpen && (
        <div className="md:hidden bg-bg-primary border-t border-border-custom px-4 py-6 flex flex-col gap-1">
          {/* 작품 서브메뉴 */}
          <button
            onClick={() => setWorkOpen((v) => !v)}
            className="text-left py-3 text-text-secondary hover:text-text-primary transition-colors flex justify-between items-center"
          >
            작품 <span className="text-xs">{workOpen ? '▲' : '▾'}</span>
          </button>
          {workOpen && (
            <div className="pl-4 flex flex-col gap-1 mb-1">
              <button onClick={() => handleLink('#promo-video')} className="text-left py-2 text-sm text-text-secondary hover:text-accent transition-colors">홍보영상</button>
              <button onClick={() => handleLink('#stage-video')} className="text-left py-2 text-sm text-text-secondary hover:text-accent transition-colors">무대영상</button>
            </div>
          )}
          <button onClick={() => handleLink('#about')}   className="text-left py-3 text-text-secondary hover:text-text-primary transition-colors">감독 소개</button>
          <button onClick={() => handleLink('#clients')} className="text-left py-3 text-text-secondary hover:text-text-primary transition-colors">실적</button>
          <button onClick={() => handleLink('#contact')} className="text-left py-3 text-text-secondary hover:text-text-primary transition-colors">문의</button>
          <button
            onClick={() => handleLink('#contact')}
            className="mt-4 py-3 bg-accent hover:bg-accent-hover text-bg-primary font-semibold rounded transition-colors"
          >
            프로젝트 문의
          </button>
        </div>
      )}
    </header>
  )
}
