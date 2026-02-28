import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { Card } from './Card'
import React from 'react'

describe('Card', () => {
  it('renders children correctly', () => {
    const { getByText } = render(<Card>Card Content</Card>)
    expect(getByText('Card Content')).toBeInTheDocument()
  })

  it('applies custom className, glow and clickable properties', () => {
    const onClick = vi.fn()
    const { container } = render(
      <Card className="custom-class" glow onClick={onClick}>Interactive Content</Card>
    )
    const el = container.firstChild as HTMLElement
    expect(el.className).toContain('custom-class')
    expect(el.className).toContain('glow') // It will be obfuscated e.g _card--glow_xxxx
    expect(el.className).toContain('clickable')
  })
})
