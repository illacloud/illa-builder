import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { Guide } from "@/redux/guide/guideState"

export const updateGuideInfoReducer: CaseReducer<
  Guide,
  PayloadAction<Guide>
> = (state, action) => {
  const { payload } = action
  return payload
}

export const updateCurrentStepReducer: CaseReducer<
  Guide,
  PayloadAction<number>
> = (state, action) => {
  const { payload } = action
  state.currentStep = payload
}

export const updateNextStepReducer: CaseReducer<Guide> = (state) => {
  const { currentStep } = state
  return {
    ...state,
    currentStep: currentStep + 1,
  }
}

export const updateInsideStepReducer: CaseReducer<Guide> = (state) => {
  const { currentStep } = state
  return {
    ...state,
    currentStep: currentStep + 0.1,
  }
}

export const updateGuideStatusReducer: CaseReducer<
  Guide,
  PayloadAction<boolean>
> = (state, action) => {
  if (!state) return
  const { payload } = action
  state.isOpen = payload
}
