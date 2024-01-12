import { ActionContent, ActionItem } from "@illa-public/public-types"
import { AnyAction, Unsubscribe, isAnyOf } from "@reduxjs/toolkit"
import { getIsILLAGuideMode } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import {
  getActionExecutionResult,
  getInDependenciesMap,
  getRawTree,
} from "@/redux/currentApp/executionTree/executionSelector"
import { fetchUpdateAction } from "@/services/action"
import { AppListenerEffectAPI, AppStartListening } from "@/store"
import { registerActionPeriod } from "@/utils/action/runAction"
import {
  changeDisplayNameHelper,
  changeEventHandlerReferenceHelper,
  mergeUpdateSlice,
} from "@/utils/changeDisplayNameHelper"
import { getComponentMap } from "../components/componentsSelector"
import { getActionList } from "./actionSelector"
import { UpdateActionSlicePropsPayload } from "./actionState"

async function handleAddActionItemEffect(
  action: ReturnType<typeof actionActions.addActionItemReducer>,
  listenerApi: AppListenerEffectAPI,
) {
  listenerApi.dispatch(configActions.changeSelectedAction(action.payload))
}

async function handleUpdateActionItem(
  action: ReturnType<typeof actionActions.updateActionItemReducer>,
  listenerApi: AppListenerEffectAPI,
) {
  if (
    action.payload.displayName ===
    listenerApi.getState().config.selectedAction?.displayName
  ) {
    listenerApi.dispatch(configActions.changeSelectedAction(action.payload))
  }

  const displayName = action.payload.displayName

  const actionExecutionResult = getActionExecutionResult(listenerApi.getState())
  const currentAction = actionExecutionResult[displayName]
  if (
    currentAction &&
    currentAction?.config?.advancedConfig.isPeriodically &&
    currentAction?.config?.advancedConfig.periodInterval
  ) {
    registerActionPeriod(currentAction)
  }
}

const handleUpdateDisplayNameEffect = (
  action: ReturnType<typeof actionActions.updateActionDisplayNameReducer>,
  listenerApi: AppListenerEffectAPI,
) => {
  const { oldDisplayName, newDisplayName } = action.payload
  const rootState = listenerApi.getState()
  const independenciesMap = getInDependenciesMap(rootState)
  const seeds = getRawTree(rootState)
  const { updateActionSlice, updateWidgetSlice } = changeDisplayNameHelper(
    independenciesMap,
    seeds,
    oldDisplayName,
    newDisplayName,
  )
  const {
    updateActionSlice: updateActionEventSlice,
    updateWidgetSlice: updateWidgetEventSlice,
  } = changeEventHandlerReferenceHelper(
    oldDisplayName,
    newDisplayName,
    getActionList(rootState),
    getComponentMap(rootState),
  )

  const contactedUpdateActionSlices = updateActionSlice.concat(
    ...updateActionEventSlice,
  )
  const contactedUpdateWidgetSlice = updateWidgetSlice.concat(
    ...updateWidgetEventSlice,
  )

  const {
    updateActionSlice: mergedActionSlice,
    updateWidgetSlice: mergedWidgetSlice,
  } = mergeUpdateSlice(contactedUpdateWidgetSlice, contactedUpdateActionSlices)
  listenerApi.dispatch(
    componentsActions.batchUpdateMultiComponentSlicePropsReducer(
      mergedWidgetSlice,
    ),
  )
  listenerApi.dispatch(
    actionActions.batchUpdateMultiActionSlicePropsReducer(mergedActionSlice),
  )
}

const handleUpdateAsyncEffect = (
  action: AnyAction,
  listenerApi: AppListenerEffectAPI,
) => {
  const rootState = listenerApi.getState()
  const currentSelectedID = rootState.config.selectedAction?.actionID
  const allChangedActions: ActionItem<ActionContent>[] = []
  if (Array.isArray(action.payload)) {
    const currentActionUpdateSlice: UpdateActionSlicePropsPayload =
      action.payload.find(
        (item: UpdateActionSlicePropsPayload) =>
          item.actionID === currentSelectedID,
      )
    if (!currentActionUpdateSlice) return
    const currentActionID = currentActionUpdateSlice.actionID
    const currentAction = rootState.currentApp.action.find(
      (item) => item.actionID === currentActionID,
    )
    if (!currentAction) return
    listenerApi.dispatch(configActions.changeSelectedAction(currentAction))
    action.payload.forEach((payloadAction) => {
      const cAction = rootState.currentApp.action.find(
        (item) => item.actionID === payloadAction.actionID,
      )
      if (cAction) {
        allChangedActions.push(cAction)
      }
    })
  } else {
    const { actionID } = action.payload
    if (actionID === rootState.config.selectedAction?.actionID) {
      const currentAction = rootState.currentApp.action.find(
        (item) => item.actionID === actionID,
      )
      if (!currentAction) return
      listenerApi.dispatch(configActions.changeSelectedAction(currentAction))
      allChangedActions.push(currentAction)
    }
  }
  const isGuideMode = getIsILLAGuideMode(rootState)
  if (allChangedActions.length && !isGuideMode) {
    // TODO: it's vary hack,need BE provide new API
    allChangedActions.forEach((action) => {
      fetchUpdateAction(action)
    })
  }
}

export function setupActionListeners(
  startListening: AppStartListening,
): Unsubscribe {
  const subscriptions = [
    startListening({
      actionCreator: actionActions.updateActionItemReducer,
      effect: handleUpdateActionItem,
    }),
    startListening({
      actionCreator: actionActions.addActionItemReducer,
      effect: handleAddActionItemEffect,
    }),
    startListening({
      actionCreator: actionActions.updateActionDisplayNameReducer,
      effect: handleUpdateDisplayNameEffect,
    }),
    startListening({
      matcher: isAnyOf(
        actionActions.updateActionDisplayNameReducer,
        actionActions.batchUpdateMultiActionSlicePropsReducer,
      ),
      effect: handleUpdateAsyncEffect,
    }),
  ]

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe())
  }
}
