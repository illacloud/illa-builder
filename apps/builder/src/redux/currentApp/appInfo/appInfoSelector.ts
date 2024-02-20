import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "@/store"

export const getAppInfo = (state: RootState) => {
  return state.currentApp.appInfo
}

export const getCurrentAppWaterMarkConfig = (state: RootState) => {
  return state.currentApp.appInfo?.config?.waterMark
}

export const getAppId = createSelector([getAppInfo], (appInfo) => {
  return appInfo.appId
})

export const getAPPType = createSelector(
  [getAppInfo],
  (appInfo) => appInfo.config.appType,
)

export const getIsMobileApp = createSelector(
  [getAPPType],
  (appType) => appType === "mobile",
)
