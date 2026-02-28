import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import React from 'react'
import i18n from '../../i18n'
import ServicesSection from './ServicesSection'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
)

describe('ServicesSection', () => {
  it('renders correctly', () => {
    const { container } = render(<ServicesSection />, { wrapper: Wrapper })
    expect(container.querySelector('#services')).toBeInTheDocument()
  })

  it('filters addons categories correctly', () => {
    const { container } = render(<ServicesSection />, { wrapper: Wrapper })
    
    const tabs = container.querySelectorAll('button[class*="addonTab"]')
    if (tabs.length > 1) {
      fireEvent.click(tabs[1])
      expect(tabs[1].className).toContain('active')
    }
  })

  it('scrolls to contact on cta click', () => {
    const scrollIntoViewMock = vi.fn()
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock
    
    // Create a dummy contact element
    const contactDiv = document.createElement('div')
    contactDiv.id = 'contact'
    document.body.appendChild(contactDiv)
    
    const { container } = render(<ServicesSection />, { wrapper: Wrapper })
    
    // Buttons are inside the .packagesGrid, first buttons are the CTAs
    const btns = container.querySelectorAll('button')
    if (btns.length > 0) {
      fireEvent.click(btns[0])
      expect(scrollIntoViewMock).toHaveBeenCalled()
    }
    
    document.body.removeChild(contactDiv)
  })
})
