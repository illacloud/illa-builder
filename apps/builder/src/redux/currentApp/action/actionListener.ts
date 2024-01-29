import { ActionContent, ActionItem } from "@illa-public/public-types"
import { UnknownAction, Unsubscribe, isAnyOf } from "@reduxjs/toolkit"
import {
  getCachedAction,
  getIsILLAGuideMode,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { getActionExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { fetchBatchUpdateAction } from "@/services/action"
import { AppListenerEffectAPI, AppStartListening } from "@/store"
import { registerActionPeriod } from "@/utils/action/runAction"
import { mixedChangeDisplayNameHelper } from "@/utils/changeDisplayNameHelper"
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

async function handleBatchUpdateActionItem(
  action: ReturnType<typeof actionActions.batchUpdateActionItemReducer>,
  listenerApi: AppListenerEffectAPI,
) {
  const selectedAction = listenerApi.getState().config.selectedAction
  const targetSelectedAction = action.payload.find(
    (action) => action.actionID === selectedAction?.actionID,
  )
  if (targetSelectedAction) {
    listenerApi.dispatch(
      configActions.changeSelectedAction(targetSelectedAction),
    )
  }
}

const handleUpdateDisplayNameEffect = (
  action: ReturnType<typeof actionActions.updateActionDisplayNameReducer>,
  listenerApi: AppListenerEffectAPI,
) => {
  const { oldDisplayName, newDisplayName } = action.payload
  mixedChangeDisplayNameHelper(listenerApi, oldDisplayName, newDisplayName)
}

const handleUpdateAsyncEffect = (
  action: UnknownAction,
  listenerApi: AppListenerEffectAPI,
) => {
  const rootState = listenerApi.getState()
  const currentSelectedID = rootState.config.selectedAction?.actionID
  const allChangedActions: ActionItem<ActionContent>[] = []
  if (actionActions.updateActionDisplayNameReducer.match(action)) {
    const { actionID } = action.payload
    if (actionID === rootState.config.selectedAction?.actionID) {
      const currentAction = rootState.currentApp.action.find(
        (item) => item.actionID === actionID,
      )
      if (!currentAction) return
      const cachedAction = getCachedAction(listenerApi.getState())
      listenerApi.dispatch(configActions.changeSelectedAction(currentAction))
      if (!cachedAction) return
      listenerApi.dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          displayName: action.payload.newDisplayName,
        }),
      )
      allChangedActions.push(currentAction)
    }
  } else if (
    actionActions.batchUpdateMultiActionSlicePropsReducer.match(action)
  ) {
    const currentActionUpdateSlice = action.payload.find(
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
  }

  const isGuideMode = getIsILLAGuideMode(rootState)
  if (allChangedActions.length && !isGuideMode) {
    fetchBatchUpdateAction(allChangedActions)
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
      actionCreator: actionActions.batchUpdateActionItemReducer,
      effect: handleBatchUpdateActionItem,
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
