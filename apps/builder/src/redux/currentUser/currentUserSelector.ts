import { createSelector } from "@reduxjs/toolkit"
import { Locale, enUS, zhCN } from "@illa-design/react"
import { getBuilderInfo } from "@/redux/builderInfo/builderInfoSelector"
import { RootState } from "@/store"

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
