import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Footer.module.css'

const TECH_STACK = ['React', 'TypeScript', 'Vite', 'GSAP', 'i18next']

export const Footer: React.FC = () => {
  const { t } = useTranslation('common')
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className="text-gradient">Vitrin</span>
          </div>
          <p className={styles.tagline}>{t('footer.tagline')}</p>
          <div className={styles.tech}>
            {TECH_STACK.map(tech => (
              <span key={tech} className={styles.techBadge}>{tech}</span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className={styles.links}>
          <p className={styles.linksHeadline}>{t('footer.links')}</p>
          <a href="#" className={styles.link}>{t('footer.imprint')}</a>
          <a href="#" className={styles.link}>{t('footer.privacy')}</a>
          <a href="#" className={styles.link}>{t('footer.terms')}</a>
        </div>

        {/* Social */}
        <div className={styles.links}>
          <p className={styles.linksHeadline}>{t('footer.social')}</p>
          <a href="#" className={styles.link}>LinkedIn</a>
          <a href="#" className={styles.link}>Instagram</a>
          <a href="#" className={styles.link}>GitHub</a>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p className={styles.copyright}>
            {t('footer.copyright', { year })}
          </p>
          <p className={styles.madeWith}>{t('footer.madeWith')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
