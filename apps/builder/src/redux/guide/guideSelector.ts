import { createSelector } from "@reduxjs/toolkit"
import { guideConfig } from "@/components/Guide/config"
import { getCurrentId, getTeamItems } from "@/redux/team/teamSelector"
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
    return guideConfig[currentStep]
  },
)
