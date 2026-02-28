import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../ui/LanguageSwitcher'
import Button from '../ui/Button'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { key: 'nav.why',        href: '#stats' },
  { key: 'nav.industries', href: '#industries' },
  { key: 'nav.services',   href: '#services' },
  { key: 'nav.portfolio',  href: '#portfolio' },
  { key: 'nav.about',      href: '#trust' },
  { key: 'nav.faq',        href: '#faq' },
]

export const Navbar: React.FC = () => {
  const { t } = useTranslation('common')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header className={[styles.navbar, scrolled ? styles['navbar--scrolled'] : ''].filter(Boolean).join(' ')}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <a href="#" className={styles.logo} onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <span className="text-gradient">Vitrin</span>
        </a>

        {/* Desktop nav */}
        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_LINKS.map(link => (
            <a
              key={link.key}
              href={link.href}
              className={styles.navLink}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {t(link.key)}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className={styles.actions}>
          <LanguageSwitcher />
          <Button variant="primary" size="sm" as="a" href="#contact" onClick={(e: React.MouseEvent<HTMLButtonElement>) => { const anc = e.target as HTMLAnchorElement; anc.blur?.() }}>
            {t('nav.cta')}
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          <span className={[styles.bar, menuOpen ? styles['bar--top-open'] : ''].filter(Boolean).join(' ')} />
          <span className={[styles.bar, menuOpen ? styles['bar--mid-open'] : ''].filter(Boolean).join(' ')} />
          <span className={[styles.bar, menuOpen ? styles['bar--bot-open'] : ''].filter(Boolean).join(' ')} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map(link => (
            <a
              key={link.key}
              href={link.href}
              className={styles.mobileLink}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {t(link.key)}
            </a>
          ))}
          <div className={styles.mobileActions}>
            <LanguageSwitcher />
            <Button variant="primary" size="md" as="a" href="#contact">
              {t('nav.cta')}
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
