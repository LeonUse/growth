import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './LanguageSwitcher.module.css'

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation()
  const currentLang = i18n.language?.startsWith('de') ? 'de' : 'en'

  const switchTo = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  return (
    <div className={styles.switcher} role="group" aria-label="Language selection">
      <button
        className={[styles.btn, currentLang === 'de' ? styles['btn--active'] : ''].filter(Boolean).join(' ')}
        onClick={() => switchTo('de')}
        aria-pressed={currentLang === 'de'}
        lang="de"
      >
        DE
      </button>
      <span className={styles.divider} aria-hidden="true">·</span>
      <button
        className={[styles.btn, currentLang === 'en' ? styles['btn--active'] : ''].filter(Boolean).join(' ')}
        onClick={() => switchTo('en')}
        aria-pressed={currentLang === 'en'}
        lang="en"
      >
        EN
      </button>
    </div>
  )
}

export default LanguageSwitcher
