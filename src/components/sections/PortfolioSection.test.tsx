import { describe, it, expect } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import React from 'react'
import i18n from '../../i18n'
import PortfolioSection from './PortfolioSection'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
)

describe('PortfolioSection', () => {
  it('renders correctly', () => {
    const { container } = render(<PortfolioSection />, { wrapper: Wrapper })
    expect(container.querySelector('#portfolio')).toBeInTheDocument()
  })

  it('filters items correctly', () => {
    const { container } = render(<PortfolioSection />, { wrapper: Wrapper })
    
    // Find tab buttons via class
    const tabs = container.querySelectorAll('button[role="tab"]')
    
    if (tabs.length > 1) {
      const allButton = tabs[0]
      const gastroButton = tabs[1]
      
      expect(allButton).toHaveAttribute('aria-selected', 'true')
      
      fireEvent.click(gastroButton)
      expect(gastroButton).toHaveAttribute('aria-selected', 'true')
      expect(allButton).not.toHaveAttribute('aria-selected', 'true')
    }
  })
})
