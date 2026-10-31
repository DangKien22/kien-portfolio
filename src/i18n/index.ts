import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import vi from './locales/vi.json'

const storageKey = 'kien.dev.language'
const storedLanguage = window.localStorage.getItem(storageKey)
const initialLanguage = storedLanguage === 'vi' ? 'vi' : 'en'

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },
  lng: initialLanguage,
  fallbackLng: 'en',
  supportedLngs: ['en', 'vi'],
  interpolation: { escapeValue: false },
  initAsync: false,
})

const updateDocumentLanguage = (language: string) => {
  const nextLanguage = language === 'vi' ? 'vi' : 'en'
  document.documentElement.lang = nextLanguage
  document.title = i18n.t('metadata.title', { lng: nextLanguage })
  document.querySelector<HTMLMetaElement>('meta[name="description"]')
    ?.setAttribute('content', i18n.t('metadata.description', { lng: nextLanguage }))
  document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
    ?.setAttribute('content', i18n.t('metadata.title', { lng: nextLanguage }))
  document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
    ?.setAttribute('content', i18n.t('metadata.description', { lng: nextLanguage }))
}

updateDocumentLanguage(initialLanguage)

i18n.on('languageChanged', (language) => {
  const nextLanguage = language === 'vi' ? 'vi' : 'en'
  updateDocumentLanguage(nextLanguage)
  window.localStorage.setItem(storageKey, nextLanguage)
})

export default i18n
