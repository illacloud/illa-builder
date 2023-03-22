import { createSlice } from "@reduxjs/toolkit"
import {
  updateCurrentStepReducer,
  updateGuideStatusReducer,
  updateInsideStepReducer,
  updateNextStepReducer,
} from "@/redux/guide/guideReducer"
import { GuideInitialState } from "@/redux/guide/guideState"

const guideSlice = createSlice({
  name: "guide",
  initialState: GuideInitialState,
  reducers: {
    updateCurrentStepReducer,
    updateGuideStatusReducer,
    updateInsideStepReducer,
    updateNextStepReducer,
  },
})

export const guideActions = guideSlice.actions
export default guideSlice.reducer
