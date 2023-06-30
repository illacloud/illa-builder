import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { INIT_ACTION_ADVANCED_CONFIG } from "@/page/App/components/Actions/AdvancedPanel/constant"
import {
  ConfigInitialState,
  ConfigState,
  IllaMode,
} from "@/redux/config/configState"
import {
  ActionContent,
  ActionItem,
  IAdvancedConfig,
} from "@/redux/currentApp/action/actionState"
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
