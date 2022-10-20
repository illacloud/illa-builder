import { createSlice } from "@reduxjs/toolkit"
import { ConfigInitialState } from "@/redux/config/configState"
import {
  changeSelectedAction,
  clearSelectedComponent,
  minusScale,
  plusScale,
  removeExpandedKey,
  setExpandedKey,
  updateBottomPanel,
  updateCachedAction,
  updateDebuggerVisible,
  updateFreezeStateReducer,
  updateIllaMode,
  updateLeftPanel,
  updateRightPanel,
  updateSelectedComponent,
  updateShowDot,
} from "@/redux/config/configReducer"

const configSlice = createSlice({
  name: "builderInfo",
  initialState: ConfigInitialState,
  reducers: {
    updateIllaMode,
    updateLeftPanel,
    updateRightPanel,
    updateBottomPanel,
    updateDebuggerVisible,
    updateShowDot,
    updateSelectedComponent,
    clearSelectedComponent,
    changeSelectedAction,
    updateCachedAction,
    plusScale,
    minusScale,
    setExpandedKey,
    removeExpandedKey,
    updateFreezeStateReducer,
  },
})

export const configActions = configSlice.actions
export default configSlice.reducer
