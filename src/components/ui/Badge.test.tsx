import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from '../../components/ui/Badge'

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Popular</Badge>)
    expect(screen.getByText('Popular')).toBeInTheDocument()
  })

  it('applies gold variant by default', () => {
    render(<Badge>Gold</Badge>)
    expect(screen.getByText('Gold').className).toContain('gold')
  })

  it('applies outline variant', () => {
    render(<Badge variant="outline">Outline</Badge>)
    expect(screen.getByText('Outline').className).toContain('outline')
  })

  it('applies muted variant', () => {
    render(<Badge variant="muted">Muted</Badge>)
    expect(screen.getByText('Muted').className).toContain('muted')
  })
})
