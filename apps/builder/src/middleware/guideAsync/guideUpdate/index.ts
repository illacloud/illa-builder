import { Dispatch, PayloadAction } from "@reduxjs/toolkit"
import {
  GUIDE_SELECT_WIDGET,
  GUIDE_SQL_QUERY,
  GUIDE_STEP,
} from "@/components/Guide/config"
import { getCurrentStep } from "@/redux/guide/guideSelector"
import { guideActions } from "@/redux/guide/guideSlice"
import { RootState } from "@/store"

export const guideUpdate = (
  rootState: RootState,
  dispatch: Dispatch,
  action: PayloadAction<any>,
) => {
  const { type, payload } = action
  const currentStep = getCurrentStep(rootState)

  const handleNext = (goNext: boolean) => {
    if (goNext) {
      dispatch(guideActions.updateNextStepReducer())
    }
  }

  switch (currentStep) {
    case 0:
    case 1:
    case 2: {
      if (type === "components/addComponentReducer") {
        const addedWidget = payload[0].type
        const isCurrentStepWidget =
          GUIDE_SELECT_WIDGET[currentStep] === addedWidget
        handleNext(isCurrentStepWidget)
      }
      break
    }
    case 3: {
      if (type === "config/updateCachedAction") {
        const query = payload?.content?.query
        handleNext(query === GUIDE_SQL_QUERY)
      }
      break
    }
    case 6:
    case 8: {
      const { reduxAction, selector } = GUIDE_STEP[currentStep]
      if (reduxAction === type) {
        const selectedWidget = (payload as string[])[0]
        const isCurrentStepWidget = selectedWidget === selector
        handleNext(isCurrentStepWidget)
      }
      break
    }
    default: {
      const { reduxAction, selector } = GUIDE_STEP[currentStep]
      if (reduxAction === type) {
        const selectedWidget = (payload as string[])[0]
        const isCurrentStepWidget = selectedWidget === selector
        handleNext(isCurrentStepWidget)
      }
    }
  }
}
