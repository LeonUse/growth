// ── Stats data ──────────────────────────────────────
export interface Stat {
  value: number
  suffix: string
  prefix: string
  labelKey: string
  sourceKey: string
}

export const stats: Stat[] = [
  { value: 81,  suffix: '%', prefix: '', labelKey: 'research',    sourceKey: 'sourceResearch' },
  { value: 75,  suffix: '%', prefix: '', labelKey: 'credibility', sourceKey: 'sourceCredibility' },
  { value: 97,  suffix: '%', prefix: '', labelKey: 'influence',   sourceKey: 'sourceInfluence' },
  { value: 2,   suffix: '×', prefix: '', labelKey: 'growth',      sourceKey: 'sourceGrowth' },
  { value: 60,  suffix: '%', prefix: '~',labelKey: 'mobile',      sourceKey: 'sourceMobile' },
  { value: 56,  suffix: '%', prefix: '', labelKey: 'nosite',      sourceKey: 'sourceNosite' },
]

// ── Pricing packages ─────────────────────────────────
export interface PricingPackage {
  id: string
  popular: boolean
  price: number
  featuresKey: string[]
}

export const packages: PricingPackage[] = [
  {
    id: 'starter',
    popular: false,
    price: 249,
    featuresKey: [
      'packages.starter.f1',
      'packages.starter.f2',
      'packages.starter.f3',
      'packages.starter.f4',
      'packages.starter.f5',
    ],
  },
  {
    id: 'professional',
    popular: true,
    price: 599,
    featuresKey: [
      'packages.professional.f1',
      'packages.professional.f2',
      'packages.professional.f3',
      'packages.professional.f4',
      'packages.professional.f5',
      'packages.professional.f6',
    ],
  },
  {
    id: 'enterprise',
    popular: false,
    price: 999,
    featuresKey: [
      'packages.enterprise.f1',
      'packages.enterprise.f2',
      'packages.enterprise.f3',
      'packages.enterprise.f4',
      'packages.enterprise.f5',
      'packages.enterprise.f6',
    ],
  },
]

// ── Add-on categories & items ─────────────────────────
export interface AddonItem {
  icon: string
  nameKey: string
  price: string
  descKey: string
}

export interface AddonCategory {
  id: string
  labelKey: string
  items: AddonItem[]
}

