import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "@/store"

export const getAppInfo = (state: RootState) => {
  return state.currentApp.appInfo
}

export const getCurrentAppWaterMarkConfig = (state: RootState) => {
  return state.currentApp.appInfo?.config?.removeWaterMark
}

export const getAppId = createSelector([getAppInfo], (appInfo) => {
  return appInfo.appId
})
