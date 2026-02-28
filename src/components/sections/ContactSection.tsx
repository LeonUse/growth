import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import Button from '../ui/Button'
import styles from './ContactSection.module.css'

interface FormState {
  name: string
  email: string
  company: string
  industry: string
  budget: string
  message: string
}

const INITIAL: FormState = {
  name: '',
  email: '',
  company: '',
  industry: '',
  budget: '',
  message: '',
}

export const ContactSection: React.FC = () => {
  const { t } = useTranslation('contact')
  const [form, setForm] = useState<FormState>(INITIAL)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const headerRef = useScrollAnimation({ y: 40 })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate form submission (replace with Formspree or actual endpoint)
    try {
      await new Promise(resolve => setTimeout(resolve, 1200))
      setStatus('success')
      setForm(INITIAL)
    } catch {
      setStatus('error')
    }
  }

  const isSuccess = status === 'success'
  const isSending = status === 'sending'

  return (
    <section className={`section ${styles.contact}`} id="contact">
      <div className="container">
        <div className={styles.header} ref={headerRef as React.RefObject<HTMLDivElement>}>
          <span className="accent-line" />
          <h2>{t('headline')}</h2>
          <p className={styles.subline}>{t('subline')}</p>
        </div>

        <div className={styles.inner}>
          {/* Form */}
          <form className={styles.form} onSubmit={handleSubmit} aria-label="Contact form" noValidate>
            {isSuccess && (
              <div className={styles.successMsg} role="alert">
                {t('form.success')}
              </div>
            )}

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>{t('form.name')} *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Max Mustermann"
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>{t('form.email')} *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="max@beispiel.de"
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="company" className={styles.label}>{t('form.company')}</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={form.company}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Mein Unternehmen GmbH"
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="industry" className={styles.label}>{t('form.industry')}</label>
                <select
                  id="industry"
                  name="industry"
                  value={form.industry}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="">—</option>
                  {(['gastro', 'retail', 'services', 'health', 'other'] as const).map(k => (
                    <option key={k} value={k}>{t(`form.industryOptions.${k}`)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="budget" className={styles.label}>{t('form.budget')}</label>
              <select
                id="budget"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="">—</option>
                {(['starter', 'professional', 'enterprise', 'custom', 'unknown'] as const).map(k => (
                  <option key={k} value={k}>{t(`form.budgetOptions.${k}`)}</option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="message" className={styles.label}>{t('form.message')} *</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                className={styles.textarea}
                placeholder="Erzählen Sie uns von Ihrem Projekt..."
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSending}
              style={{ width: '100%' }}
            >
              {isSending ? t('form.sending') : t('form.submit')}
            </Button>

            {status === 'error' && (
              <p className={styles.errorMsg} role="alert">{t('form.error')}</p>
            )}
          </form>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.hook}>
              <span className={styles.hookBadge}>✓</span>
              <span>{t('hook')}</span>
            </div>

            <p className={styles.alternativeLabel}>{t('alternative')}</p>

            <a href={`tel:${t('phone')}`} className={styles.contactLink}>
              📞 {t('phone')}
            </a>
            <a href={`mailto:${t('emailAddr')}`} className={styles.contactLink}>
              ✉️ {t('emailAddr')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
