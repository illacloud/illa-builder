import { AnyAction, Unsubscribe, isAnyOf } from "@reduxjs/toolkit"
import { diff } from "deep-diff"
import { cloneDeep } from "lodash"
import {
  getNewPositionWithCrossing,
  sortedRuleByYAndX,
} from "@/page/App/components/DotPanel/utils/crossingHelper"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import {
  getAllComponentDisplayNameMapLayoutInfo,
  getCanvas,
  searchDSLByDisplayName,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import {
  getExecutionResult,
  getExecutionWidgetLayoutInfo,
  getRawTree,
  getWidgetExecutionResult,
} from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { AppListenerEffectAPI, AppStartListening } from "@/store"
import { ExecutionTreeFactory } from "@/utils/executionTreeHelper/executionTreeFactory"
import { cursorActions } from "../cursor/cursorSlice"
import { ComponentNode } from "../editor/components/componentsState"
import {
  BatchUpdateWidgetLayoutInfoPayload,
  WidgetLayoutInfo,
} from "./executionState"

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
    executionActions.setIndependenciesReducer({
      ...independencyMap,
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

async function handleStartExecution(
  action: AnyAction,
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
    const isDeleteAction =
      action.type === "components/deleteComponentNodeReducer" ||
      action.type === "action/removeActionItemReducer"

    const executionResult = executionTree.updateTree(rawTree, isDeleteAction)
    asyncExecutionDataToRedux(executionResult, oldExecutionTree, listenerApi)
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
    const errorTree = executionResult.errorTree
    const debuggerData = executionResult.debuggerData
    const updates = diff(oldExecutionTree, evaluatedTree) || []
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
    listenerApi.dispatch(
      executionActions.setExecutionDebuggerDataReducer({
        ...debuggerData,
      }),
    )
  }
}

async function handleUpdateReflowEffect(
  action: ReturnType<typeof executionActions.updateWidgetLayoutInfoReducer>,
  listenerApi: AppListenerEffectAPI,
) {
  const rootState = listenerApi.getState()
  const widgetLayoutInfos = getExecutionWidgetLayoutInfo(rootState)
  let updateSlice: BatchUpdateWidgetLayoutInfoPayload[] = []

  const { layoutInfo, displayName, parentNode } = action.payload

  const originNodes = searchDSLByDisplayName(parentNode)

  let originChildrenNode: ComponentNode[] = []

  if (
    originNodes &&
    originNodes.childrenNode &&
    originNodes.childrenNode.length > 0
  ) {
    originChildrenNode = originNodes.childrenNode
  }

  const mainNodeLayoutInfo = {
    ...widgetLayoutInfos[displayName].layoutInfo,
    h: layoutInfo.h ?? widgetLayoutInfos[displayName].layoutInfo.h,
  }

  if (originChildrenNode.length > 0) {
    originChildrenNode
      .filter((node) => node.displayName !== displayName)
      .forEach((node) => {
        const layoutInfo = widgetLayoutInfos[node.displayName].layoutInfo
        updateSlice.push({
          displayName: node.displayName,
          layoutInfo: {
            x: layoutInfo.x,
            y: node.y,
            w: layoutInfo.w,
            h: layoutInfo.h,
          },
        })
      })
  }

  const effectMap = getNewPositionWithCrossing(
    {
      ...mainNodeLayoutInfo,
    },
    parentNode,
    [displayName],
    Object.values(widgetLayoutInfos).filter(
      (item) => item.parentNode === parentNode,
    ),
  )

  if (effectMap && effectMap.size > 0) {
    effectMap.forEach((widgetLayoutInfo) => {
      const oldSliceIndex = updateSlice.findIndex(
        (slice) => slice.displayName === widgetLayoutInfo.displayName,
      )
      if (oldSliceIndex !== -1) {
        updateSlice.splice(oldSliceIndex, 1)
      }
      updateSlice.push({
        displayName: widgetLayoutInfo.displayName,
        layoutInfo: {
          x: widgetLayoutInfo.layoutInfo.x,
          y: widgetLayoutInfo.layoutInfo.y,
          w: widgetLayoutInfo.layoutInfo.w,
          h: widgetLayoutInfo.layoutInfo.h,
        },
      })
    })
  }

  const currentLayoutInfos = cloneDeep(widgetLayoutInfos)

  updateSlice.forEach((slice) => {
    if (currentLayoutInfos[slice.displayName]) {
      currentLayoutInfos[slice.displayName] = {
        ...currentLayoutInfos[slice.displayName],
        layoutInfo: {
          ...currentLayoutInfos[slice.displayName].layoutInfo,
          ...slice.layoutInfo!,
        },
      }
    }
  })

  const currentLayoutInfosArray = Object.values(currentLayoutInfos)
    .filter((info) => info.parentNode === parentNode)
    .sort(sortedRuleByYAndX)

  let effectName: string[] = []
  currentLayoutInfosArray.forEach((item) => {
    effectName.push(item.displayName)
    const effectMap = getNewPositionWithCrossing(
      item.layoutInfo,
      parentNode,
      effectName,
      currentLayoutInfosArray,
    )
    if (effectMap && effectMap.size > 0) {
      effectMap.forEach((widgetLayoutInfo) => {
        const oldSliceIndex = updateSlice.findIndex(
          (slice) => slice.displayName === widgetLayoutInfo.displayName,
        )
        if (oldSliceIndex !== -1) {
          updateSlice.splice(oldSliceIndex, 1)
        }
        updateSlice.push({
          displayName: widgetLayoutInfo.displayName,
          layoutInfo: {
            x: widgetLayoutInfo.layoutInfo.x,
            y: widgetLayoutInfo.layoutInfo.y,
            w: widgetLayoutInfo.layoutInfo.w,
            h: widgetLayoutInfo.layoutInfo.h,
          },
        })
      })
    }
  })

  listenerApi.dispatch(
    executionActions.batchUpdateWidgetLayoutInfoReducer(updateSlice),
  )
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
  const rootNode = getCanvas(rootState)
  if (!rootNode) return
  const parentNode = searchDsl(rootNode, parentNodeDisplayName)
  if (!parentNode || !Array.isArray(parentNode.childrenNode)) return
  const otherNode = parentNode.childrenNode.filter((node) => {
    return node.displayName !== modalComponentNode.displayName
  })
  const updateSlice = [
    {
      displayName: modalComponentNode.displayName,
      value: {
        isVisible: true,
      },
    },
  ]
  otherNode.forEach((node) => {
    updateSlice.push({
      displayName: node.displayName,
      value: {
        isVisible: false,
      },
    })
  })
  listenerApi.dispatch(
    executionActions.updateExecutionByMultiDisplayNameReducer(updateSlice),
  )
}

const updateWidgetPositionAdapter = (
  action: ReturnType<
    | typeof componentsActions.addComponentReducer
    | typeof componentsActions.updateComponentLayoutInfoReducer
    | typeof componentsActions.updateComponentContainerReducer
    | typeof componentsActions.batchUpdateComponentLayoutInfoWhenReflowReducer
  >,
) => {
  let effectDisplayNames: string[] = []

  switch (action.type) {
    case "components/addComponentReducer": {
      const { payload } = action
      payload.forEach((item) => {
        effectDisplayNames.push(item.displayName)
      })
      break
    }
    case "components/updateComponentLayoutInfoReducer": {
      const { payload } = action
      const { displayName } = payload
      effectDisplayNames.push(displayName)
      break
    }
    case "components/updateComponentContainerReducer": {
      const { payload } = action
      payload.updateSlices.forEach((item) => {
        effectDisplayNames.push(item.displayName)
      })
      break
    }
    case "components/batchUpdateComponentLayoutInfoWhenReflowReducer": {
      const { payload } = action
      payload.forEach((item) => {
        effectDisplayNames.push(item.displayName)
      })
      break
    }
  }
  return effectDisplayNames
}

function handleUpdateWidgetPositionInExecutionLayoutInfo(
  action: AnyAction,
  listenerApi: AppListenerEffectAPI,
) {
  const rootState = listenerApi.getState()
  let displayNameMapNode = getAllComponentDisplayNameMapLayoutInfo(rootState)
  if (!displayNameMapNode) return
  const executionLayoutInfos = getExecutionWidgetLayoutInfo(rootState)
  let setWidgetLayoutInfoReducerActionPayload: Record<
    string,
    WidgetLayoutInfo
  > = {}
  let effectDisplayNames: string[] = updateWidgetPositionAdapter(
    action as ReturnType<
      | typeof componentsActions.addComponentReducer
      | typeof componentsActions.updateComponentLayoutInfoReducer
      | typeof componentsActions.updateComponentContainerReducer
      | typeof componentsActions.batchUpdateComponentLayoutInfoWhenReflowReducer
    >,
  )

  Object.keys(displayNameMapNode).forEach((displayName) => {
    if (
      (displayNameMapNode as Record<string, WidgetLayoutInfo>)[displayName] &&
      executionLayoutInfos[displayName] &&
      effectDisplayNames.indexOf(displayName) === -1
    ) {
      setWidgetLayoutInfoReducerActionPayload[displayName] = {
        ...(displayNameMapNode as Record<string, WidgetLayoutInfo>)[
          displayName
        ],
        layoutInfo: {
          ...(displayNameMapNode as Record<string, WidgetLayoutInfo>)[
            displayName
          ].layoutInfo,
          y: executionLayoutInfos[displayName].layoutInfo.y,
          h: executionLayoutInfos[displayName].layoutInfo.h,
        },
      }
    } else {
      setWidgetLayoutInfoReducerActionPayload[displayName] = {
        ...(displayNameMapNode as Record<string, WidgetLayoutInfo>)[
          displayName
        ],
      }
    }
  })
  listenerApi.dispatch(
    executionActions.setWidgetLayoutInfoReducer(
      setWidgetLayoutInfoReducerActionPayload,
    ),
  )
}

const getAllChildrenDisplayName = (
  nodeDisplayName: string,
  displayNameMapProps: Record<string, any>,
): string[] => {
  let result = [nodeDisplayName]
  const node = displayNameMapProps[nodeDisplayName]
  const children: string[] = node?.$childrenNode || []
  if (children.length > 0) {
    children.forEach((child) => {
      result = [
        ...result,
        ...getAllChildrenDisplayName(child, displayNameMapProps),
      ]
    })
  }
  return result
}

const batchUpdateComponentStatusInfoEffect = (
  action: AnyAction,
  listenApi: AppListenerEffectAPI,
) => {
  const { payload } = action as ReturnType<
    | typeof executionActions.setDraggingNodeIDsReducer
    | typeof executionActions.setResizingNodeIDsReducer
  >
  let allChildrenDisplayName: string[] = []
  const displayNameMapProps = getWidgetExecutionResult(listenApi.getState())
  payload.forEach((displayName) => {
    allChildrenDisplayName = [
      ...allChildrenDisplayName,
      ...getAllChildrenDisplayName(displayName, displayNameMapProps),
    ]
  })
  listenApi.dispatch(cursorActions.filterCursorReducer(allChildrenDisplayName))
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
        actionActions.addActionItemReducer,
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
    startListening({
      actionCreator: executionActions.updateWidgetLayoutInfoReducer,
      effect: handleUpdateReflowEffect,
    }),
    startListening({
      matcher: isAnyOf(
        componentsActions.deleteComponentNodeReducer,
        componentsActions.addTargetPageSectionReducer,
        componentsActions.deleteTargetPageSectionReducer,
        componentsActions.addPageNodeWithSortOrderReducer,
        componentsActions.deletePageNodeReducer,
        componentsActions.addSectionViewReducer,
        componentsActions.addSectionViewConfigByConfigReducer,
        componentsActions.deleteSectionViewReducer,
        componentsActions.addModalComponentReducer,
        componentsActions.batchUpdateComponentLayoutInfoWhenReflowReducer,
        componentsActions.addComponentReducer,
        componentsActions.updateTargetPageLayoutReducer,
        componentsActions.updateSectionViewPropsReducer,
        componentsActions.updateComponentDisplayNameReducer,
        componentsActions.updateComponentContainerReducer,
        executionActions.startExecutionReducer,
      ),
      effect: handleUpdateWidgetPositionInExecutionLayoutInfo,
    }),
    startListening({
      matcher: isAnyOf(
        executionActions.setDraggingNodeIDsReducer,
        executionActions.setResizingNodeIDsReducer,
      ),
      effect: batchUpdateComponentStatusInfoEffect,
    }),
  ]

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe())
  }
}
