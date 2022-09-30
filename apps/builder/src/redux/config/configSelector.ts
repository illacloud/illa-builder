import { RootState } from "@/store"
import { createSelector } from "@reduxjs/toolkit"

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

export const getSelectedContent = (state: RootState) => {
  if (state.config.selectedAction) {
    return state.config.cacheActionContent[
      state.config.selectedAction.actionType
    ]
  } else {
    return null
  }
}

export const isCurrentSelectedActionChanged = (state: RootState) => {
  const originAction = state.currentApp.action.find(v => {
    return v.displayName === state.config.selectedAction?.displayName
  })
  return (
    JSON.stringify(state.config.selectedAction) !== JSON.stringify(originAction)
  )
}

export const isSelected = (state: RootState, displayName: string) => {
  return (
    state.config.selectedComponents.findIndex(value => {
      return value.displayName == displayName
    }) != -1
  )
}

export const getExpandedKeys = (state: RootState) => {
  return state.config.expandedKeys
}

export const getSelectedComponentsDisplayName = createSelector(
  [getSelectedComponents],
  selectedComponents => {
    return selectedComponents.map(component => component.displayName)
  },
)
