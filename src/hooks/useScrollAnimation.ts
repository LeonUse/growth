import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollAnimationOptions {
  y?: number
  opacity?: number
  duration?: number
  delay?: number
  stagger?: number
  scrub?: boolean
}

/**
 * useScrollAnimation — wires up GSAP ScrollTrigger reveal animation on a container ref.
 * Optionally animates children with stagger if `stagger` is provided.
 */
export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  const {
    y = 40,
    opacity = 0,
    duration = 0.8,
    delay = 0,
    stagger = 0,
    scrub = false,
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = stagger > 0 ? Array.from(el.children) : [el]

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y, opacity },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          stagger: stagger > 0 ? stagger : undefined,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: scrub ? undefined : 'play none none none',
            scrub: scrub ? true : undefined,
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return ref
}
