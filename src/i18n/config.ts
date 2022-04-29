import { use } from "i18next"
import zhCN from "./locale/zh-CN.json"
import enUS from "./locale/en-US.json"
import { initReactI18next } from "react-i18next"

export const resources = {
  en: {
    translation: {
      ...enUS,
    },
  },
  zh: {
    translation: {
      ...zhCN,
    },
  },
} as const

use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  debug: true,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
})

// export default i18n
