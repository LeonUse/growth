import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import React from 'react'
import i18n from '../../i18n'
import Footer from './Footer'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
)

describe('Footer', () => {
  it('renders correctly', () => {
    const { container } = render(<Footer />, { wrapper: Wrapper })
    expect(container.querySelector('footer')).toBeInTheDocument()
    
    // Check if copyright year is present
    const year = new Date().getFullYear()
    expect(container.textContent).toContain(year.toString())
  })
})
