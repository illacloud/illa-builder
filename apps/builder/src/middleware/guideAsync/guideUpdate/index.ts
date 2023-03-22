import { Dispatch, PayloadAction } from "@reduxjs/toolkit"
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
        console.log(payload, "addComponentReducer payload")
        if (payload) dispatch(guideActions.updateNextStepReducer())
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
