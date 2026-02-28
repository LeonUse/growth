import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Accordion } from '../../components/ui/Accordion'

const items = [
  { id: 'q1', question: 'First question?', answer: 'First answer.' },
  { id: 'q2', question: 'Second question?', answer: 'Second answer.' },
]

describe('Accordion', () => {
  it('renders all questions', () => {
    render(<Accordion items={items} />)
    expect(screen.getByText('First question?')).toBeInTheDocument()
    expect(screen.getByText('Second question?')).toBeInTheDocument()
  })

  it('panels are in the DOM', () => {
    render(<Accordion items={items} />)
    const panels = screen.getAllByRole('region', { hidden: true })
    expect(panels.length).toBe(2)
  })

  it('answer text renders within the DOM', () => {
    render(<Accordion items={items} />)
    // Answers exist in DOM even when visually hidden
    expect(screen.getByText('First answer.')).toBeInTheDocument()
  })

  it('shows answer when trigger is clicked', () => {
    render(<Accordion items={items} />)
    const btn = screen.getByText('First question?').closest('button')!
    fireEvent.click(btn)
    expect(btn.getAttribute('aria-expanded')).toBe('true')
  })

  it('closes previously open item when another is clicked (single-open)', () => {
    render(<Accordion items={items} />)
    const btn1 = screen.getByText('First question?').closest('button')!
    const btn2 = screen.getByText('Second question?').closest('button')!
    fireEvent.click(btn1)
    expect(btn1.getAttribute('aria-expanded')).toBe('true')
    fireEvent.click(btn2)
    expect(btn1.getAttribute('aria-expanded')).toBe('false')
    expect(btn2.getAttribute('aria-expanded')).toBe('true')
  })

  it('toggles closed on second click', () => {
    render(<Accordion items={items} />)
    const btn = screen.getByText('First question?').closest('button')!
    fireEvent.click(btn)
    expect(btn.getAttribute('aria-expanded')).toBe('true')
    fireEvent.click(btn)
    expect(btn.getAttribute('aria-expanded')).toBe('false')
  })
})
