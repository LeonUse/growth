import { describe, it, expect } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import React from 'react'
import i18n from '../../i18n'
import Navbar from './Navbar'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
)

describe('Navbar', () => {
  it('renders correctly', () => {
    const { container } = render(<Navbar />, { wrapper: Wrapper })
    expect(container.querySelector('nav')).toBeInTheDocument()
  })

  it('toggles mobile menu', () => {
    const { container } = render(<Navbar />, { wrapper: Wrapper })
    const mobileBtn = container.querySelector('button[class*="mobileToggle"]')
    
    if (mobileBtn) {
      fireEvent.click(mobileBtn)
      expect(mobileBtn).toHaveAttribute('aria-label', 'Close menu')
      
      fireEvent.click(mobileBtn)
      expect(mobileBtn).toHaveAttribute('aria-label', 'Toggle menu')
    }
  })
})
