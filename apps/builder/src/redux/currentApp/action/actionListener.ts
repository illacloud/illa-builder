import { AnyAction, Unsubscribe, isAnyOf } from "@reduxjs/toolkit"
import { getIsILLAGuideMode } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import {
  getActionExecutionResult,
  getInDependenciesMap,
  getRawTree,
} from "@/redux/currentApp/executionTree/executionSelector"
import { fetchUpdateAction } from "@/services/action"
import { AppListenerEffectAPI, AppStartListening } from "@/store"
import { registerActionPeriod } from "@/utils/action/runAction"
import { changeDisplayNameHelper } from "@/utils/changeDisplayNameHelper"
import {
  ActionContent,
  ActionItem,
  UpdateActionSlicePropsPayload,
} from "./actionState"

async function handleRemoveActionItem(
  action: ReturnType<typeof actionActions.removeActionItemReducer>,
  listenerApi: AppListenerEffectAPI,
) {
  if (
    action.payload === listenerApi.getState().config.selectedAction?.displayName
  ) {
    listenerApi.dispatch(configActions.changeSelectedAction(null))
  }
}

async function handleUpdateActionItem(
  action: ReturnType<typeof actionActions.updateActionItemReducer>,
  listenerApi: AppListenerEffectAPI,
) {
  if (
    action.payload.actionId ===
    listenerApi.getState().config.selectedAction?.actionId
  ) {
    listenerApi.dispatch(configActions.changeSelectedAction(action.payload))
  }

  const displayName = action.payload.displayName

  const actionExecutionResult = getActionExecutionResult(listenerApi.getState())
  const currentAction = actionExecutionResult[displayName]
  if (
    currentAction &&
    currentAction.config.advancedConfig.isPeriodically &&
    currentAction.config.advancedConfig.periodInterval
  ) {
    const mergedAction = {
      ...currentAction,
      resourceId: currentAction.$resourceId,
      actionId: currentAction.$actionId,
    }
    registerActionPeriod(mergedAction)
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
  listenerApi.dispatch(
    componentsActions.batchUpdateMultiComponentSlicePropsReducer(
      updateWidgetSlice,
    ),
  )
  listenerApi.dispatch(
    actionActions.batchUpdateMultiActionSlicePropsReducer(updateActionSlice),
  )
}

const handleUpdateAsyncEffect = (
  action: AnyAction,
  listenerApi: AppListenerEffectAPI,
) => {
  const rootState = listenerApi.getState()
  const currentSelectedID = rootState.config.selectedAction?.actionId
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
      (item) => item.actionId === currentActionID,
    )
    if (!currentAction) return
    listenerApi.dispatch(configActions.changeSelectedAction(currentAction))
    action.payload.forEach((payloadAction) => {
      const cAction = rootState.currentApp.action.find(
        (item) => item.actionId === payloadAction.actionID,
      )
      if (cAction) {
        allChangedActions.push(cAction)
      }
    })
  } else {
    const { actionID } = action.payload
    if (actionID === rootState.config.selectedAction?.actionId) {
      const currentAction = rootState.currentApp.action.find(
        (item) => item.actionId === actionID,
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
      actionCreator: actionActions.removeActionItemReducer,
      effect: handleRemoveActionItem,
    }),
    startListening({
      actionCreator: actionActions.updateActionItemReducer,
      effect: handleUpdateActionItem,
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
