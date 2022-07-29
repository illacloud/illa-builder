import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { ConfigState, IllaMode } from "@/redux/config/configState"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import {
  CacheContentPayload,
  UpdateParamsPayload,
} from "@/redux/config/configPayload"
import {
  BodyContent,
  RestApiAction,
} from "@/redux/currentApp/action/restapiAction"
import { Params } from "../resource/resourceState"

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

export const addOrUpdateSelectedApiUrlParams: CaseReducer<
  ConfigState,
  PayloadAction<UpdateParamsPayload>
> = (state, action) => {
  const selectedAction = state.selectedAction
  if (selectedAction != null) {
    const content = selectedAction.content as RestApiAction<BodyContent>
    if (action.payload.index < content.urlParams.length) {
      content.urlParams[action.payload.index] = action.payload.params
    } else {
      content.urlParams.push(action.payload.params)
    }
  }
}

export const addSelectedApiEmptyUrlParams: CaseReducer<
  ConfigState,
  PayloadAction<void>
> = (state, action) => {
  const selectedAction = state.selectedAction
  if (selectedAction != null) {
    const content = selectedAction.content as RestApiAction<BodyContent>
    content.urlParams.push({ key: "", value: "" } as Params)
  }
}

export const removeSelectedApiUrlParams: CaseReducer<
  ConfigState,
  PayloadAction<UpdateParamsPayload>
> = (state, action) => {
  const selectedAction = state.selectedAction
  if (selectedAction != null) {
    const content = selectedAction.content as RestApiAction<BodyContent>
    content.urlParams.splice(action.payload.index, 1)
  }
}

export const addOrUpdateSelectedApiHeaders: CaseReducer<
  ConfigState,
  PayloadAction<UpdateParamsPayload>
> = (state, action) => {
  const selectedAction = state.selectedAction
  if (selectedAction != null) {
    const content = selectedAction.content as RestApiAction<BodyContent>
    if (action.payload.index < content.headers.length) {
      content.headers[action.payload.index] = action.payload.params
    } else {
      content.headers.push(action.payload.params)
    }
  }
}

export const addSelectedApiEmptyHeaders: CaseReducer<
  ConfigState,
  PayloadAction<void>
> = (state, action) => {
  const selectedAction = state.selectedAction
  if (selectedAction != null) {
    const content = selectedAction.content as RestApiAction<BodyContent>
    content.headers.push({ key: "", value: "" } as Params)
  }
}

export const removeSelectedApiHeaders: CaseReducer<
  ConfigState,
  PayloadAction<UpdateParamsPayload>
> = (state, action) => {
  const selectedAction = state.selectedAction
  if (selectedAction != null) {
    const content = selectedAction.content as RestApiAction<BodyContent>
    content.headers.splice(action.payload.index, 1)
  }
}

export const addOrUpdateSelectedApiCookies: CaseReducer<
  ConfigState,
  PayloadAction<UpdateParamsPayload>
> = (state, action) => {
  const selectedAction = state.selectedAction
  if (selectedAction != null) {
    const content = selectedAction.content as RestApiAction<BodyContent>
    if (action.payload.index < content.cookies.length) {
      content.cookies[action.payload.index] = action.payload.params
    } else {
      content.cookies.push(action.payload.params)
    }
  }
}

export const addSelectedApiEmptyCookies: CaseReducer<
  ConfigState,
  PayloadAction<void>
> = (state, action) => {
  const selectedAction = state.selectedAction
  if (selectedAction != null) {
    const content = selectedAction.content as RestApiAction<BodyContent>
    content.cookies.push({ key: "", value: "" } as Params)
  }
}

export const removeSelectedApiCookies: CaseReducer<
  ConfigState,
  PayloadAction<UpdateParamsPayload>
> = (state, action) => {
  const selectedAction = state.selectedAction
  if (selectedAction != null) {
    const content = selectedAction.content as RestApiAction<BodyContent>
    content.cookies.splice(action.payload.index, 1)
  }
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
