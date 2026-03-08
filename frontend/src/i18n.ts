import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
    backend: {
      // Vite's BASE_URL may or may not end with a slash, so normalize it here
      loadPath: (() => {
        const base = import.meta.env.BASE_URL || '/';
        const prefix = base.endsWith('/') ? base : `${base}/`;

        return `${prefix}locales/{{lng}}/translation.json`;
      })(),
    },
  });

export default i18n;