export const addonCategories: AddonCategory[] = [
  {
    id: 'gastro',
    labelKey: 'addons.gastro.label',
    items: [
      { icon: '🍽️', nameKey: 'addons.gastro.reservation.name', price: 'ab 99 €',  descKey: 'addons.gastro.reservation.desc' },
      { icon: '🛒', nameKey: 'addons.gastro.order.name',       price: 'ab 199 €', descKey: 'addons.gastro.order.desc' },
      { icon: '📋', nameKey: 'addons.gastro.menu.name',        price: 'ab 49 €',  descKey: 'addons.gastro.menu.desc' },
    ],
  },
  {
    id: 'ecommerce',
    labelKey: 'addons.ecommerce.label',
    items: [
      { icon: '🛍️', nameKey: 'addons.ecommerce.shopBasic.name',    price: 'ab 299 €', descKey: 'addons.ecommerce.shopBasic.desc' },
      { icon: '🛍️', nameKey: 'addons.ecommerce.shopAdvanced.name', price: 'ab 599 €', descKey: 'addons.ecommerce.shopAdvanced.desc' },
      { icon: '📦', nameKey: 'addons.ecommerce.clickcollect.name', price: 'ab 99 €',  descKey: 'addons.ecommerce.clickcollect.desc' },
    ],
  },
  {
    id: 'booking',
    labelKey: 'addons.booking.label',
    items: [
      { icon: '📅', nameKey: 'addons.booking.appointment.name', price: 'ab 99 €',  descKey: 'addons.booking.appointment.desc' },
      { icon: '🏋️', nameKey: 'addons.booking.course.name',      price: 'ab 149 €', descKey: 'addons.booking.course.desc' },
    ],
  },
  {
    id: 'marketing',
    labelKey: 'addons.marketing.label',
    items: [
      { icon: '💬', nameKey: 'addons.marketing.chat.name',        price: 'ab 49 €',  descKey: 'addons.marketing.chat.desc' },
      { icon: '📧', nameKey: 'addons.marketing.newsletter.name',  price: 'ab 79 €',  descKey: 'addons.marketing.newsletter.desc' },
      { icon: '⭐', nameKey: 'addons.marketing.reviews.name',     price: 'ab 59 €',  descKey: 'addons.marketing.reviews.desc' },
      { icon: '📱', nameKey: 'addons.marketing.social.name',      price: 'ab 39 €',  descKey: 'addons.marketing.social.desc' },
    ],
  },
  {
    id: 'tech',
    labelKey: 'addons.tech.label',
    items: [
      { icon: '🔍', nameKey: 'addons.tech.seo.name',         price: 'ab 149 €', descKey: 'addons.tech.seo.desc' },
      { icon: '📊', nameKey: 'addons.tech.analytics.name',   price: 'ab 89 €',  descKey: 'addons.tech.analytics.desc' },
      { icon: '♿', nameKey: 'addons.tech.wcag.name',        price: 'ab 149 €', descKey: 'addons.tech.wcag.desc' },
      { icon: '🌐', nameKey: 'addons.tech.i18n.name',        price: 'ab 99 €',  descKey: 'addons.tech.i18n.desc' },
      { icon: '🔒', nameKey: 'addons.tech.cookie.name',      price: 'ab 39 €',  descKey: 'addons.tech.cookie.desc' },
    ],
  },
  {
    id: 'maintenance',
    labelKey: 'addons.maintenance.label',
    items: [
      { icon: '🛡️', nameKey: 'addons.maintenance.basic.name',   price: 'ab 39 €/Mo',  descKey: 'addons.maintenance.basic.desc' },
      { icon: '🚀', nameKey: 'addons.maintenance.performance.name', price: 'ab 49 €/Mo', descKey: 'addons.maintenance.performance.desc' },
      { icon: '📞', nameKey: 'addons.maintenance.priority.name', price: 'ab 15 €/Mo', descKey: 'addons.maintenance.priority.desc' },
    ],
  },
]

// ── Industries data ───────────────────────────────────
export interface PainPoint {
  problemKey: string
  solutionKey: string
}

export interface Industry {
  id: string
  icon: string
  nameKey: string
  taglineKey: string
  painPoints: PainPoint[]
}

export interface IndustryCategory {
  id: string
  labelKey: string
  icon: string
  industries: Industry[]
}

