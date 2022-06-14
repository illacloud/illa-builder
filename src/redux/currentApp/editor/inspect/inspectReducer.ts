import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  addOrUpdateInspectPayload,
  updateInspectPayload,
} from "@/redux/currentApp/editor/inspect/inspectPayload"
import { InspectState } from "@/redux/currentApp/editor/inspect/inspectState"

export const updateWidgetPanelConfig: CaseReducer<
  InspectState,
  PayloadAction<updateInspectPayload>
> = (state, action) => {
  const { displayName, value } = action.payload
  const oldValue = state[displayName]
  state[displayName] = {
    ...oldValue,
    ...value,
  }
}

export const addOrUpdateWidgetPanelConfig: CaseReducer<
  InspectState,
  PayloadAction<addOrUpdateInspectPayload>
> = (state, action) => {
  const { displayName, defaultProps } = action.payload
  if (!defaultProps.widgetType || !defaultProps.widgetDisplayName) return
  if (!state[displayName]) {
    state[displayName] = defaultProps
    return
  }
  state[displayName] = {
    ...state[displayName],
    ...defaultProps,
  }
}
