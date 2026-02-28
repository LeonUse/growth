import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// ── German translations ───────────────────────────────
import deCommon    from './locales/de/common.json'
import deHero      from './locales/de/hero.json'
import deStats     from './locales/de/stats.json'
import deIndustries from './locales/de/industries.json'
import deServices  from './locales/de/services.json'
import dePortfolio from './locales/de/portfolio.json'
import deTrust     from './locales/de/trust.json'
import deFaq       from './locales/de/faq.json'
import deContact   from './locales/de/contact.json'

// ── English translations ──────────────────────────────
import enCommon    from './locales/en/common.json'
import enHero      from './locales/en/hero.json'
import enStats     from './locales/en/stats.json'
import enIndustries from './locales/en/industries.json'
import enServices  from './locales/en/services.json'
import enPortfolio from './locales/en/portfolio.json'
import enTrust     from './locales/en/trust.json'
import enFaq       from './locales/en/faq.json'
import enContact   from './locales/en/contact.json'

const resources = {
  de: {
    common:     deCommon,
    hero:       deHero,
    stats:      deStats,
    industries: deIndustries,
    services:   deServices,
    portfolio:  dePortfolio,
    trust:      deTrust,
    faq:        deFaq,
    contact:    deContact,
  },
  en: {
    common:     enCommon,
    hero:       enHero,
    stats:      enStats,
    industries: enIndustries,
    services:   enServices,
    portfolio:  enPortfolio,
    trust:      enTrust,
    faq:        enFaq,
    contact:    enContact,
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'de',
    supportedLngs: ['de', 'en'],
    defaultNS: 'common',
    ns: ['common','hero','stats','industries','services','portfolio','trust','faq','contact'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
