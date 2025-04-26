import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import pt_BR from "../locale/pt_BR.json";
import en_US from "../locale/en_US.json";

import { getDefaultLanguage } from "@/utils/getDefaultLanguage";

const resources = {
  pt: {
    translation: {
      ...pt_BR,
    },
  },
  "pt-BR": {
    translation: {
      ...pt_BR,
    },
  },
  en: {
    translation: {
      ...en_US,
    },
  },
  "en-US": {
    translation: {
      ...en_US,
    },
  },
};

const defineLanguage = getDefaultLanguage();

i18n.use(initReactI18next).init({
  resources,
  lng: defineLanguage,
});

export default i18n;
