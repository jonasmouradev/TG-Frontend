import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getDefaultLanguage } from '../utils';

import sharedEn from '@/shared/locale/en.json';
import sharedPt from '@/shared/locale/pt.json';

import authEn from '@/features/auth/locale/en.json';
import authPt from '@/features/auth/locale/pt.json';

import homeEn from '@/features/home/locale/en.json';
import homePt from '@/features/home/locale/pt.json';

import profileEn from '@/features/profile/locale/en.json';
import profilePt from '@/features/profile/locale/pt.json';

import settingsEn from '@/features/settings/locale/en.json';
import settingsPt from '@/features/settings/locale/pt.json';

const resources = {
  pt: {
    translation: {
      ...authPt,
      ...homePt,
      ...sharedPt,
      ...profilePt,
      ...settingsPt,
    },
  },
  en: {
    translation: {
      ...authEn,
      ...homeEn,
      ...sharedEn,
      ...profileEn,
      ...settingsEn,
    },
  },
};

const defineLanguage = getDefaultLanguage();

i18n.use(initReactI18next).init({
  resources,
  lng: defineLanguage,
});

export default i18n;
