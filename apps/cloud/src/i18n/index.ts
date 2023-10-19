import { isCloudVersion } from "@illa-public/utils"
import i18n from "i18next"
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector"
import HttpApi, { HttpBackendOptions } from "i18next-http-backend"
import { initReactI18next } from "react-i18next"

export const defaultLanguage = "en-US"

export const languageKeys = [
  "en-US",
  "zh-CN",
  "ja-JP",
  "ko-KR",
  "cs-CZ",
  "da-DK",
  "de-DE",
  "el-GR",
  "es-ES",
  "fi-FI",
  "fr-FR",
  "it-IT",
  "nl-NL",
  "no-NO",
  "pl-PL",
  "pt-PT",
  "ru-RU",
  "ro-RO",
  "sv-SE",
  "uk-UA",
]

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

export function getLocalLanguage(): string {
  const lang =
    window.localStorage.getItem("i18nextLng") || window.navigator.language
  return formatLanguage(lang)
}

i18n
  .use(I18nextBrowserLanguageDetector)
  .use(HttpApi)
  .use(initReactI18next)
  .init<HttpBackendOptions>({
    load: "currentOnly",
    backend: {
      loadPath:
        (import.meta.env.PROD && !isCloudVersion ? "/cloud/" : "/") +
        "locales/{{lng}}.json",
    },
    fallbackLng: (code) => {
      const language = formatLanguage(code)
      return [language, "en-US"]
    },
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    returnNull: false,
  })

export default i18n
