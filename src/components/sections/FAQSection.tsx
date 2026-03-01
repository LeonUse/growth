import React from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import Accordion from '../ui/Accordion'
import { faqItems } from '../../data/siteData'
import styles from './FAQSection.module.css'

export const FAQSection: React.FC = () => {
  const { t } = useTranslation('faq')
  const headerRef = useScrollAnimation({ y: 40 })
  const contentRef = useScrollAnimation({ y: 30 })

  const items = faqItems.map(item => ({
    id: item.questionKey,
    question: t(item.questionKey),
    answer: t(item.answerKey),
  }))

  return (
    <section className={`section ${styles.faq}`} id="faq">
      <div className={styles.bg}>
        <div className={styles.bgGrid} />
      </div>

      <div className="container">
        <div className={styles.header} ref={headerRef as React.RefObject<HTMLDivElement>}>
          <span className="accent-line" />
          <h2>{t('headline')}</h2>
          <p className={styles.subline}>{t('subline')}</p>
        </div>

        <div className={styles.content} ref={contentRef as React.RefObject<HTMLDivElement>}>
          <Accordion items={items} />
        </div>
      </div>
    </section>
  )
}

export default FAQSection
