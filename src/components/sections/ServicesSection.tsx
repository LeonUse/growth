import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import Card from '../ui/Card'
import { packages, addonCategories } from '../../data/siteData'
import styles from './ServicesSection.module.css'

export const ServicesSection: React.FC = () => {
  const { t } = useTranslation('services')
  const [activeAddon, setActiveAddon] = useState<string>(addonCategories[0].id)
  const headerRef = useScrollAnimation({ y: 40 })
  const cardsRef = useScrollAnimation({ y: 60, stagger: 0.12 })

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const activeCategory = addonCategories.find(c => c.id === activeAddon)

  return (
    <section className={`section ${styles.services}`} id="services">
      <div className="container">
        <div className={styles.header} ref={headerRef as React.RefObject<HTMLDivElement>}>
          <span className="accent-line" />
          <h2>{t('headline')}</h2>
          <p className={styles.subline}>{t('subline')}</p>
        </div>

        {/* Pricing cards */}
        <div className={styles.packagesGrid} ref={cardsRef as React.RefObject<HTMLDivElement>}>
          {packages.map(pkg => (
            <Card
              key={pkg.id}
              glow={pkg.popular}
              badge={pkg.popular ? <Badge variant="gold">★ {t('popular')}</Badge> : undefined}
              className={pkg.popular ? styles['card--popular'] : ''}
            >
              <div className={styles.packageInner}>
                <div className={styles.packageTop}>
                  <h3 className={styles.packageName}>{t(`packages.${pkg.id}.name`)}</h3>
                  <p className={styles.packageTagline}>{t(`packages.${pkg.id}.tagline`)}</p>
                  <div className={styles.price}>
                    <span className={styles.priceFrom}>{t('from')}</span>
                    <span className={styles.priceValue}>{pkg.price.toLocaleString('de-DE')} €</span>
                  </div>
                </div>

                <ul className={styles.features}>
                  {pkg.featuresKey.map(fkey => (
                    <li key={fkey} className={styles.feature}>
                      <span className={styles.featureCheck}>✓</span>
                      {t(fkey)}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={pkg.popular ? 'primary' : 'secondary'}
                  size="md"
                  onClick={scrollToContact}
                  style={{ width: '100%' }}
                >
                  {t('cta')}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Add-ons */}
        <div className={styles.addons}>
          <div className={styles.addonsHeader}>
            <h3 className={styles.addonsTitle}>{t('addonsHeadline')}</h3>
            <p className={styles.addonsSubline}>{t('addonsSubline')}</p>
          </div>

          <div className={styles.addonTabs}>
            {addonCategories.map(cat => (
              <button
                key={cat.id}
                className={[styles.addonTab, activeAddon === cat.id ? styles['addonTab--active'] : ''].filter(Boolean).join(' ')}
                onClick={() => setActiveAddon(cat.id)}
              >
                {t(`addons.${cat.id}.label`)}
              </button>
            ))}
          </div>

          {activeCategory && (
            <div className={styles.addonGrid}>
              {activeCategory.items.map(item => (
                <div key={item.nameKey} className={styles.addonCard}>
                  <span className={styles.addonIcon}>{item.icon}</span>
                  <div className={styles.addonInfo}>
                    <div className={styles.addonRow}>
                      <span className={styles.addonName}>{t(item.nameKey)}</span>
                      <span className={styles.addonPrice}>{item.price}</span>
                    </div>
                    <p className={styles.addonDesc}>{t(item.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
