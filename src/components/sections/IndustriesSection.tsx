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

// ── Industry Detail Card (Accordion on small screens) ─────────────────────────

const IndustryDetailCard: React.FC<{
  categoryId: string
  industryId: string
  icon: string
  painPoints: PainPoint[]
  isOpen: boolean
  onToggle: () => void
}> = ({ categoryId, industryId, icon, painPoints, isOpen, onToggle }) => {
  const { t } = useTranslation('industries')

  return (
    <div className={`${styles.detailCard} ${isOpen ? styles.detailCardOpen : ''}`}>
      <div 
        className={styles.detailCardHeader} 
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onToggle()
          }
        }}
        aria-expanded={isOpen}
      >
        <span className={styles.detailIcon}>{icon}</span>
        <div className={styles.detailCardText}>
          <h4 className={styles.detailCardTitle}>{t(`${categoryId}.${industryId}.name`)}</h4>
          <p className={styles.detailCardTagline}>{t(`${categoryId}.${industryId}.tagline`)}</p>
        </div>
        <span className={`${styles.detailCardArrow} ${isOpen ? styles.detailCardArrowOpen : ''}`}>▾</span>
      </div>
      <div className={`${styles.detailPainPointsWrapper} ${isOpen ? styles.detailPainPointsWrapperOpen : ''}`}>
        <div className={styles.detailPainPoints}>
          {painPoints.map((pp, i) => (
            <PainPointRow key={i} painPoint={pp} t={t} />
          ))}
        </div>
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
      <div className={styles.catIconText}>
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
  const [activeIndustryId, setActiveIndustryId] = useState<string | null>(null)
  const headerRef = useScrollAnimation({ y: 40 })

  const activeCategory = industryCategories.find(c => c.id === activeCategoryId) ?? null
  const activeIndex = industryCategories.findIndex(c => c.id === activeCategoryId)

  const orderMobile = activeIndex !== -1 ? activeIndex * 2 + 1 : 99;
  const orderTablet = activeIndex !== -1 ? Math.floor(activeIndex / 2) * 4 + 3 : 99;
  const orderDesktop = 99;

  const handleSelectCategory = (id: string) => {
    setActiveCategoryId(prev => {
      if (prev === id) {
        setActiveIndustryId(null)
        return null
      }
      setActiveIndustryId(null)
      return id
    })
  }

  const handleSelectIndustry = (id: string) => {
    setActiveIndustryId(prev => (prev === id ? null : id))
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

        {/* Level 1: equal-size category cards with dynamically ordered detail panel */}
        <div 
          className={styles.categoryGrid}
          style={{ 
             '--order-mobile': orderMobile,
             '--order-tablet': orderTablet,
             '--order-desktop': orderDesktop,
          } as React.CSSProperties}
        >
          {industryCategories.map((category, index) => (
            <div key={category.id} className={styles.cardWrapper} style={{ order: index * 2 }}>
              <CategoryCard
                category={category}
                isActive={activeCategoryId === category.id}
                onSelect={() => handleSelectCategory(category.id)}
              />
            </div>
          ))}

          {/* Level 2: expanded detail panel, ordered exactly after the current row */}
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
                      isOpen={activeIndustryId === industry.id}
                      onToggle={() => handleSelectIndustry(industry.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
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
