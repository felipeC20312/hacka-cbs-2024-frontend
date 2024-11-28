import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import pt from './translation/pt.json';
import en from './translation/en.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'pt',
  resources: {
    en: en,
    pt: pt,
  },
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
