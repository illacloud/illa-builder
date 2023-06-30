import { createSlice } from "@reduxjs/toolkit"
import {
  changeSelectedAction,
  clearSelectedComponent,
  minusScale,
  plusScale,
  removeExpandedKey,
  resetConfig,
  setExpandedKey,
  updateBottomPanel,
  updateCachedAction,
  updateCachedActionAdvancedConfigReducer,
  updateCanvasShapeReducer,
  updateDebuggerVisible,
  updateDevicesOnlineStatusReducer,
  updateHoveredComponent,
  updateIllaMode,
  updateLeftPanel,
  updateRightPanel,
  updateSelectedComponent,
  updateShowDot,
  updateWSStatusReducer,
} from "@/redux/config/configReducer"
import { ConfigInitialState } from "@/redux/config/configState"

const configSlice = createSlice({
  name: "config",
  initialState: ConfigInitialState,
  reducers: {
    resetConfig,
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
    updateCachedActionAdvancedConfigReducer,
    plusScale,
    minusScale,
    setExpandedKey,
    removeExpandedKey,
    updateCanvasShapeReducer,
    updateDevicesOnlineStatusReducer,
    updateWSStatusReducer,
    updateHoveredComponent,
  },
})

export const configActions = configSlice.actions
export default configSlice.reducer
