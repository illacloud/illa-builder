import { createSlice } from "@reduxjs/toolkit"
import { InspectStateInitial } from "@/redux/inspect/inspectState"
import { updateWidgetPanelConfig } from "@/redux/inspect/inspectReducer"

const inspectSlice = createSlice({
  name: "inspect",
  initialState: InspectStateInitial,
  reducers: {
    updateWidgetPanelConfig,
  },
})

export const inspectActions = inspectSlice.actions

export default inspectSlice.reducer
