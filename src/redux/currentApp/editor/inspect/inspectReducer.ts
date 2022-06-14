import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  addInspectPayload,
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

export const addWidgetPanelConfig: CaseReducer<
  InspectState,
  PayloadAction<addInspectPayload>
> = (state, action) => {
  const { displayName, defaultProps } = action.payload
  state[displayName] = defaultProps
}
