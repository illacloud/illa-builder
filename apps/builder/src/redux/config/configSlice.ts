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
  updateCanvasShapeReducer,
  updateDebuggerVisible,
  updateDevicesOnlineStatusReducer,
  updateDraggingStateReducer,
  updateFreezeStateReducer,
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
    plusScale,
    minusScale,
    setExpandedKey,
    removeExpandedKey,
    updateFreezeStateReducer,
    updateCanvasShapeReducer,
    updateDevicesOnlineStatusReducer,
    updateDraggingStateReducer,
    updateWSStatusReducer,
  },
})

export const configActions = configSlice.actions
export default configSlice.reducer
