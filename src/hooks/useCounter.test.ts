import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCounter } from './useCounter'

vi.useFakeTimers()

describe('useCounter', () => {
  it('starts at 0', () => {
    const { result } = renderHook(() => useCounter(100, 1000, false))
    expect(result.current).toBe(0)
  })

  it('stays at 0 when not active', () => {
    const { result } = renderHook(() => useCounter(100, 1000, false))
    act(() => void vi.advanceTimersByTime(2000))
    expect(result.current).toBe(0)
  })

  it('counts up to target when active', () => {
    const { result } = renderHook(() => useCounter(50, 800, true))
    act(() => void vi.advanceTimersByTime(1000))
    expect(result.current).toBe(50)
  })

  it('never exceeds target', () => {
    const { result } = renderHook(() => useCounter(42, 400, true))
    act(() => void vi.advanceTimersByTime(500))
    expect(result.current).toBeLessThanOrEqual(42)
  })
})
