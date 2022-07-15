import { createSlice } from "@reduxjs/toolkit"
import { ConfigInitialState } from "@/redux/config/configState"
import {
  clearSelectedComponent,
  minusScale,
  plusScale,
  setExpandedKey,
  updateBottomPanel,
  updateIllaMode,
  updateLeftPanel,
  updateRightPanel,
  updateSelectedAction,
  updateSelectedComponent,
  updateShowDot,
  removeExpandedKey,
  updateSelectActionTemplate,
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
    clearSelectedComponent,
    updateSelectedAction,
    plusScale,
    minusScale,
    setExpandedKey,
    removeExpandedKey,
    updateSelectActionTemplate,
  },
})

export const configActions = configSlice.actions
export default configSlice.reducer
