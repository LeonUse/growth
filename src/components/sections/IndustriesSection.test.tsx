import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import React from 'react'
import i18n from '../../i18n'
import IndustriesSection from './IndustriesSection'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
)

describe('IndustriesSection', () => {
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn()
  })

  it('renders correctly', () => {
    const { container } = render(<IndustriesSection />, { wrapper: Wrapper })
    expect(container.querySelector('#industries')).toBeInTheDocument()
  })

  it('selects a category to show details and toggles it off', () => {
    const { container } = render(<IndustriesSection />, { wrapper: Wrapper })
    
    // Find all category buttons
    const categoryButtons = container.querySelectorAll('button[aria-expanded]')
    expect(categoryButtons.length).toBeGreaterThan(0)
    
    const firstCategoryBtn = categoryButtons[0]
    expect(firstCategoryBtn).toHaveAttribute('aria-expanded', 'false')

    // Click to open
    fireEvent.click(firstCategoryBtn)
    expect(firstCategoryBtn).toHaveAttribute('aria-expanded', 'true')

    // Expect the detail panel to be shown (aria-hidden false)
    const detailPanel = container.querySelector('[class*="detailPanel--open"]')
    expect(detailPanel).toBeInTheDocument()
    expect(detailPanel).toHaveAttribute('aria-hidden', 'false')

    // Click again to close
    fireEvent.click(firstCategoryBtn)
    expect(firstCategoryBtn).toHaveAttribute('aria-expanded', 'false')
    expect(container.querySelector('[class*="detailPanel--open"]')).not.toBeInTheDocument()
  })

  it('scrolls to contact section when CTA is clicked', () => {
    // Need to create a mock target in the document body so querySelector finds it
    const mockTarget = document.createElement('div')
    mockTarget.id = 'contact'
    document.body.appendChild(mockTarget)

    render(<IndustriesSection />, { wrapper: Wrapper })
    
    // Our button might have different translated text depending on Language.
    // In English, it's something like "Let's talk". 
    // We can find it by getting the button inside the bottom CTA container.
    const buttons = screen.getAllByRole('button')
    // The CTA button is likely the last button as it is at the bottom
    const ctaBtn = buttons[buttons.length - 1]
    
    fireEvent.click(ctaBtn)
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })

    // Cleanup
    document.body.removeChild(mockTarget)
  })
})
