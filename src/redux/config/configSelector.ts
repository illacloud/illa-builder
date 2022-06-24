import { RootState } from "@/store"
import { createSelector } from "@reduxjs/toolkit"

export const isOpenLeftPanel = (state: RootState) => {
  return state.config.openLeftPanel
}

export const isOpenBottomPanel = (state: RootState) => {
  return state.config.openBottomPanel
}

export const isOpenRightPanel = (state: RootState) => {
  return state.config.openRightPanel
}

export const isShowDot = (state: RootState) => {
  return state.config.showDot
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
    state.config.selectedComponents.findIndex((value) => {
      return value.displayName == displayName
    }) != -1
  )
}

export const getSelectedComponentsDisplayName = createSelector(
  [getSelectedComponents],
  (selectedComponents) => {
    return selectedComponents.map((component) => component.displayName)
  },
)
