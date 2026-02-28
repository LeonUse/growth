import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import React from 'react'
import i18n from '../../i18n'
import { stats } from '../../data/siteData'
import { StatsSection } from '../../components/sections/StatsSection'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
)

describe('StatsSection data', () => {
  it('has exactly 6 stat items', () => {
    expect(stats).toHaveLength(6)
  })

  it('each stat has required fields', () => {
    stats.forEach(stat => {
      expect(stat).toHaveProperty('value')
      expect(stat).toHaveProperty('suffix')
      expect(stat).toHaveProperty('labelKey')
      expect(stat).toHaveProperty('sourceKey')
    })
  })

  it('stat values are positive numbers', () => {
    stats.forEach(stat => {
      expect(stat.value).toBeGreaterThan(0)
    })
  })
})

describe('StatsSection render', () => {
  it('renders section with id="stats"', () => {
    const { container } = render(<StatsSection />, { wrapper: Wrapper })
    expect(container.querySelector('#stats')).toBeInTheDocument()
  })
})
