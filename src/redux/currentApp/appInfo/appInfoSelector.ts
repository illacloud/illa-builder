import { RootState } from "@/store"
import { createSelector } from "@reduxjs/toolkit"

export const getAppInfo = (state: RootState) => {
  return state.currentApp.appInfo
}

export const getAppId = createSelector([getAppInfo], (appInfo) => {
  return appInfo.appId
})
