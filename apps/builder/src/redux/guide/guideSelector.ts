import { createSelector } from "@reduxjs/toolkit"
import { GUIDE_STEP } from "@/config/guide/config"
import { RootState } from "@/store"

export const getGuideInfo = (state: RootState) => {
  return state.guide
}

export const getCurrentStep = (state: RootState) => {
  return state.guide.currentStep
}

export const getGuideStatus = (state: RootState) => {
  return state.guide.isOpen
}

export const getCurrentStepInfo = createSelector(
  [getCurrentStep],
  (currentStep) => {
    return GUIDE_STEP[currentStep]
  },
)
