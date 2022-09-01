import { AnyAction, isAnyOf, Unsubscribe } from "@reduxjs/toolkit"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { AppListenerEffectAPI, AppStartListening } from "@/store"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import {
  getExecutionResult,
  getRawTree,
} from "@/redux/currentApp/executionTree/executionSelector"
import dependenciesTreeWorker from "@/utils/worker/index?worker"
import { diff } from "deep-diff"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { RawTreeShape } from "@/utils/executionTreeHelper/interface"
import { actionDisplayNameMapFetchResult } from "@/page/App/components/Actions/ActionPanel/utils/runAction"
import { ExecutionTreeFactory } from "@/utils/executionTreeHelper/executionTreeFactory"

export const worker = new dependenciesTreeWorker()

const mergeActionResult = (rawTree: RawTreeShape) => {
  Object.keys(actionDisplayNameMapFetchResult).forEach((key) => {
    rawTree[key].data = actionDisplayNameMapFetchResult[key] || {}
  })
}

async function handleStartExecution(
  action: AnyAction,
  listenerApi: AppListenerEffectAPI,
) {
  const rootState = listenerApi.getState()
  const rawTree = getRawTree(rootState)
  if (!rawTree) return
  mergeActionResult(rawTree)
  if (action.type === "execution/updateExecutionByDisplayNameReducer") {
    const { displayName, value } = action.payload
    Object.keys(value).forEach((key) => {
      rawTree[displayName][key] = value[key]
    })
  }

  const executionTree = new ExecutionTreeFactory()
  const executionResult = executionTree.initTree(rawTree)
  const errorTree = executionResult.errorTree
  const evaluatedTree = executionResult.evaluatedTree
  const dependencyMap = executionResult.dependencyTree

  const oldExecutionTree = getExecutionResult(rootState)
  const updates = diff(oldExecutionTree, evaluatedTree) || []
  listenerApi.dispatch(
    executionActions.setExecutionResultReducer({
      updates,
    }),
  )
  listenerApi.dispatch(
    executionActions.setDependenciesReducer({
      ...dependencyMap,
    }),
  )
  listenerApi.dispatch(
    executionActions.setExecutionErrorReducer({
      ...errorTree,
    }),
  )
}

export function setupExecutionListeners(
  startListening: AppStartListening,
): Unsubscribe {
  const subscriptions = [
    startListening({
      matcher: isAnyOf(
        componentsActions.addComponentReducer,
        componentsActions.updateComponentPropsReducer,
        componentsActions.deleteComponentNodeReducer,
        componentsActions.copyComponentNodeReducer,
        componentsActions.updateComponentDisplayNameReducer,
        actionActions.addActionItemReducer,
        actionActions.removeActionItemReducer,
        actionActions.updateActionItemReducer,
        executionActions.startExecutionReducer,
        executionActions.updateExecutionByDisplayNameReducer,
      ),
      effect: handleStartExecution,
    }),
  ]

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe())
  }
}
