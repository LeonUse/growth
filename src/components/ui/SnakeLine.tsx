import React, { useEffect, useRef, useState, useCallback } from 'react'
import styles from './SnakeLine.module.css'

// ── Path builder ──────────────────────────────────────────────────────────────

function buildSnakePath(
  sectionTops: number[],
  pageWidth: number,
  pageHeight: number,
): string {
  if (sectionTops.length < 2) return ''

  const MARGIN = 40
  const CURVE_RADIUS = 80
  const RIGHT = pageWidth - MARGIN
  const LEFT = MARGIN

  const parts: string[] = []
  let currentSide: 'right' | 'left' = 'right'

  parts.push(`M ${RIGHT},${sectionTops[0]}`)

  for (let i = 1; i < sectionTops.length; i++) {
    const top = sectionTops[i]

    if (currentSide === 'right') {
      parts.push(`L ${RIGHT},${top - CURVE_RADIUS}`)
      parts.push(`C ${RIGHT},${top} ${RIGHT - 60},${top} ${(RIGHT + LEFT) / 2},${top}`)
      parts.push(`C ${LEFT + 60},${top} ${LEFT},${top} ${LEFT},${top + CURVE_RADIUS}`)
      currentSide = 'left'
    } else {
      parts.push(`L ${LEFT},${top - CURVE_RADIUS}`)
      parts.push(`C ${LEFT},${top} ${LEFT + 60},${top} ${(RIGHT + LEFT) / 2},${top}`)
      parts.push(`C ${RIGHT - 60},${top} ${RIGHT},${top} ${RIGHT},${top + CURVE_RADIUS}`)
      currentSide = 'right'
    }
  }

  const endX = currentSide === 'right' ? RIGHT : LEFT
  parts.push(`L ${endX},${pageHeight}`)
  return parts.join(' ')
}

// ── Component ─────────────────────────────────────────────────────────────────

export const SnakeLine: React.FC = () => {
  const pathRef = useRef<SVGPathElement>(null)
  // Store total path length; 0 means not yet measured
  const totalLengthRef = useRef(0)
  // One-directional: max progress reached so far
  const maxProgressRef = useRef(0)
  // rAF handle for cleanup
  const rafRef = useRef<number>(0)

  const [pathData, setPathData] = useState('')
  const [pageHeight, setPageHeight] = useState(0)
  const [pageWidth, setPageWidth] = useState(0)

  // ── Path measurement and direct DOM update ──────────────────────────────────

  const applyProgress = useCallback(() => {
    const len = totalLengthRef.current
    const path = pathRef.current
    if (len === 0 || !path) return

    // Viewport center position in document coordinates
    const viewportCenter = window.scrollY + window.innerHeight / 2
    const docHeight = document.body.scrollHeight
    const fraction = docHeight > 0 ? Math.min(1, viewportCenter / docHeight) : 0

    // One-directional: never retract
    maxProgressRef.current = Math.max(maxProgressRef.current, fraction)

    // Directly set the DOM attribute — bypasses React, always in sync
    path.style.strokeDashoffset = String(len * (1 - maxProgressRef.current))
  }, [])

  // ── rAF loop: runs every frame, always in sync with Lenis ──────────────────

  useEffect(() => {
    const loop = () => {
      applyProgress()
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [applyProgress])

  // ── Path rebuild ────────────────────────────────────────────────────────────

  const rebuildPath = useCallback(() => {
    const sections = document.querySelectorAll('main > section')
    if (sections.length === 0) return

    const sectionTops = Array.from(sections).map(
      (s) => (s as HTMLElement).offsetTop
    )
    const docHeight = document.body.scrollHeight
    const docWidth = document.documentElement.clientWidth

    setPageHeight(docHeight)
    setPageWidth(docWidth)
    setPathData(buildSnakePath(sectionTops, docWidth, docHeight))
  }, [])

  useEffect(() => {
    const timer = setTimeout(rebuildPath, 200)
    window.addEventListener('resize', rebuildPath, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', rebuildPath)
    }
  }, [rebuildPath])

  // ── Measure path length after it renders ───────────────────────────────────

  useEffect(() => {
    if (pathRef.current && pathData) {
      const len = pathRef.current.getTotalLength()
      totalLengthRef.current = len
      // Set dasharray once; dashoffset will be driven by rAF
      pathRef.current.style.strokeDasharray = String(len)
    }
  }, [pathData])

  if (!pathData || pageHeight === 0) return null

  return (
    <div
      className={styles.snakeLine}
      style={{ height: pageHeight }}
      aria-hidden="true"
    >
      <svg
        className={styles.svg}
        viewBox={`0 0 ${pageWidth} ${pageHeight}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="snakeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="var(--color-accent)" stopOpacity="0.5" />
            <stop offset="50%"  stopColor="var(--color-accent)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        <path
          ref={pathRef}
          d={pathData}
          className={styles.path}
          stroke="url(#snakeGradient)"
          /* dasharray/dashoffset are set directly via ref, not via React props */
        />
      </svg>
    </div>
  )
}

export default SnakeLine
