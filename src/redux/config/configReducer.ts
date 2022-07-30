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
  ApiMethod,
  BodyContent,
  BodyType,
  RawBody,
  RawBodyContent,
  RawBodyType,
  RestApiAction,
  TextRawBody,
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
    if (content.urlParams.length == 0) {
      content.urlParams.push({ key: "", value: "" } as Params)
    }
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
    if (content.headers.length == 0) {
      content.headers.push({ key: "", value: "" } as Params)
    }
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

export const updateSelectedApiMethod: CaseReducer<
  ConfigState,
  PayloadAction<ApiMethod>
> = (state, action) => {
  const selectedAction = state.selectedAction
  if (selectedAction != null) {
    const content = selectedAction.content as RestApiAction<BodyContent>
    content.method = action.payload
    content.body = null
  }
}

export const updateSelectedApiBodyType: CaseReducer<
  ConfigState,
  PayloadAction<BodyType>
> = (state, action) => {
  const selectedAction = state.selectedAction
  if (selectedAction != null) {
    const content = selectedAction.content as RestApiAction<BodyContent>
    content.bodyType = action.payload
    switch (action.payload) {
      case "none":
        content.body = null
        break
      case "form-data":
        content.body = [{ key: "", value: "" } as Params]
        break
      case "x-www-form-urlencoded":
        content.body = [{ key: "", value: "" } as Params]
        break
      case "raw":
        content.body = {
          type: "text",
          content: "",
        } as RawBody<TextRawBody>
        break
      case "binary":
        content.body = ""
        break
    }
  }
}

export const updateSelectedApiBody: CaseReducer<
  ConfigState,
  PayloadAction<BodyContent>
> = (state, action) => {
  const selectedAction = state.selectedAction
  if (selectedAction != null) {
    const content = selectedAction.content as RestApiAction<BodyContent>
    console.log(action.payload)
    content.body = action.payload
  }
}

export const updateSelectedApiRawBodyType: CaseReducer<
  ConfigState,
  PayloadAction<RawBodyType>
> = (state, action) => {
  const selectedAction = state.selectedAction
  if (selectedAction != null) {
    const content = selectedAction.content as RestApiAction<BodyContent>
    if (content.bodyType === "raw") {
      content.body = {
        type: action.payload,
        content: "",
      }
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
    if (content.cookies.length == 0) {
      content.cookies.push({ key: "", value: "" } as Params)
    }
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
