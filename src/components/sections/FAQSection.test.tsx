import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18n'
import { FAQSection } from '../../components/sections/FAQSection'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
)

describe('FAQSection', () => {
  it('renders section with id="faq"', () => {
    const { container } = render(<FAQSection />, { wrapper: Wrapper })
    expect(container.querySelector('#faq')).toBeInTheDocument()
  })

  it('renders 6 FAQ questions', () => {
    render(<FAQSection />, { wrapper: Wrapper })
    const triggers = screen.getAllByRole('button')
    // 6 accordion triggers
    expect(triggers.length).toBeGreaterThanOrEqual(6)
  })

  it('opens an accordion item on click', () => {
    render(<FAQSection />, { wrapper: Wrapper })
    const firstBtn = screen.getAllByRole('button')[0]
    expect(firstBtn.getAttribute('aria-expanded')).toBe('false')
    fireEvent.click(firstBtn)
    expect(firstBtn.getAttribute('aria-expanded')).toBe('true')
  })
})
