import React from 'react'
import styles from './Card.module.css'

export interface CardProps {
  children: React.ReactNode
  className?: string
  glow?: boolean
  badge?: React.ReactNode
  onClick?: () => void
  role?: string
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glow = false,
  badge,
  onClick,
  role,
}) => {
  const classes = [
    styles.card,
    glow ? styles['card--glow'] : '',
    onClick ? styles['card--clickable'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} onClick={onClick} role={role}>
      {badge && <div className={styles.card__badge}>{badge}</div>}
      {children}
    </div>
  )
}

export default Card