export const industryCategories: IndustryCategory[] = [
  {
    id: 'gastro',
    labelKey: 'industries.gastro.label',
    icon: '🍽️',
    industries: [
      {
        id: 'restaurant',
        icon: '🍽️',
        nameKey: 'gastro.restaurant.name',
        taglineKey: 'gastro.restaurant.tagline',
        painPoints: [
          { problemKey: 'gastro.restaurant.p1.problem', solutionKey: 'gastro.restaurant.p1.solution' },
          { problemKey: 'gastro.restaurant.p2.problem', solutionKey: 'gastro.restaurant.p2.solution' },
          { problemKey: 'gastro.restaurant.p3.problem', solutionKey: 'gastro.restaurant.p3.solution' },
          { problemKey: 'gastro.restaurant.p4.problem', solutionKey: 'gastro.restaurant.p4.solution' },
        ],
      },
      {
        id: 'cafe',
        icon: '☕',
        nameKey: 'gastro.cafe.name',
        taglineKey: 'gastro.cafe.tagline',
        painPoints: [
          { problemKey: 'gastro.cafe.p1.problem', solutionKey: 'gastro.cafe.p1.solution' },
          { problemKey: 'gastro.cafe.p2.problem', solutionKey: 'gastro.cafe.p2.solution' },
          { problemKey: 'gastro.cafe.p3.problem', solutionKey: 'gastro.cafe.p3.solution' },
        ],
      },
      {
        id: 'bakery',
        icon: '🥐',
        nameKey: 'gastro.bakery.name',
        taglineKey: 'gastro.bakery.tagline',
        painPoints: [
          { problemKey: 'gastro.bakery.p1.problem', solutionKey: 'gastro.bakery.p1.solution' },
          { problemKey: 'gastro.bakery.p2.problem', solutionKey: 'gastro.bakery.p2.solution' },
          { problemKey: 'gastro.bakery.p3.problem', solutionKey: 'gastro.bakery.p3.solution' },
        ],
      },
    ],
  },
  {
    id: 'retail',
    labelKey: 'industries.retail.label',
    icon: '🛍️',
    industries: [
      {
        id: 'boutique',
        icon: '👗',
        nameKey: 'retail.boutique.name',
        taglineKey: 'retail.boutique.tagline',
        painPoints: [
          { problemKey: 'retail.boutique.p1.problem', solutionKey: 'retail.boutique.p1.solution' },
          { problemKey: 'retail.boutique.p2.problem', solutionKey: 'retail.boutique.p2.solution' },
          { problemKey: 'retail.boutique.p3.problem', solutionKey: 'retail.boutique.p3.solution' },
          { problemKey: 'retail.boutique.p4.problem', solutionKey: 'retail.boutique.p4.solution' },
        ],
      },
      {
        id: 'florist',
        icon: '💐',
        nameKey: 'retail.florist.name',
        taglineKey: 'retail.florist.tagline',
        painPoints: [
          { problemKey: 'retail.florist.p1.problem', solutionKey: 'retail.florist.p1.solution' },
          { problemKey: 'retail.florist.p2.problem', solutionKey: 'retail.florist.p2.solution' },
          { problemKey: 'retail.florist.p3.problem', solutionKey: 'retail.florist.p3.solution' },
        ],
      },
      {
        id: 'wine',
        icon: '🍷',
        nameKey: 'retail.wine.name',
        taglineKey: 'retail.wine.tagline',
        painPoints: [
          { problemKey: 'retail.wine.p1.problem', solutionKey: 'retail.wine.p1.solution' },
          { problemKey: 'retail.wine.p2.problem', solutionKey: 'retail.wine.p2.solution' },
          { problemKey: 'retail.wine.p3.problem', solutionKey: 'retail.wine.p3.solution' },
        ],
      },
    ],
  },
  {
    id: 'services',
    labelKey: 'industries.services.label',
    icon: '💼',
    industries: [
      {
        id: 'handwerk',
        icon: '🔧',
        nameKey: 'services.handwerk.name',
        taglineKey: 'services.handwerk.tagline',
        painPoints: [
          { problemKey: 'services.handwerk.p1.problem', solutionKey: 'services.handwerk.p1.solution' },
          { problemKey: 'services.handwerk.p2.problem', solutionKey: 'services.handwerk.p2.solution' },
          { problemKey: 'services.handwerk.p3.problem', solutionKey: 'services.handwerk.p3.solution' },
          { problemKey: 'services.handwerk.p4.problem', solutionKey: 'services.handwerk.p4.solution' },
        ],
      },
      {
        id: 'legal',
        icon: '⚖️',
        nameKey: 'services.legal.name',
        taglineKey: 'services.legal.tagline',
        painPoints: [
          { problemKey: 'services.legal.p1.problem', solutionKey: 'services.legal.p1.solution' },
          { problemKey: 'services.legal.p2.problem', solutionKey: 'services.legal.p2.solution' },
          { problemKey: 'services.legal.p3.problem', solutionKey: 'services.legal.p3.solution' },
        ],
      },
      {
        id: 'coach',
        icon: '🎯',
        nameKey: 'services.coach.name',
        taglineKey: 'services.coach.tagline',
        painPoints: [
          { problemKey: 'services.coach.p1.problem', solutionKey: 'services.coach.p1.solution' },
          { problemKey: 'services.coach.p2.problem', solutionKey: 'services.coach.p2.solution' },
          { problemKey: 'services.coach.p3.problem', solutionKey: 'services.coach.p3.solution' },
          { problemKey: 'services.coach.p4.problem', solutionKey: 'services.coach.p4.solution' },
        ],
      },
      {
        id: 'realestate',
        icon: '🏠',
        nameKey: 'services.realestate.name',
        taglineKey: 'services.realestate.tagline',
        painPoints: [
          { problemKey: 'services.realestate.p1.problem', solutionKey: 'services.realestate.p1.solution' },
          { problemKey: 'services.realestate.p2.problem', solutionKey: 'services.realestate.p2.solution' },
          { problemKey: 'services.realestate.p3.problem', solutionKey: 'services.realestate.p3.solution' },
        ],
      },
    ],
  },
  {
    id: 'health',
    labelKey: 'industries.health.label',
    icon: '🏥',
    industries: [
      {
        id: 'doctor',
        icon: '🩺',
        nameKey: 'health.doctor.name',
        taglineKey: 'health.doctor.tagline',
        painPoints: [
          { problemKey: 'health.doctor.p1.problem', solutionKey: 'health.doctor.p1.solution' },
          { problemKey: 'health.doctor.p2.problem', solutionKey: 'health.doctor.p2.solution' },
          { problemKey: 'health.doctor.p3.problem', solutionKey: 'health.doctor.p3.solution' },
          { problemKey: 'health.doctor.p4.problem', solutionKey: 'health.doctor.p4.solution' },
        ],
      },
      {
        id: 'physio',
        icon: '💆',
        nameKey: 'health.physio.name',
        taglineKey: 'health.physio.tagline',
        painPoints: [
          { problemKey: 'health.physio.p1.problem', solutionKey: 'health.physio.p1.solution' },
          { problemKey: 'health.physio.p2.problem', solutionKey: 'health.physio.p2.solution' },
          { problemKey: 'health.physio.p3.problem', solutionKey: 'health.physio.p3.solution' },
        ],
      },
      {
        id: 'fitness',
        icon: '🏋️',
        nameKey: 'health.fitness.name',
        taglineKey: 'health.fitness.tagline',
        painPoints: [
          { problemKey: 'health.fitness.p1.problem', solutionKey: 'health.fitness.p1.solution' },
          { problemKey: 'health.fitness.p2.problem', solutionKey: 'health.fitness.p2.solution' },
          { problemKey: 'health.fitness.p3.problem', solutionKey: 'health.fitness.p3.solution' },
          { problemKey: 'health.fitness.p4.problem', solutionKey: 'health.fitness.p4.solution' },
        ],
      },
      {
        id: 'beauty',
        icon: '💅',
        nameKey: 'health.beauty.name',
        taglineKey: 'health.beauty.tagline',
        painPoints: [
          { problemKey: 'health.beauty.p1.problem', solutionKey: 'health.beauty.p1.solution' },
          { problemKey: 'health.beauty.p2.problem', solutionKey: 'health.beauty.p2.solution' },
          { problemKey: 'health.beauty.p3.problem', solutionKey: 'health.beauty.p3.solution' },
        ],
      },
    ],
  },
]

