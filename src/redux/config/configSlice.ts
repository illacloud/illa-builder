import { createSlice } from "@reduxjs/toolkit"
import { ConfigInitialState } from "@/redux/config/configState"
import {
  updateBottomPanel,
  updateLeftPanel,
  updateRightPanel,
  plusScale,
  minusScale,
  updateSelectedComponent,
  updateSelectedAction,
  updateShowDot,
  clearSelectedComponent,
  setExpandedKey,
} from "@/redux/config/configReducer"

const configSlice = createSlice({
  name: "builderInfo",
  initialState: ConfigInitialState,
  reducers: {
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
  },
})

export const configActions = configSlice.actions
export default configSlice.reducer
