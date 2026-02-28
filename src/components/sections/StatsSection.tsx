import React from 'react'
import { useTranslation } from 'react-i18next'
import AnimatedCounter from '../ui/AnimatedCounter'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { stats } from '../../data/siteData'
import styles from './StatsSection.module.css'

export const StatsSection: React.FC = () => {
  const { t } = useTranslation('stats')
  const headerRef = useScrollAnimation({ y: 40, stagger: 0 })
  const gridRef = useScrollAnimation({ y: 50, stagger: 0.1 })

  return (
    <section className={`section ${styles.stats}`} id="stats">
      <div className="container">
        <div className={styles.header} ref={headerRef as React.RefObject<HTMLDivElement>}>
          <span className="accent-line" />
          <h2>{t('headline')}</h2>
          <p className={styles.subline}>{t('subline')}</p>
        </div>

        <div className={styles.grid} ref={gridRef as React.RefObject<HTMLDivElement>}>
          {stats.map(stat => (
            <AnimatedCounter
              key={stat.labelKey}
              value={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix}
              label={t(stat.labelKey)}
              source={t(stat.sourceKey)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
