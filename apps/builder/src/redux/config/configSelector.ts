import { INIT_ACTION_ADVANCED_CONFIG } from "@illa-public/public-configs"
import { ACTION_RUN_TIME } from "@illa-public/public-types"
import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "@/store"

export const getEditorConfig = (state: RootState) => {
  return state.config
}

const isEditMode = (state: RootState) => {
  return state.config.mode === "edit" || state.config.mode === "template-edit"
}

export const isOpenLeftPanel = (state: RootState) => {
  return state.config.openLeftPanel && isEditMode(state)
}

export const isOpenBottomPanel = (state: RootState) => {
  return state.config.openBottomPanel && isEditMode(state)
}

export const isOpenRightPanel = (state: RootState) => {
  return state.config.openRightPanel && isEditMode(state)
}

export const isOpenDebugger = (state: RootState) => {
  return state.config.openDebugger && isEditMode(state)
}

export const getPreviewEdgeWidth = (state: RootState) => {
  return state.config.mode === "edit" ? 16 : 0
}

export const getIllaMode = (state: RootState) => {
  return state.config.mode
}

export const isShowDot = createSelector(
  [getEditorConfig, isEditMode],
  (editorConfig, isEditMode) => {
    return editorConfig.showDot && isEditMode
  },
)

export const getScale = (state: RootState) => {
  return state.config.scale
}

export const getSelectedComponentDisplayNames = createSelector(
  [getEditorConfig],
  (editorConfig) => {
    return editorConfig.selectedComponents
  },
)

export const getSelectedAction = (state: RootState) => {
  return state.config.selectedAction
}

export const getCachedAction = (state: RootState) => {
  return state.config.cachedAction
}

export const isSelected = (state: RootState, displayName: string) => {
  return (
    state.config.selectedComponents.findIndex((value) => {
      return value == displayName
    }) != -1
  )
}

export const getExpandedKeys = (state: RootState) => {
  return state.config.expandedKeys
}

export const getCanvasShape = createSelector(
  [getEditorConfig],
  (editorConfig) => {
    return {
      canvasWidth: editorConfig.canvasWidth,
      canvasHeight: editorConfig.canvasHeight,
    }
  },
)

export const getIsOnline = (state: RootState) => {
  return state.config.isOnline
}

export const getIsILLAEditMode = (state: RootState) => {
  return state.config.mode === "edit" || state.config.mode === "template-edit"
}

export const getIsILLAGuideMode = (state: RootState) => {
  return state.config.mode === "template-edit"
}

export const getIsILLAPreviewMode = (state: RootState) => {
  return state.config.mode === "preview"
}

export const getIsILLAProductMode = (state: RootState) => {
  return state.config.mode === "production"
}

export const getIsLikeProductMode = createSelector(
  [getEditorConfig],
  (editorConfig) => {
    return editorConfig.mode === "preview" || editorConfig.mode === "production"
  },
)

export const getWSStatus = (state: RootState) => {
  return state.config.wsStatus
}

export const getDashboardWSStatus = (state: RootState) => {
  return state.config.wsStatus.DASHBOARD
}

export const getAppWSStatus = (state: RootState) => {
  return state.config.wsStatus.APP
}

export const getAgentWSStatus = (state: RootState) => {
  return state.config.wsStatus.AI_AGENT
}

export const getHoveredComponents = createSelector(
  [getEditorConfig],
  (editorConfig) => {
    return editorConfig.hoveredComponents
  },
)

export const getCachedActionAdvancedConfig = createSelector(
  [getCachedAction],
  (cachedAction) => {
    if (
      !cachedAction ||
      !cachedAction?.config ||
      !cachedAction?.config?.advancedConfig
    ) {
      const initAdvancedConfig = INIT_ACTION_ADVANCED_CONFIG
      if (cachedAction?.triggerMode === "automate") {
        initAdvancedConfig.runtime = ACTION_RUN_TIME.APP_LOADED
      }
      return initAdvancedConfig
    }
    return cachedAction.config.advancedConfig
  },
)

export const getExpandedWidgets = createSelector(
  [getEditorConfig],
  (config) => config.expandedWidgets,
)
