import React from 'react'
import styles from './Badge.module.css'

export type BadgeVariant = 'gold' | 'outline' | 'muted'

export interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'gold', className = '' }) => {
  const classes = [styles.badge, styles[`badge--${variant}`], className].filter(Boolean).join(' ')
  return <span className={classes}>{children}</span>
}

export default Badge