// ── FAQ data ──────────────────────────────────────────
export interface FAQItem {
  questionKey: string
  answerKey: string
}

export const faqItems: FAQItem[] = [
  { questionKey: 'q1', answerKey: 'a1' },
  { questionKey: 'q2', answerKey: 'a2' },
  { questionKey: 'q3', answerKey: 'a3' },
  { questionKey: 'q4', answerKey: 'a4' },
  { questionKey: 'q5', answerKey: 'a5' },
  { questionKey: 'q6', answerKey: 'a6' },
]

// ── Portfolio placeholder data ────────────────────────
export interface PortfolioItem {
  id: string
  titleKey: string
  industryKey: string
  categoryFilter: string
  color: string
  emoji: string
}

export const portfolioItems: PortfolioItem[] = [
  { id: 'p1', titleKey: 'p1.title', industryKey: 'p1.industry', categoryFilter: 'gastro',   color: '#1a1208', emoji: '🍽️' },
  { id: 'p2', titleKey: 'p2.title', industryKey: 'p2.industry', categoryFilter: 'retail',   color: '#0d1a12', emoji: '👗' },
  { id: 'p3', titleKey: 'p3.title', industryKey: 'p3.industry', categoryFilter: 'health',   color: '#0a0f1a', emoji: '🩺' },
  { id: 'p4', titleKey: 'p4.title', industryKey: 'p4.industry', categoryFilter: 'services', color: '#120a1a', emoji: '🔧' },
  { id: 'p5', titleKey: 'p5.title', industryKey: 'p5.industry', categoryFilter: 'gastro',   color: '#1a1005', emoji: '☕' },
  { id: 'p6', titleKey: 'p6.title', industryKey: 'p6.industry', categoryFilter: 'retail',   color: '#0f1a0a', emoji: '🌿' },
]
