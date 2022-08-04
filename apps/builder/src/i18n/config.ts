import i18n from "i18next"
import zhCN from "./locale/zh-CN.json"
import enUS from "./locale/en-US.json"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

export const resources = {
  en: {
    translation: enUS,
  },
  zh: {
    translation: zhCN,
  },
} as const

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
  })
  .then()

export default i18n
