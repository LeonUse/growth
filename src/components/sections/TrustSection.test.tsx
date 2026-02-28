import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import React from 'react'
import i18n from '../../i18n'
import TrustSection from './TrustSection'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
)

describe('TrustSection', () => {
  it('renders correctly', () => {
    const { container } = render(<TrustSection />, { wrapper: Wrapper })
    expect(container.querySelector('#trust')).toBeInTheDocument()
  })
})
