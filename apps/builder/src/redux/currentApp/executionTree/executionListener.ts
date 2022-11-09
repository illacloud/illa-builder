import { AnyAction, isAnyOf, Unsubscribe } from "@reduxjs/toolkit"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { AppListenerEffectAPI, AppStartListening } from "@/store"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import {
  getExecutionResult,
  getRawTree,
} from "@/redux/currentApp/executionTree/executionSelector"
import { diff } from "deep-diff"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { RawTreeShape } from "@/utils/executionTreeHelper/interface"
import { actionDisplayNameMapFetchResult } from "@/page/App/components/Actions/ActionPanel/utils/runAction"
import { ExecutionTreeFactory } from "@/utils/executionTreeHelper/executionTreeFactory"

export let executionTree: ExecutionTreeFactory | undefined

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
  const oldExecutionTree = getExecutionResult(rootState)
  if (!executionTree) {
    executionTree = new ExecutionTreeFactory()
    const executionResult = executionTree.initTree(rawTree)
    const errorTree = executionResult.errorTree
    const evaluatedTree = executionResult.evaluatedTree
    const dependencyMap = executionResult.dependencyTree
    const debuggerData = executionResult.debuggerData

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
    listenerApi.dispatch(
      executionActions.setExecutionDebuggerDataReducer({
        ...debuggerData,
      }),
    )
  } else {
    const executionResult = executionTree.updateTree(rawTree)
    const errorTree = executionResult.errorTree
    const evaluatedTree = executionResult.evaluatedTree
    const dependencyMap = executionResult.dependencyTree
    const debuggerData = executionResult.debuggerData
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
    listenerApi.dispatch(
      executionActions.setExecutionDebuggerDataReducer({
        ...debuggerData,
      }),
    )
  }
}

async function handleStartExecutionOnCanvas(
  action: AnyAction,
  listenerApi: AppListenerEffectAPI,
) {
  const rootState = listenerApi.getState()
  const oldExecutionTree = getExecutionResult(rootState)
  if (executionTree) {
    const executionResult =
      executionTree.updateTreeFromExecution(oldExecutionTree)
    const evaluatedTree = executionResult.evaluatedTree
    const updates = diff(oldExecutionTree, evaluatedTree) || []
    listenerApi.dispatch(
      executionActions.setExecutionResultReducer({
        updates,
      }),
    )
  }
}

export function setupExecutionListeners(
  startListening: AppStartListening,
): Unsubscribe {
  const subscriptions = [
    startListening({
      matcher: isAnyOf(
        componentsActions.addComponentReducer,
        componentsActions.copyComponentReducer,
        componentsActions.updateComponentPropsReducer,
        componentsActions.deleteComponentNodeReducer,
        componentsActions.updateComponentDisplayNameReducer,
        componentsActions.resetComponentPropsReducer,
        componentsActions.updateMultiComponentPropsReducer,
        componentsActions.addTargetPageSectionReducer,
        componentsActions.updateTargetPagePropsReducer,
        componentsActions.deleteTargetPageSectionReducer,
        componentsActions.addPageNodeWithSortOrderReducer,
        componentsActions.updateRootNodePropsReducer,
        componentsActions.updateTargetPageLayoutReducer,
        actionActions.addActionItemReducer,
        actionActions.removeActionItemReducer,
        actionActions.updateActionItemReducer,
        executionActions.startExecutionReducer,
      ),
      effect: handleStartExecution,
    }),
    startListening({
      matcher: isAnyOf(
        executionActions.updateExecutionByDisplayNameReducer,
        executionActions.updateExecutionByMultiDisplayNameReducer,
      ),
      effect: handleStartExecutionOnCanvas,
    }),
  ]

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe())
  }
}
