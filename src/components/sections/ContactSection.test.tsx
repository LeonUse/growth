import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18n'
import { ContactSection } from '../../components/sections/ContactSection'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
)

describe('ContactSection', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

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

  it('handles input changes', () => {
    render(<ContactSection />, { wrapper: Wrapper })
    
    const nameInput = screen.getByRole('textbox', { name: /Name/i })
    fireEvent.change(nameInput, { target: { value: 'John Doe', name: 'name' } })
    expect(nameInput).toHaveValue('John Doe')

    // Also test a select element
    // Assuming the labels are exactly what screen expects or we can just use ID query
    const industrySelect = screen.getByLabelText(/Your Industry/i)
    fireEvent.change(industrySelect, { target: { value: 'health', name: 'industry' } })
    expect(industrySelect).toHaveValue('health')
  })

  it('handles successful form submission', async () => {
    const { container } = render(<ContactSection />, { wrapper: Wrapper })
    
    const nameInput = screen.getByRole('textbox', { name: /Name/i })
    fireEvent.change(nameInput, { target: { value: 'John Doe', name: 'name' } })

    const form = container.querySelector('form')!
    
    await act(async () => {
      fireEvent.submit(form)
    })

    // Status should be 'sending' immediately after submit
    // In our component, button text changes to 'form.sending'
    expect(screen.getByRole('button')).toHaveTextContent(/Sending...|Senden.../i)

    // Fast forward to resolve the timeout
    await act(async () => {
      vi.advanceTimersByTime(1500)
    })

    // Should show success message
    expect(screen.getByRole('alert')).toHaveTextContent(/Thank you|Vielen Dank/i)
    
    // Form should be reset (name input empty)
    expect(nameInput).toHaveValue('')
  })

  it('handles errors during form submission', async () => {
    // We force setTimeout to throw to cover the catch block
    const timeoutSpy = vi.spyOn(window, 'setTimeout').mockImplementation(() => {
      throw new Error('Simulated error')
    })

    const { container } = render(<ContactSection />, { wrapper: Wrapper })
    const form = container.querySelector('form')!

    await act(async () => {
      fireEvent.submit(form)
    })

    // Should show error message
    expect(screen.getByRole('alert')).toHaveTextContent(/Something went wrong|Etwas ist schief gelaufen/i)

    // Restore setTimeout
    timeoutSpy.mockRestore()
  })
})
