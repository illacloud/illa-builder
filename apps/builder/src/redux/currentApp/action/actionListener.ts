import { AnyAction, Unsubscribe, isAnyOf } from "@reduxjs/toolkit"
import { BuilderApi } from "@/api/base"
import { getIsILLAGuideMode } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { getAppId } from "@/redux/currentApp/appInfo/appInfoSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import {
  getInDependenciesMap,
  getRawTree,
} from "@/redux/currentApp/executionTree/executionSelector"
import { AppListenerEffectAPI, AppStartListening } from "@/store"
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
  action: AnyAction,
  listenerApi: AppListenerEffectAPI,
) {
  if (
    action.payload.actionId ===
    listenerApi.getState().config.selectedAction?.actionId
  ) {
    listenerApi.dispatch(configActions.changeSelectedAction(action.payload))
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
  const currentAppID = getAppId(rootState)
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
      BuilderApi.teamRequest({
        method: "PUT",
        url: `/apps/${currentAppID}/actions/${action.actionId}`,
        data: action,
      })
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
