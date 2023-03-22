import { createSlice } from "@reduxjs/toolkit"
import {
  nextStepReducer,
  updateCurrentStepReducer,
  updateGuideStatusReducer,
} from "@/redux/guide/guideReducer"
import { GuideInitialState } from "@/redux/guide/guideState"

const guideSlice = createSlice({
  name: "guide",
  initialState: GuideInitialState,
  reducers: {
    updateCurrentStepReducer,
    updateGuideStatusReducer,
    nextStepReducer,
  },
})

export const guideActions = guideSlice.actions
export default guideSlice.reducer
