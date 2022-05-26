import { createSlice } from "@reduxjs/toolkit"
import { panelConfigInitialState } from "./panelConfigState"
import { switchPanelState } from "./panelConfigReducer"

const panelConfigSlice = createSlice({
  name: "panelConfig",
  initialState: panelConfigInitialState,
  reducers: {
    switchPanelState,
  },
})

export const panelConfigActions = panelConfigSlice.actions
export default panelConfigSlice.reducer
