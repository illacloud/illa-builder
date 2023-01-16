import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"
import enUS from "./locale/en-US.json"
import jaJP from "./locale/ja-JP.json"
import koKR from "./locale/ko-KR.json"
import zhCN from "./locale/zh-CN.json"

export const resources = {
  "en-US": {
    translation: enUS,
  },
  "zh-CN": {
    translation: zhCN,
  },
  "ja-JP": {
    translation: jaJP,
  },
  "ko-KR": {
    translation: koKR,
  },
} as const

export const languageKeys = Object.keys(resources)

export const formatLanguage = (code: string) => {
  if (code) {
    if (languageKeys.includes(code)) {
      return code
    }
    const mainLanguage = code.slice(0, 2)
    for (let i = 0; i < languageKeys.length; i++) {
      if (languageKeys[i].slice(0, 2) === mainLanguage) {
        return languageKeys[i]
      }
    }
  }
  return "en-US"
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: (code) => {
      const language = formatLanguage(code)
      return [language, "en-US"]
    },
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
    returnNull: false,
    detection: {},
  })

export default i18n
