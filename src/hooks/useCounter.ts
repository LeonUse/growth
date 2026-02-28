import { useState, useEffect } from 'react'

/**
 * useCounter — animates a number from 0 to `target` over `duration` ms.
 * Only starts when `active` is true (pair with useInView).
 */
export function useCounter(target: number, duration = 1800, active = false): number {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    setCount(0)

    const stepTime = 16 // ~60fps
    const steps = Math.ceil(duration / stepTime)
    let current = 0

    const timer = setInterval(() => {
      current += 1
      // Ease-out: progress accelerates then decelerates
      const progress = current / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      const value = Math.round(eased * target)
      setCount(value)

      if (current >= steps) {
        setCount(target)
        clearInterval(timer)
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [active, target, duration])

  return count
}
