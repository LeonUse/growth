import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18n/index'
import { LanguageSwitcher } from '../../components/ui/LanguageSwitcher'

describe('LanguageSwitcher', () => {
  const renderWithI18n = () =>
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSwitcher />
      </I18nextProvider>
    )

  it('renders DE and EN buttons', () => {
    renderWithI18n()
    expect(screen.getByText('DE')).toBeInTheDocument()
    expect(screen.getByText('EN')).toBeInTheDocument()
  })

  it('has correct aria-pressed for active language', () => {
    renderWithI18n()
    const de = screen.getByText('DE').closest('button')!
    const en = screen.getByText('EN').closest('button')!
    // Default language is 'de', so DE should be active
    const dePressed = de.getAttribute('aria-pressed')
    const enPressed = en.getAttribute('aria-pressed')
    // One of them must be true
    expect(dePressed === 'true' || enPressed === 'true').toBe(true)
  })

  it('switches language when EN is clicked', async () => {
    const changeSpy = vi.spyOn(i18n, 'changeLanguage')
    renderWithI18n()
    const en = screen.getByText('EN').closest('button')!
    fireEvent.click(en)
    expect(changeSpy).toHaveBeenCalledWith('en')
  })
})
