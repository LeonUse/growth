import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import Button from '../ui/Button'
import { industryCategories } from '../../data/siteData'
import type { IndustryCategory, PainPoint } from '../../data/siteData'
import styles from './IndustriesSection.module.css'

// ── Pain Point Row ────────────────────────────────────────────────────────────

const PainPointRow: React.FC<{ painPoint: PainPoint; t: (k: string) => string }> = ({ painPoint, t }) => (
  <div className={styles.painPoint}>
    <p className={styles.problem}>
      <span className={styles.problemIcon}>✗</span>
      {t(painPoint.problemKey)}
    </p>
    <p className={styles.solution}>
      <span className={styles.solutionIcon}>✓</span>
      {t(painPoint.solutionKey)}
    </p>
  </div>
)

// ── Industry Detail Card (shown in expanded panel, all info visible) ───────────

const IndustryDetailCard: React.FC<{
  categoryId: string
  industryId: string
  icon: string
  painPoints: PainPoint[]
}> = ({ categoryId, industryId, icon, painPoints }) => {
  const { t } = useTranslation('industries')

  return (
    <div className={styles.detailCard}>
      <div className={styles.detailCardHeader}>
        <span className={styles.detailIcon}>{icon}</span>
        <div>
          <h4 className={styles.detailCardTitle}>{t(`${categoryId}.${industryId}.name`)}</h4>
          <p className={styles.detailCardTagline}>{t(`${categoryId}.${industryId}.tagline`)}</p>
        </div>
      </div>
      <div className={styles.detailPainPoints}>
        {painPoints.map((pp, i) => (
          <PainPointRow key={i} painPoint={pp} t={t} />
        ))}
      </div>
    </div>
  )
}

// ── Category Card (Level 1) ───────────────────────────────────────────────────

const CategoryCard: React.FC<{
  category: IndustryCategory
  isActive: boolean
  onSelect: () => void
}> = ({ category, isActive, onSelect }) => {
  const { t } = useTranslation('industries')

  return (
    <button
      className={[styles.catCard, isActive ? styles['catCard--active'] : ''].filter(Boolean).join(' ')}
      onClick={onSelect}
      aria-expanded={isActive}
      aria-pressed={isActive}
    >
      <span className={styles.catIcon}>{category.icon}</span>
      <div className={styles.catCardText}>
        <span className={styles.catCardTitle}>{t(`${category.id}.label`)}</span>
        <span className={styles.catCardCount}>
          {category.industries.length} {t('industriesCount')}
        </span>
      </div>
      <span className={[styles.catArrow, isActive ? styles['catArrow--open'] : ''].filter(Boolean).join(' ')}>▾</span>
    </button>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

export const IndustriesSection: React.FC = () => {
  const { t } = useTranslation('industries')
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)
  const headerRef = useScrollAnimation({ y: 40 })

  const activeCategory = industryCategories.find(c => c.id === activeCategoryId) ?? null

  const handleSelect = (id: string) => {
    setActiveCategoryId(prev => (prev === id ? null : id))
  }

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={`section ${styles.industries}`} id="industries">
      <div className="container">
        <div className={styles.header} ref={headerRef as React.RefObject<HTMLDivElement>}>
          <span className="accent-line" />
          <h2>{t('headline')}</h2>
          <p className={styles.subline}>{t('subline')}</p>
        </div>

        {/* Level 1: equal-size category cards */}
        <div className={styles.categoryGrid}>
          {industryCategories.map(category => (
            <CategoryCard
              key={category.id}
              category={category}
              isActive={activeCategoryId === category.id}
              onSelect={() => handleSelect(category.id)}
            />
          ))}
        </div>

        {/* Level 2: expanded detail panel, shown below cards */}
        <div
          className={[styles.detailPanel, activeCategory ? styles['detailPanel--open'] : ''].filter(Boolean).join(' ')}
          aria-hidden={!activeCategory}
        >
          {activeCategory && (
            <div
              className={styles.detailPanelInner}
              style={{ '--industry-count': activeCategory.industries.length } as React.CSSProperties}
            >
              <div className={styles.detailGrid}>
                {activeCategory.industries.map(industry => (
                  <IndustryDetailCard
                    key={industry.id}
                    categoryId={activeCategory.id}
                    industryId={industry.id}
                    icon={industry.icon}
                    painPoints={industry.painPoints}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={styles.bottomCta}>
          <p className={styles.ctaText}>{t('ctaBottom')}</p>
          <Button variant="secondary" size="md" onClick={scrollToContact}>
            {t('ctaBtn')}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default IndustriesSection
