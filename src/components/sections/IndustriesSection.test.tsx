import { describe, it, expect } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import React from 'react'
import i18n from '../../i18n'
import IndustriesSection from './IndustriesSection'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
)

describe('IndustriesSection', () => {
  it('renders correctly', () => {
    const { container } = render(<IndustriesSection />, { wrapper: Wrapper })
    expect(container.querySelector('#industries')).toBeInTheDocument()
  })

  it('filters categories correctly', () => {
    const { container } = render(<IndustriesSection />, { wrapper: Wrapper })
    
    // Change category to the second tab
    const tabs = container.querySelectorAll('button[role="tab"]')
    if (tabs.length > 1) {
      fireEvent.click(tabs[1])
      expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
    }
  })

  it('toggles painpoint correctly', () => {
    const { container } = render(<IndustriesSection />, { wrapper: Wrapper })
    // get all toggle buttons (accordions)
    const buttons = container.querySelectorAll('button[class*="painPointToggle"]')
    if (buttons.length > 0) {
      fireEvent.click(buttons[0])
      expect(buttons[0]).toHaveAttribute('aria-expanded', 'true')
      
      // click again to close
      fireEvent.click(buttons[0])
      expect(buttons[0]).toHaveAttribute('aria-expanded', 'false')
    }
  })
})
