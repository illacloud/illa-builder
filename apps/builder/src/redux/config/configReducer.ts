import {
  INIT_ACTION_ADVANCED_CONFIG,
  INIT_ACTION_MOCK_CONFIG,
} from "@illa-public/public-configs"
import {
  ActionContent,
  IAdvancedConfig,
  IMockConfig,
} from "@illa-public/public-types"
import { ActionItem } from "@illa-public/public-types"
import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  ConfigInitialState,
  ConfigState,
  IllaMode,
} from "@/redux/config/configState"
import {
  UpdateCanvasShapePayload,
  UpdateWSStatusPayload,
} from "./configPayload"

export const updateLeftPanel: CaseReducer<
  ConfigState,
  PayloadAction<boolean>
> = (state, action) => {
  state.openLeftPanel = action.payload
}

export const updateIllaMode: CaseReducer<
  ConfigState,
  PayloadAction<IllaMode>
> = (state, action) => {
  state.mode = action.payload
}

export const resetConfig: CaseReducer<ConfigState, PayloadAction> = () => {
  return ConfigInitialState
}

export const updateRightPanel: CaseReducer<
  ConfigState,
  PayloadAction<boolean>
> = (state, action) => {
  state.openRightPanel = action.payload
}

export const updateBottomPanel: CaseReducer<
  ConfigState,
  PayloadAction<boolean>
> = (state, action) => {
  state.openBottomPanel = action.payload
}

export const updateDebuggerVisible: CaseReducer<
  ConfigState,
  PayloadAction<boolean>
> = (state, action) => {
  state.openDebugger = action.payload
}

export const updateSelectedComponent: CaseReducer<
  ConfigState,
  PayloadAction<string[]>
> = (state, action) => {
  state.selectedComponents = action.payload
}

export const changeSelectedAction: CaseReducer<
  ConfigState,
  PayloadAction<ActionItem<ActionContent> | null>
> = (state, action) => {
  state.selectedAction = action.payload
}

export const updateCachedAction: CaseReducer<
  ConfigState,
  PayloadAction<ActionItem<ActionContent> | null>
> = (state, action) => {
  state.cachedAction = action.payload
}

export const updateCachedActionAdvancedConfigReducer: CaseReducer<
  ConfigState,
  PayloadAction<Partial<IAdvancedConfig>>
> = (state, action) => {
  const cachedAction = state.cachedAction
  if (!cachedAction) return
  if (!cachedAction.config) {
    cachedAction.config = {
      public: false,
      advancedConfig: INIT_ACTION_ADVANCED_CONFIG,
      mockConfig: INIT_ACTION_MOCK_CONFIG,
    }
  }
  if (!cachedAction.config.advancedConfig) {
    cachedAction.config.advancedConfig = INIT_ACTION_ADVANCED_CONFIG
  }
  cachedAction.config.advancedConfig = {
    ...cachedAction.config.advancedConfig,
    ...action.payload,
  }
  state.cachedAction = cachedAction
}

export const updateCachedActionMockConfigReducer: CaseReducer<
  ConfigState,
  PayloadAction<Partial<IMockConfig>>
> = (state, action) => {
  const cachedAction = state.cachedAction
  if (!cachedAction) return
  if (!cachedAction.config) {
    cachedAction.config = {
      public: false,
      advancedConfig: INIT_ACTION_ADVANCED_CONFIG,
      mockConfig: INIT_ACTION_MOCK_CONFIG,
    }
  }
  if (!cachedAction.config.mockConfig) {
    cachedAction.config.mockConfig = INIT_ACTION_MOCK_CONFIG
  }
  cachedAction.config.mockConfig = {
    ...cachedAction.config.mockConfig,
    ...action.payload,
  }
  state.cachedAction = cachedAction
}

export const updateShowDot: CaseReducer<ConfigState, PayloadAction<boolean>> = (
  state,
  action,
) => {
  state.showDot = action.payload
}

export const plusScale: CaseReducer<ConfigState, PayloadAction<void>> = (
  state,
) => {
  state.scale = state.scale + 10
}

export const minusScale: CaseReducer<ConfigState, PayloadAction<void>> = (
  state,
) => {
  state.scale = state.scale - 10
}

export const clearSelectedComponent: CaseReducer<
  ConfigState,
  PayloadAction<void>
> = (state) => {
  state.selectedComponents = []
}

export const setExpandedKey: CaseReducer<
  ConfigState,
  PayloadAction<string[]>
> = (state, action) => {
  state.expandedKeys = action.payload
}

export const removeExpandedKey: CaseReducer<
  ConfigState,
  PayloadAction<string>
> = (state, action) => {
  const index = state.expandedKeys.findIndex((key) => key === action.payload)
  index > -1 && state.expandedKeys.splice(index, 1)
}

export const updateCanvasShapeReducer: CaseReducer<
  ConfigState,
  PayloadAction<UpdateCanvasShapePayload>
> = (state, action) => {
  const { canvasHeight, canvasWidth } = action.payload
  state.canvasHeight = canvasHeight
  state.canvasWidth = canvasWidth
}

export const updateDevicesOnlineStatusReducer: CaseReducer<
  ConfigState,
  PayloadAction<boolean>
> = (state, action) => {
  state.isOnline = action.payload
}

export const updateWSStatusReducer: CaseReducer<
  ConfigState,
  PayloadAction<UpdateWSStatusPayload>
> = (state, action) => {
  const { context, wsStatus } = action.payload
  state.wsStatus[context] = wsStatus
}

export const updateHoveredComponent: CaseReducer<
  ConfigState,
  PayloadAction<string[]>
> = (state, action) => {
  state.hoveredComponents = action.payload
}

export const resetSelectedActionReducer: CaseReducer<
  ConfigState,
  PayloadAction<string>
> = (state, action) => {
  if (!state.selectedAction) return
  const selectedActionDisplayName = state.selectedAction.displayName
  const selectedActionID = state.selectedAction.actionID
  if (selectedActionDisplayName === action.payload) {
    state.selectedAction = null
  }
  if (!state.cachedAction) return
  if (state.cachedAction.actionID === selectedActionID) {
    state.cachedAction = null
  }
}

export const addExpandedWidgetReducer: CaseReducer<
  ConfigState,
  PayloadAction<string[]>
> = (state, action) => {
  action.payload.forEach((displayName) => {
    state.expandedWidgets[displayName] = true
  })
}

export const removeExpandWidgetReducer: CaseReducer<
  ConfigState,
  PayloadAction<string[]>
> = (state, action) => {
  action.payload.forEach((displayName) => {
    state.expandedWidgets[displayName] = false
  })
}

export const setDraggingNodeIDsReducer: CaseReducer<
  ConfigState,
  PayloadAction<string[]>
> = (state, action) => {
  state.draggingComponentIDs = action.payload
}

export const setResizingNodeIDsReducer: CaseReducer<
  ConfigState,
  PayloadAction<string[]>
> = (state, action) => {
  state.resizingComponentIDs = action.payload
}
