import { RootState } from "@/store"

export const isOpenLeftPanel = (state: RootState) => {
  return state.config.openLeftPanel && state.config.mode === "edit"
}

export const isOpenBottomPanel = (state: RootState) => {
  return state.config.openBottomPanel && state.config.mode === "edit"
}

export const isOpenRightPanel = (state: RootState) => {
  return state.config.openRightPanel && state.config.mode === "edit"
}

export const isOpenDebugger = (state: RootState) => {
  return state.config.openDebugger && state.config.mode === "edit"
}

export const getPreviewEdgeWidth = (state: RootState) => {
  return state.config.mode === "edit" ? 18 : 0
}

export const getIllaMode = (state: RootState) => {
  return state.config.mode
}

export const isShowDot = (state: RootState) => {
  return state.config.showDot && state.config.mode === "edit"
}

export const getScale = (state: RootState) => {
  return state.config.scale
}

export const getSelectedComponents = (state: RootState) => {
  return state.config.selectedComponents
}

export const getSelectedAction = (state: RootState) => {
  return state.config.selectedAction
}

export const isSelected = (state: RootState, displayName: string) => {
  return (
    state.config.selectedComponents.findIndex(value => {
      return value == displayName
    }) != -1
  )
}

export const getExpandedKeys = (state: RootState) => {
  return state.config.expandedKeys
}
