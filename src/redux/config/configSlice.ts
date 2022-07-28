import { createSlice } from "@reduxjs/toolkit"
import { ConfigInitialState } from "@/redux/config/configState"
import {
  changeSelectedAction,
  clearCacheActionContent,
  clearSelectedComponent,
  minusScale,
  plusScale,
  removeExpandedKey,
  setExpandedKey,
  updateBottomPanel,
  updateCacheActionContent,
  updateIllaMode,
  updateLeftPanel,
  updateRightPanel,
  updateSelectedAction,
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
    updateShowDot,
    updateSelectedComponent,
    updateCacheActionContent,
    clearCacheActionContent,
    clearSelectedComponent,
    updateSelectedAction,
    changeSelectedAction,
    plusScale,
    minusScale,
    setExpandedKey,
    removeExpandedKey,
  },
})

export const configActions = configSlice.actions
export default configSlice.reducer
