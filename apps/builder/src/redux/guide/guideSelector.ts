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
