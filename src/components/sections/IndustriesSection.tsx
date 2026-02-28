import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import Button from '../ui/Button'
import { industryCategories } from '../../data/siteData'
import type { IndustryCategory, PainPoint } from '../../data/siteData'
import styles from './IndustriesSection.module.css'

// ── Sub-component types ───────────────────────────────────────────────────────

interface IndustryCardProps {
  categoryId: string
  industryId: string
  icon: string
  painPoints: PainPoint[]
  isExpanded: boolean
  onToggle: () => void
}


// ── Sub-components ────────────────────────────────────────────────────────────

const PainPointRow: React.FC<{
  painPoint: PainPoint
  categoryId: string
  industryId: string
  t: (key: string) => string
}> = ({ painPoint, categoryId: _c, industryId: _i, t }) => (
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

const IndustryCard: React.FC<IndustryCardProps> = ({
  categoryId,
  industryId,
  icon,
  painPoints,
  isExpanded,
  onToggle,
}) => {
  const { t } = useTranslation('industries')
  const expandedRef = useRef<HTMLDivElement>(null)

  const previewPainPoint = painPoints[0]
  const remainingPainPoints = painPoints.slice(1)
  const hasAdditionalPainPoints = remainingPainPoints.length > 0

  return (
    <div className={[styles.card, isExpanded ? styles['card--expanded'] : ''].filter(Boolean).join(' ')}>
      <div className={styles.cardHeader}>
        <span className={styles.icon}>{icon}</span>
        <div>
          <h4 className={styles.cardTitle}>{t(`${categoryId}.${industryId}.name`)}</h4>
          <p className={styles.cardTagline}>{t(`${categoryId}.${industryId}.tagline`)}</p>
        </div>
      </div>

      {/* Always-visible preview of the first pain point */}
      {previewPainPoint && (
        <div className={styles.previewPainPoint}>
          <PainPointRow
            painPoint={previewPainPoint}
            categoryId={categoryId}
            industryId={industryId}
            t={t}
          />
        </div>
      )}

      {/* Expandable remaining pain points with CSS transition */}
      {hasAdditionalPainPoints && (
        <>
          <div
            ref={expandedRef}
            className={[styles.expandedPainPoints, isExpanded ? styles['expandedPainPoints--open'] : ''].filter(Boolean).join(' ')}
            aria-hidden={!isExpanded}
          >
            <div className={styles.expandedPainPointsInner}>
              {remainingPainPoints.map((pp, index) => (
                <PainPointRow
                  key={index}
                  painPoint={pp}
                  categoryId={categoryId}
                  industryId={industryId}
                  t={t}
                />
              ))}
            </div>
          </div>

          <button
            className={styles.toggleButton}
            onClick={onToggle}
            aria-expanded={isExpanded}
          >
            {isExpanded ? `− ${t('showLess')}` : `+ ${t('showAll')} (${remainingPainPoints.length})`}
          </button>
        </>
      )}
    </div>
  )
}

const CategoryFilter: React.FC<{
  activeCategory: string
  onChange: (id: string) => void
}> = ({ activeCategory, onChange }) => {
  const { t } = useTranslation('industries')

  return (
    <div className={styles.tabs} role="tablist">
      <button
        role="tab"
        aria-selected={activeCategory === 'all'}
        className={[styles.tab, activeCategory === 'all' ? styles['tab--active'] : ''].filter(Boolean).join(' ')}
        onClick={() => onChange('all')}
      >
        {t('allIndustries')}
      </button>
      {industryCategories.map(cat => (
        <button
          key={cat.id}
          role="tab"
          aria-selected={activeCategory === cat.id}
          className={[styles.tab, activeCategory === cat.id ? styles['tab--active'] : ''].filter(Boolean).join(' ')}
          onClick={() => onChange(cat.id)}
        >
          <span>{cat.icon}</span>
          {t(`${cat.id}.label`)}
        </button>
      ))}
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

export const IndustriesSection: React.FC = () => {
  const { t } = useTranslation('industries')
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null)
  const headerRef = useScrollAnimation({ y: 40 })

  const visibleCategories: IndustryCategory[] = activeCategory === 'all'
    ? industryCategories
    : industryCategories.filter(c => c.id === activeCategory)

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleCard = (cardId: string) => {
    setExpandedCardId(prev => (prev === cardId ? null : cardId))
  }

  return (
    <section className={`section ${styles.industries}`} id="industries">
      <div className="container">
        <div className={styles.header} ref={headerRef as React.RefObject<HTMLDivElement>}>
          <span className="accent-line" />
          <h2>{t('headline')}</h2>
          <p className={styles.subline}>{t('subline')}</p>
        </div>

        <CategoryFilter activeCategory={activeCategory} onChange={setActiveCategory} />

        {visibleCategories.map((category: IndustryCategory) => (
          <div key={category.id} className={styles.categoryGroup}>
            {activeCategory === 'all' && (
              <h3 className={styles.categoryLabel}>
                <span>{category.icon}</span>
                {t(`${category.id}.label`)}
              </h3>
            )}
            <div className={styles.grid}>
              {category.industries.map(industry => {
                const cardId = `${category.id}-${industry.id}`
                return (
                  <IndustryCard
                    key={industry.id}
                    categoryId={category.id}
                    industryId={industry.id}
                    icon={industry.icon}
                    painPoints={industry.painPoints}
                    isExpanded={expandedCardId === cardId}
                    onToggle={() => toggleCard(cardId)}
                  />
                )
              })}
            </div>
          </div>
        ))}

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
