import { UnknownAction, Unsubscribe, isAnyOf } from "@reduxjs/toolkit"
import { diff } from "deep-diff"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import {
  getComponentMap,
  searchComponentFromMap,
} from "@/redux/currentApp/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import {
  getExecutionResult,
  getRawTree,
} from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { AppListenerEffectAPI, AppStartListening } from "@/store"
import { ExecutionTreeFactory } from "@/utils/executionTreeHelper/executionTreeFactory"

export let executionTree: ExecutionTreeFactory | undefined

export const destroyExecutionTree = () => {
  if (executionTree) {
    executionTree = executionTree.destroyTree()
  }
}

const asyncExecutionDataToRedux = (
  executionResult: Record<string, any>,
  oldExecutionTree: Record<string, any>,
  listenerApi: AppListenerEffectAPI,
) => {
  const errorTree = executionResult.errorTree
  const evaluatedTree = executionResult.evaluatedTree
  const dependencyMap = executionResult.dependencyTree
  const independencyMap = executionResult.independencyTree
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
    executionActions.setIndependenciesReducer({
      ...independencyMap,
    }),
  )
  listenerApi.dispatch(
    executionActions.setExecutionErrorReducer({
      ...errorTree,
    }),
  )
}

async function handleStartExecution(
  action: UnknownAction,
  listenerApi: AppListenerEffectAPI,
) {
  const rootState = listenerApi.getState()
  const rawTree = getRawTree(rootState)
  if (!rawTree) return
  const oldExecutionTree = getExecutionResult(rootState)
  if (!executionTree) {
    executionTree = new ExecutionTreeFactory()
    const executionResult = executionTree.initTree(rawTree)
    asyncExecutionDataToRedux(executionResult, oldExecutionTree, listenerApi)
  } else {
    const isAddAction =
      action.type.startsWith("components/add") ||
      action.type.startsWith("action/add") ||
      action.type.startsWith("action/batchAdd") ||
      componentsActions.batchUpdateMultiComponentSlicePropsReducer.match(
        action,
      ) ||
      actionActions.batchUpdateMultiActionSlicePropsReducer.match(action)
    const executionResult = executionTree.updateTree(rawTree, isAddAction)
    asyncExecutionDataToRedux(executionResult, oldExecutionTree, listenerApi)
  }
}

async function handleStartExecutionOnCanvas(
  action: UnknownAction,
  listenerApi: AppListenerEffectAPI,
) {
  const rootState = listenerApi.getState()
  const oldExecutionTree = getExecutionResult(rootState)
  if (executionTree) {
    const executionResult =
      executionTree.updateTreeFromExecution(oldExecutionTree)
    const evaluatedTree = executionResult.evaluatedTree
    const errorTree = executionResult.errorTree
    const updates = diff(oldExecutionTree, evaluatedTree) || []
    if (updates.length > 0) {
      listenerApi.dispatch(
        executionActions.setExecutionResultReducer({
          updates,
        }),
      )
      listenerApi.dispatch(
        executionActions.setExecutionErrorReducer({
          ...errorTree,
        }),
      )
    }
  }
}

function handleUpdateModalEffect(
  action: ReturnType<typeof componentsActions.addModalComponentReducer>,
  listenerApi: AppListenerEffectAPI,
) {
  const { payload } = action
  const { modalComponentNode } = payload
  const parentNodeDisplayName = modalComponentNode.parentNode
  if (!parentNodeDisplayName) return
  const rootState = listenerApi.getState()
  const components = getComponentMap(rootState)
  if (!components) return
  const parentNode = searchComponentFromMap(components, parentNodeDisplayName)
  if (!parentNode || !Array.isArray(parentNode.childrenNode)) return
  const otherNode = parentNode.childrenNode.filter((childDisplayName) => {
    return childDisplayName !== modalComponentNode.displayName
  })
  const updateSlice = [
    {
      displayName: modalComponentNode.displayName,
      value: {
        isVisible: true,
      },
    },
  ]
  otherNode.forEach((otherNodeChildDisplayName) => {
    updateSlice.push({
      displayName: otherNodeChildDisplayName,
      value: {
        isVisible: false,
      },
    })
  })
  listenerApi.dispatch(
    executionActions.updateExecutionByMultiDisplayNameReducer(updateSlice),
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
        componentsActions.setComponentPropsReducer,
        componentsActions.deleteComponentNodeReducer,
        componentsActions.batchUpdateMultiComponentSlicePropsReducer,
        componentsActions.updateMultiComponentPropsReducer,
        componentsActions.addTargetPageSectionReducer,
        componentsActions.updateTargetPagePropsReducer,
        componentsActions.deleteTargetPageSectionReducer,
        componentsActions.addPageNodeWithSortOrderReducer,
        componentsActions.updateRootNodePropsReducer,
        componentsActions.updateTargetPageLayoutReducer,
        componentsActions.deletePageNodeReducer,
        componentsActions.addSectionViewReducer,
        componentsActions.addSectionViewConfigByConfigReducer,
        componentsActions.deleteSectionViewReducer,
        componentsActions.updateSectionViewPropsReducer,
        componentsActions.addModalComponentReducer,
        componentsActions.setGlobalStateReducer,
        componentsActions.deleteGlobalStateByKeyReducer,
        componentsActions.deleteSubPageViewNodeReducer,
        componentsActions.updateDefaultSubPagePathReducer,
        componentsActions.updateSubPagePathReducer,
        componentsActions.addSubPageReducer,
        componentsActions.updateCurrentPageStyleReducer,
        componentsActions.deleteCurrentPageStyleReducer,
        actionActions.addActionItemReducer,
        actionActions.batchAddActionItemReducer,
        actionActions.removeActionItemReducer,
        actionActions.updateActionItemReducer,
        actionActions.batchUpdateMultiActionSlicePropsReducer,
        executionActions.startExecutionReducer,
      ),
      effect: handleStartExecution,
    }),
    startListening({
      matcher: isAnyOf(
        executionActions.updateExecutionByDisplayNameReducer,
        executionActions.updateExecutionByMultiDisplayNameReducer,
        executionActions.updateModalDisplayReducer,
        executionActions.setGlobalStateInExecutionReducer,
        executionActions.setInGlobalStateInExecutionReducer,
        executionActions.setLocalStorageInExecutionReducer,
        executionActions.clearLocalStorageInExecutionReducer,
        executionActions.updateCurrentPagePathReducer,
      ),
      effect: handleStartExecutionOnCanvas,
    }),
    startListening({
      actionCreator: componentsActions.addModalComponentReducer,
      effect: handleUpdateModalEffect,
    }),
  ]

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe())
  }
}
