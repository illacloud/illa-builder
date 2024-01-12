import { Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { get, isObject } from "lodash-es"
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
      if (reduxAction === type) {
        const selectedWidget = (payload as string[])[0]
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
    case 8: {
      if (type === "components/updateComponentPropsReducer") {
        const displayName = payload.displayName
        const events = payload?.updateSlice?.events
        if (Array.isArray(events) && displayName === "button1") {
          const newEvent = events[events.length - 1]
          handleNext(
            newEvent?.targetId === "query1" && newEvent?.type === "datasource",
          )
        }
      }
      break
    }
    case 9: {
      if (type === "components/updateComponentPropsReducer") {
        const displayName = payload.displayName
        const updateSlice = payload.updateSlice
        if (isObject(updateSlice) && displayName === "button1") {
          const actionType = Object.values(updateSlice).reduce(
            (result, value) => {
              if (value?.actionType) {
                return value.actionType === "datasource"
              }
              return undefined
            },
          )
          handleNext(actionType)
        }
      }
      break
    }
    case 10: {
      if (type === "components/updateComponentPropsReducer") {
        const displayName = payload.displayName
        const updateSlice = payload.updateSlice
        if (isObject(updateSlice) && displayName === "button1") {
          const queryID = Object.values(updateSlice).reduce((result, value) => {
            if (value?.actionType) {
              return value.queryID === "postgresql1"
            }
            return undefined
          })
          handleNext(queryID)
        }
      }
      break
    }
  }
}
