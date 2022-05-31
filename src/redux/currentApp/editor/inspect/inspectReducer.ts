import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { updateInspectPayload } from "@/redux/currentApp/editor/inspect/inspectPayload"
import { InspectState } from "@/redux/currentApp/editor/inspect/inspectState"

export const updateWidgetPanelConfig: CaseReducer<
  InspectState,
  PayloadAction<updateInspectPayload>
> = (state, action) => {
  const { id, value } = action.payload
  const oldValue = state[id]
  if (!oldValue) {
    state[id] = value
    return
  }

  state[id] = {
    ...oldValue,
    ...value,
  }
}
