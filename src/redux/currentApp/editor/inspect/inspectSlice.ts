import { createSlice } from "@reduxjs/toolkit"
import { InspectStateInitial } from "@/redux/currentApp/editor/inspect/inspectState"
import {
  addWidgetPanelConfig,
  updateWidgetPanelConfig,
} from "@/redux/currentApp/editor/inspect/inspectReducer"

const inspectSlice = createSlice({
  name: "inspect",
  initialState: InspectStateInitial,
  reducers: {
    updateWidgetPanelConfig,
    addWidgetPanelConfig,
  },
})

export const inspectActions = inspectSlice.actions

export default inspectSlice.reducer
