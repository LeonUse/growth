import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { portfolioItems } from '../../data/siteData'
import styles from './PortfolioSection.module.css'

const FILTERS = ['all', 'gastro', 'retail', 'health', 'services'] as const

export const PortfolioSection: React.FC = () => {
  const { t } = useTranslation('portfolio')
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const headerRef = useScrollAnimation({ y: 40 })
  const gridRef = useScrollAnimation({ y: 50, stagger: 0.1 })

  const filtered = portfolioItems.filter(
    item => activeFilter === 'all' || item.categoryFilter === activeFilter
  )

  return (
    <section className={`section ${styles.portfolio}`} id="portfolio">
      <div className="container">
        <div className={styles.header} ref={headerRef as React.RefObject<HTMLDivElement>}>
          <span className="accent-line" />
          <h2>{t('headline')}</h2>
          <p className={styles.subline}>{t('subline')}</p>
        </div>

        {/* Filter buttons */}
        <div className={styles.filters} role="group" aria-label="Filter by category">
          {FILTERS.map(filter => (
            <button
              key={filter}
              className={[styles.filterBtn, activeFilter === filter ? styles['filterBtn--active'] : ''].filter(Boolean).join(' ')}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
            >
              {t(`filter.${filter}`)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className={styles.grid} ref={gridRef as React.RefObject<HTMLDivElement>}>
          {filtered.map(item => (
            <div key={item.id} className={styles.card} style={{ '--card-color': item.color } as React.CSSProperties}>
              <div className={styles.preview}>
                <span className={styles.emoji}>{item.emoji}</span>
                <div className={styles.overlay}>
                  <span className={styles.comingSoon}>{t('comingSoon')}</span>
                </div>
              </div>
              <div className={styles.info}>
                <h3 className={styles.title}>{t(`${item.id}.title`)}</h3>
                <p className={styles.industry}>{t(`${item.id}.industry`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PortfolioSection
