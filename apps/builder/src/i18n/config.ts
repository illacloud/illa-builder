import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"
import csCZ from "./locale/cs-CZ.json"
import daDK from "./locale/da-DK.json"
import deDE from "./locale/de-DE.json"
import elGR from "./locale/el-GR.json"
import enUS from "./locale/en-US.json"
import esES from "./locale/es-ES.json"
import fiFI from "./locale/fi-FI.json"
import frFR from "./locale/fr-FR.json"
import itIT from "./locale/it-IT.json"
import jaJP from "./locale/ja-JP.json"
import koKR from "./locale/ko-KR.json"
import nlNL from "./locale/nl-NL.json"
import noNO from "./locale/no-NO.json"
import plPL from "./locale/pl-PL.json"
import ptPT from "./locale/pt-PT.json"
import roRO from "./locale/ro-RO.json"
import ruRU from "./locale/ru-RU.json"
import svSE from "./locale/sv-SE.json"
import ukUA from "./locale/uk-UA.json"
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
  "cs-CZ": {
    translation: csCZ,
  },
  "da-DK": {
    translation: daDK,
  },
  "de-DE": {
    translation: deDE,
  },
  "el-GR": {
    translation: elGR,
  },
  "es-ES": {
    translation: esES,
  },
  "fi-FI": {
    translation: fiFI,
  },
  "fr-FR": {
    translation: frFR,
  },
  "it-IT": {
    translation: itIT,
  },
  "nl-NL": {
    translation: nlNL,
  },
  "no-NO": {
    translation: noNO,
  },
  "pl-PL": {
    translation: plPL,
  },
  "pt-PT": {
    translation: ptPT,
  },
  "ru-RU": {
    translation: ruRU,
  },
  "ro-RO": {
    translation: roRO,
  },
  "sv-SE": {
    translation: svSE,
  },
  "uk-UA": {
    translation: ukUA,
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

export const LANG_OPTIONS = Object.keys(resources).map((key) => {
  return {
    label: i18n.t(`language.${key}`),
    value: key,
  }
})

export default i18n
