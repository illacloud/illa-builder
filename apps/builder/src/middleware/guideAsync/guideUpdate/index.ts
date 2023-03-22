import { Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { GUIDE_SELECT_WIDGET } from "@/components/Guide/config"
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

  if (currentStep < 3) {
    switch (type) {
      case "components/addComponentReducer": {
        const addedWidget = payload[0].type
        const isCurrentStepWidget =
          GUIDE_SELECT_WIDGET[currentStep] === addedWidget
        if (isCurrentStepWidget) {
          dispatch(guideActions.updateNextStepReducer())
        }
        break
      }
    }
  }

  // switch (type) {
  //   case "components/addComponentReducer": {
  //     dispatch(guideActions.updateInsideStepReducer())
  //     break
  //   }
  // }
}
