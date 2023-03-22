import { Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { GUIDE_SELECT_WIDGET, GUIDE_SQL_QUERY } from "@/components/Guide/config"
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

  if (currentStep < 3) {
    switch (type) {
      case "components/addComponentReducer": {
        const addedWidget = payload[0].type
        const isCurrentStepWidget =
          GUIDE_SELECT_WIDGET[currentStep] === addedWidget
        handleNext(isCurrentStepWidget)
        break
      }
    }
  } else if (currentStep === 3) {
    switch (type) {
      case "config/updateCachedAction": {
        const query = payload?.content?.query
        handleNext(query === GUIDE_SQL_QUERY)
      }
    }
  }
}
