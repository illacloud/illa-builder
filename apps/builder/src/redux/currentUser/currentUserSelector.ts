import { createSelector } from "@reduxjs/toolkit"
import { Locale, enUS, jaJP, koKR, zhCN } from "@illa-design/react"
import { getBuilderInfo } from "@/redux/builderInfo/builderInfoSelector"
import { RootState } from "@/store"

export const getCurrentUser = (state: RootState) => {
  return state.currentUser
}

export const getCurrentUserIsLogin = (state: RootState) => {
  return state.currentUser.userId !== ""
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
    case "ja-JP":
      selectedLocale = jaJP
      break
    case "ko-KR":
      selectedLocale = koKR
      break
    default:
      selectedLocale = enUS
  }
  return selectedLocale
}

export const getCurrentTranslateLanguage = (state: RootState) => {
  const currentUser = state.currentUser
  return currentUser?.language ?? "en-US"
}

export const getGlobalInfoExecutionResult = createSelector(
  [getCurrentUser, getBuilderInfo],
  (currentUserInfo, builderInfo) => {
    const globalInfo: Record<string, any>[] = [
      {
        ...currentUserInfo,
        displayName: "currentUserInfo",
      },
      {
        ...builderInfo,
        displayName: "builderInfo",
      },
    ]
    return globalInfo
  },
)
