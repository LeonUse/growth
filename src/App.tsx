import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Lenis from 'lenis'
import './i18n'
import './styles/globals.css'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import StatsSection from './components/sections/StatsSection'
import IndustriesSection from './components/sections/IndustriesSection'
import ServicesSection from './components/sections/ServicesSection'
import PortfolioSection from './components/sections/PortfolioSection'
import TrustSection from './components/sections/TrustSection'
import FAQSection from './components/sections/FAQSection'
import ContactSection from './components/sections/ContactSection'
import SnakeLine from './components/ui/SnakeLine'

function App() {
  const { i18n } = useTranslation()

  // Sync <html lang> with i18n language
  useEffect(() => {
    document.documentElement.lang = i18n.language?.startsWith('de') ? 'de' : 'en'
  }, [i18n.language])

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    let raf: number
    const animate = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Navbar />
      <div style={{ position: 'relative' }}>
        <SnakeLine />
        <main>
          <HeroSection />
          <StatsSection />
          <IndustriesSection />
          <ServicesSection />
          <PortfolioSection />
          <TrustSection />
          <FAQSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
