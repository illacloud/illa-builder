import { Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { get } from "lodash"
import {
  GUIDE_SELECT_WIDGET,
  GUIDE_SQL_QUERY,
  GUIDE_STEP,
} from "@/config/guide/config"
import { getCurrentStep } from "@/redux/guide/guideSelector"
import { guideActions } from "@/redux/guide/guideSlice"
import { RootState } from "@/store"

export const guideUpdate = (
  rootState: RootState,
  dispatch: Dispatch,
  action: PayloadAction<any>,
) => {
  const { type, payload } = action
  const typeList = type.split("/")
  const reduxType = typeList[0]
  const reduxAction = typeList[1]
  const currentStep = getCurrentStep(rootState)

  const handleNext = (goNext: boolean) => {
    if (goNext) {
      dispatch(guideActions.updateCurrentStepReducer(currentStep + 1))
    }
  }

  switch (currentStep) {
    case 0:
    case 1:
    case 2: {
      if (type === "components/addComponentReducer") {
        // exclude the case of doItForMe
        if (payload.length === 1) {
          const addedWidget = payload[0].type
          const isCurrentStepWidget =
            GUIDE_SELECT_WIDGET[currentStep] === addedWidget
          handleNext(isCurrentStepWidget)
        }
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
    case 4: {
      if (type === "execution/updateExecutionByDisplayNameReducer") {
        const query = payload.displayName
        handleNext(query === "postgresql1")
      }
      break
    }
    case 5:
    case 7: {
      const { reduxAction, displayName } = GUIDE_STEP[currentStep]
      console.log(reduxAction, type, payload, displayName, "guideUpdate")
      if (reduxAction === type) {
        const selectedWidget = (payload as string[])[0]
        console.log(selectedWidget, "currentStep")
        const isCurrentStepWidget = selectedWidget === displayName
        handleNext(isCurrentStepWidget)
      }
      break
    }
    case 6: {
      if (type === "components/updateComponentPropsReducer") {
        const dataSourceJS = get(payload, "updateSlice.dataSourceJS")
        handleNext(dataSourceJS === "{{postgresql1.data}}")
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
