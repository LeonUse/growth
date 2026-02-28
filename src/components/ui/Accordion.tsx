import React, { useState } from 'react'
import styles from './Accordion.module.css'

export interface AccordionItem {
  id: string
  question: string
  answer: string
}

export interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

export const Accordion: React.FC<AccordionProps> = ({ items, className = '' }) => {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setOpenId(prev => (prev === id ? null : id))
  }

  return (
    <div className={[styles.accordion, className].filter(Boolean).join(' ')}>
      {items.map(item => {
        const isOpen = openId === item.id
        return (
          <div
            key={item.id}
            className={[styles.item, isOpen ? styles['item--open'] : ''].filter(Boolean).join(' ')}
          >
            <button
              className={styles.trigger}
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              id={`accordion-trigger-${item.id}`}
            >
              <span className={styles.question}>{item.question}</span>
              <span className={styles.icon} aria-hidden="true">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <div
              id={`accordion-panel-${item.id}`}
              role="region"
              aria-labelledby={`accordion-trigger-${item.id}`}
              className={styles.panel}
              data-open={isOpen}
            >
              <div className={styles.answer}>{item.answer}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Accordion
