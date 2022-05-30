import { RootState } from "@/store"

export const getAppInfo = (state: RootState) => {
  return state.currentApp.appInfo
}
