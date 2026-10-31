import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function NotFoundPage() {
  const { t } = useTranslation()
  return (
    <section className="not-found container">
      <p className="eyebrow"><span className="eyebrow-dot" /> {t('notFound.eyebrow')}</p>
      <h1>{t('notFound.title')}<br /><span className="text-muted">{t('notFound.subtitle')}</span></h1>
      <Link className="button button-primary" to="/">{t('notFound.backHome')}</Link>
    </section>
  )
}
