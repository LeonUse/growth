import '@testing-library/jest-dom'
import { vi } from 'vitest'

// ── GSAP Mock ────────────────────────────────────────────────────────────────
const mockGsapReturn = {
  revert: vi.fn(),
  kill: vi.fn(),
}
const mockTimeline = {
  fromTo: vi.fn().mockReturnThis(),
  to: vi.fn().mockReturnThis(),
  from: vi.fn().mockReturnThis(),
  play: vi.fn().mockReturnThis(),
}

const gsapMock = {
  fromTo: vi.fn(),
  to: vi.fn(),
  set: vi.fn(),
  context: vi.fn().mockImplementation(() => mockGsapReturn),
  timeline: vi.fn().mockImplementation(() => mockTimeline),
  registerPlugin: vi.fn(),
}

vi.mock('gsap', () => ({
  default: gsapMock,
  gsap: gsapMock,
}))

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: { create: vi.fn(), refresh: vi.fn() },
}))

// ── Lenis Mock ───────────────────────────────────────────────────────────────
vi.mock('@studio-freight/react-lenis', () => ({
  ReactLenis: ({ children }: any) => children,
  useLenis: () => null,
}))

// ── IntersectionObserver Mock ─────────────────────────────────────────────────
// NOTE: observer fires only after explicit trigger, not during construction
class MockIntersectionObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}
vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)

// ── requestAnimationFrame ─────────────────────────────────────────────────────
vi.stubGlobal('requestAnimationFrame', (fn: FrameRequestCallback) => {
  fn(0)
  return 0
})
vi.stubGlobal('cancelAnimationFrame', vi.fn())
