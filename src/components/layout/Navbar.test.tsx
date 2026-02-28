import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import React from 'react'
import i18n from '../../i18n'
import Navbar from './Navbar'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
)

describe('Navbar', () => {
  beforeEach(() => {
    // Mock window methods that aren't available in JSDOM
    window.scrollTo = vi.fn()
    window.HTMLElement.prototype.scrollIntoView = vi.fn()
  })

  it('renders correctly', () => {
    const { container } = render(<Navbar />, { wrapper: Wrapper })
    expect(container.querySelector('nav')).toBeInTheDocument()
  })

  it('applies scrolled class when window is scrolled past 40px', () => {
    const { container } = render(<Navbar />, { wrapper: Wrapper })
    const header = container.querySelector('header')
    expect(header?.className).not.toContain('navbar--scrolled')

    // Simulate scroll
    fireEvent.scroll(window, { target: { scrollY: 50 } })
    expect(header?.className).toContain('navbar--scrolled')

    // Scroll back up
    fireEvent.scroll(window, { target: { scrollY: 10 } })
    expect(header?.className).not.toContain('navbar--scrolled')
  })

  it('scrolls to top when clicking the logo', () => {
    render(<Navbar />, { wrapper: Wrapper })
    const logo = screen.getByText('Growth.').closest('a')
    expect(logo).toBeInTheDocument()

    fireEvent.click(logo!)
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('handles navigation clicks smoothly', () => {
    // Need to create a mock target in the document body so querySelector finds it
    const mockTarget = document.createElement('div')
    mockTarget.id = 'faq'
    document.body.appendChild(mockTarget)

    render(<Navbar />, { wrapper: Wrapper })
    const faqLink = screen.getAllByText('FAQ')[0] // Get desktop link
    
    // Using closest 'a' in case text is inside span or something, but it's an 'a' directly
    fireEvent.click(faqLink)
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' })

    // Cleanup
    document.body.removeChild(mockTarget)
  })

  it('toggles mobile menu and handles mobile link clicks', () => {
    const mockTarget = document.createElement('div')
    mockTarget.id = 'services'
    document.body.appendChild(mockTarget)

    const { container } = render(<Navbar />, { wrapper: Wrapper })
    
    // Find the hamburger button (it has aria-label="Toggle menu")
    const mobileBtn = screen.getByLabelText('Toggle menu')
    expect(mobileBtn).toBeInTheDocument()
    
    // Initially mobile menu is closed (no mobile links outside of nav)
    expect(container.querySelector('.mobileMenu')).not.toBeInTheDocument()
    
    // Open menu
    fireEvent.click(mobileBtn)
    expect(mobileBtn).toHaveAttribute('aria-expanded', 'true')
    
    // Now mobile menu should be rendered
    const mobileMenu = container.querySelector('[class*="mobileMenu"]')
    expect(mobileMenu).toBeInTheDocument()

    // Click a mobile link
    const mobileServiceLink = screen.getAllByText('Services')[1] // 0 is desktop, 1 is mobile
    fireEvent.click(mobileServiceLink)
    
    // It should have scrolled to target
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' })
    
    // Menu should be closed after click
    expect(container.querySelector('[class*="mobileMenu"]')).not.toBeInTheDocument()

    // Cleanup
    document.body.removeChild(mockTarget)
  })

  it('blurs the contact CTA button after clicking', () => {
    render(<Navbar />, { wrapper: Wrapper })
    const ctaButton = screen.getAllByText('Get a Quote')[0].closest('a')
    
    // We can't strictly assert blur on the literal element if JSDOM doesn't do it the same way,
    // but covering the branch is the main goal.
    const blurSpy = vi.spyOn(ctaButton as HTMLElement, 'blur')
    fireEvent.click(ctaButton!)
    expect(blurSpy).toHaveBeenCalled()
    blurSpy.mockRestore()
  })
})
