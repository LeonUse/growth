import React from 'react'
import { useInView } from '../../hooks/useInView'
import { useCounter } from '../../hooks/useCounter'
import styles from './AnimatedCounter.module.css'

export interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  label: string
  source?: string
  duration?: number
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  label,
  source,
  duration = 1800,
}) => {
  const [ref, inView] = useInView({ threshold: 0.3 })
  const count = useCounter(value, duration, inView)

  return (
    <div className={styles.counter} ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={styles.number} aria-label={`${prefix}${value}${suffix}`}>
        <span className={styles.prefix}>{prefix}</span>
        <span className={styles.value}>{inView ? count : 0}</span>
        <span className={styles.suffix}>{suffix}</span>
      </div>
      <p className={styles.label}>{label}</p>
      {source && <p className={styles.source}>{source}</p>}
    </div>
  )
}

export default AnimatedCounter
