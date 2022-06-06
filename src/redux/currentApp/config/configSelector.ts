import { RootState } from "@/store"

export const isOpenLeftPanel = (state: RootState) => {
  return state.currentApp.config.openLeftPanel
}

export const isOpenBottomPanel = (state: RootState) => {
  return state.currentApp.config.openBottomPanel
}

export const isOpenRightPanel = (state: RootState) => {
  return state.currentApp.config.openRightPanel
}
