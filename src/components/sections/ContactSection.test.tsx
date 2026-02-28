import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18n'
import { ContactSection } from '../../components/sections/ContactSection'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
)

describe('ContactSection', () => {
  it('renders section with id="contact"', () => {
    const { container } = render(<ContactSection />, { wrapper: Wrapper })
    expect(container.querySelector('#contact')).toBeInTheDocument()
  })

  it('renders all required form fields', () => {
    render(<ContactSection />, { wrapper: Wrapper })
    expect(screen.getByRole('textbox', { name: /Name/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /E-Mail|Email/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /Nachricht|Message/i })).toBeInTheDocument()
  })

  it('has a submit button', () => {
    render(<ContactSection />, { wrapper: Wrapper })
    const submitBtn = screen.getByRole('button', { name: /senden|send/i })
    expect(submitBtn).toBeInTheDocument()
  })
})
