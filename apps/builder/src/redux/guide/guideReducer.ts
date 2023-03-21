import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { Guide } from "@/redux/guide/guideState"

export const updateCurrentStepReducer: CaseReducer<
  Guide,
  PayloadAction<number>
> = (state, action) => {
  const { payload } = action
  return {
    ...state,
    currentStep: payload,
  }
}

export const updateGuideStatusReducer: CaseReducer<
  Guide,
  PayloadAction<boolean>
> = (state, action) => {
  if (!state) return
  const { payload } = action
  return {
    ...state,
    isOpen: payload,
  }
}
