import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { ConfigState, IllaMode } from "@/redux/config/configState"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { cloneDeep } from "lodash"
import { getNewWidgetPropsByUpdateSlice } from "@/utils/componentNode"
import { isObject } from "@/utils/typeHelper"
import { ResourceType } from "@/redux/resource/resourceState"
import { CacheContentPayload } from "@/redux/config/configPayload"

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

export const updateSelectedComponent: CaseReducer<
  ConfigState,
  PayloadAction<ComponentNode[]>
> = (state, action) => {
  state.selectedComponents = action.payload
}

export const updateCacheActionContent: CaseReducer<
  ConfigState,
  PayloadAction<CacheContentPayload>
> = (state, action) => {
  state.cacheActionContent[action.payload.resourceType] = action.payload.content
}

export const clearCacheActionContent: CaseReducer<
  ConfigState,
  PayloadAction<void>
> = (state, action) => {
  state.cacheActionContent = {}
}

export const updateSelectedAction: CaseReducer<
  ConfigState,
  PayloadAction<ActionItem<ActionContent>>
> = (state, action) => {
  state.selectedAction = action.payload
}

export const changeSelectedAction: CaseReducer<
  ConfigState,
  PayloadAction<ActionItem<ActionContent>>
> = (state, action) => {
  state.selectedAction = action.payload
}

export const updateShowDot: CaseReducer<ConfigState, PayloadAction<boolean>> = (
  state,
  action,
) => {
  state.showDot = action.payload
}

export const plusScale: CaseReducer<ConfigState, PayloadAction<void>> = (
  state,
  action,
) => {
  state.scale = state.scale + 10
}

export const minusScale: CaseReducer<ConfigState, PayloadAction<void>> = (
  state,
  action,
) => {
  state.scale = state.scale - 10
}

export const clearSelectedComponent: CaseReducer<
  ConfigState,
  PayloadAction<void>
> = (state, action) => {
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
