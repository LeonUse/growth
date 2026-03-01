import React from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import styles from './TrustSection.module.css'

const PROCESS_STEPS = ['1', '2', '3', '4'] as const

const TECH = [
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'Vite', icon: '⚡' },
  { name: 'GSAP', icon: '🎬' },
  { name: 'i18next', icon: '🌐' },
  { name: 'Go', icon: '🐹' },
]

export const TrustSection: React.FC = () => {
  const { t } = useTranslation('trust')
  const headerRef = useScrollAnimation({ y: 40 })
  const processRef = useScrollAnimation({ y: 40, stagger: 0.12 })
  const testimonials = [
    { key: 't1' as const },
    { key: 't2' as const },
    { key: 't3' as const },
  ]

  return (
    <section className={`section ${styles.trust}`} id="trust">
      <div className="container">
        {/* Header */}
        <div className={styles.header} ref={headerRef as React.RefObject<HTMLDivElement>}>
          <span className="accent-line" />
          <h2>{t('headline')}</h2>
          <p className={styles.subline}>{t('subline')}</p>
        </div>

        {/* Mission */}
        <div className={styles.mission}>
          <h3 className={styles.sectionTitle}>{t('mission')}</h3>
          <p className={styles.missionText}>{t('missionText')}</p>
        </div>

        {/* Process */}
        <div className={styles.processSection}>
          <h3 className={styles.sectionTitle}>{t('process')}</h3>
          <div className={styles.processGrid} ref={processRef as React.RefObject<HTMLDivElement>}>
            {PROCESS_STEPS.map((step, i) => (
              <div key={step} className={styles.step}>
                <div className={styles.stepNumber}>{String(i + 1).padStart(2, '0')}</div>
                <h4 className={styles.stepTitle}>{t(`steps.${step}.title`)}</h4>
                <p className={styles.stepDesc}>{t(`steps.${step}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div className={styles.techSection}>
          <h3 className={styles.sectionTitle}>{t('tech')}</h3>
          <p className={styles.techSubline}>{t('techSubline')}</p>
          <div className={styles.techGrid}>
            {TECH.map(tech => (
              <div key={tech.name} className={styles.techItem}>
                <span className={styles.techIcon}>{tech.icon}</span>
                <span className={styles.techName}>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className={styles.testimonials}>
          <h3 className={styles.sectionTitle}>{t('testimonials')}</h3>
          <div className={styles.testimonialGrid}>
            {testimonials.map(({ key }) => (
              <div key={key} className={styles.testimonial}>
                <p className={styles.testimonialText}>„{t(`${key}.text`)}"</p>
                <div className={styles.testimonialAuthor}>
                  <span className={styles.authorName}>{t(`${key}.name`)}</span>
                  <span className={styles.authorRole}>{t(`${key}.role`)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustSection
