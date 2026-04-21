import Navbar          from './components/common/Navbar'
import FloatingCTA     from './components/common/FloatingCTA'
import BackgroundGrid  from './components/common/BackgroundGrid'
import LiveTicker      from './components/common/LiveTicker'

import HeroSection        from './components/sections/HeroSection'
import PromoVideoSection  from './components/sections/PromoVideoSection'
import StageVideoSection  from './components/sections/StageVideoSection'
import AboutSection       from './components/sections/AboutSection'
import ClientsSection     from './components/sections/ClientsSection'
import ContactSection     from './components/sections/ContactSection'

/*
 * z-index contract
 *   0   BackgroundGrid (fixed)
 *   10  main / LiveTicker (in flow)
 *   40  FloatingCTA (fixed, mobile only)
 *   50  Navbar (fixed)
 *   90  StageVideoSection ExpandedView modal
 *   100 YouTubeLightbox
 */
export default function App() {
  return (
    <div className="relative bg-cream text-navy font-pretendard">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10">
        <HeroSection />
        <PromoVideoSection />
        <StageVideoSection />
        <AboutSection />
        <ClientsSection />
        <ContactSection />
      </main>

      <LiveTicker />
      <FloatingCTA />
    </div>
  )
}
