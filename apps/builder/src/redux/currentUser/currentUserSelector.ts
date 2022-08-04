import { RootState } from "@/store"
import { enUS, Locale, zhCN } from "@illa-design/config-provider"

export const getCurrentUser = (state: RootState) => {
  return state.currentUser
}

export const getCurrentConfigLanguage = (state: RootState) => {
  let selectedLocale: Locale
  const currentUser = state.currentUser
  switch (currentUser?.language) {
    case "en-US":
      selectedLocale = enUS
      break
    case "zh-CN":
      selectedLocale = zhCN
      break
    default:
      selectedLocale = enUS
  }
  return enUS
}

export const getCurrentTranslateLanguage = (state: RootState) => {
  const currentUser = state.currentUser
  return currentUser?.language ?? "en-US"
}
