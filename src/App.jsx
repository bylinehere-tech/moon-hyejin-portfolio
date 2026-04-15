import Navbar        from './components/common/Navbar'
import FloatingCTA   from './components/common/FloatingCTA'

import HeroSection        from './components/sections/HeroSection'
import PromoVideoSection  from './components/sections/PromoVideoSection'
import StageVideoSection  from './components/sections/StageVideoSection'
import AboutSection       from './components/sections/AboutSection'
import ClientsSection     from './components/sections/ClientsSection'
import ContactSection     from './components/sections/ContactSection'

export default function App() {
  return (
    <div className="bg-bg-primary text-text-primary font-pretendard">
      <Navbar />

      <main>
        <HeroSection />
        <PromoVideoSection />
        <StageVideoSection />
        <AboutSection />
        <ClientsSection />
        <ContactSection />
      </main>

      <FloatingCTA />
    </div>
  )
}
