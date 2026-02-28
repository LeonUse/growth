import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import styles from './HeroSection.module.css'

export const HeroSection: React.FC = () => {
  const { t } = useTranslation('hero')
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(bgRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 })
      .fromTo(headlineRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=1')
      .fromTo(subRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.7')
      .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.6')
  }, [])

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={styles.hero} id="hero">
      {/* Animated background */}
      <div className={styles.bg} ref={bgRef}>
        <div className={styles.bgGlow1} />
        <div className={styles.bgGlow2} />
        <div className={styles.bgGrid} />
      </div>

      <div className={`container ${styles.content}`}>
        <Badge>{t('badge')}</Badge>

        <h1 className={styles.headline} ref={headlineRef}>
          {t('headline')}
        </h1>

        <p className={styles.subline} ref={subRef}>
          {t('subline')}
        </p>

        <div className={styles.cta} ref={ctaRef}>
          <Button variant="primary" size="lg" onClick={scrollToContact}>
            {t('cta')}
          </Button>
          <Button variant="secondary" size="lg" onClick={scrollToServices}>
            {t('ctaSecondary')}
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <span className={styles.scrollLine} />
        <span className={styles.scrollText}>{t('scrollHint')}</span>
      </div>
    </section>
  )
}

export default HeroSection
