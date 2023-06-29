import { AnyAction, Unsubscribe, isAnyOf } from "@reduxjs/toolkit"
import { cloneDeep } from "lodash"
import {
  applyEffectMapToComponentNodes,
  getNearComponentNodes,
  getReflowResult,
} from "@/page/App/components/DotPanel/calc"
import { getNewPositionWithCrossing } from "@/page/App/components/DotPanel/utils/crossingHelper"
import { combineWidgetInfos } from "@/page/App/components/DotPanel/utils/getDragShadow"
import { configActions } from "@/redux/config/configSlice"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { handleClearSelectedComponentExecution } from "@/redux/currentApp/collaborators/collaboratorsHandlers"
import { cursorActions } from "@/redux/currentApp/cursor/cursorSlice"
import {
  getCanvas,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import {
  getExecutionResult,
  getExecutionWidgetLayoutInfo,
  getInDependenciesMap,
  getRawTree,
} from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { AppListenerEffectAPI, AppStartListening } from "@/store"
import { changeDisplayNameHelper } from "@/utils/changeDisplayNameHelper"
import { CONTAINER_TYPE, ComponentNode } from "./componentsState"

function handleUpdateComponentDisplayNameEffect(
  action: ReturnType<
    typeof componentsActions.updateComponentDisplayNameReducer
  >,
  listenApi: AppListenerEffectAPI,
) {
  const { newDisplayName } = action.payload
  const rootState = listenApi.getState()
  const rootNode = getCanvas(rootState)
  const newComponent = searchDsl(rootNode, newDisplayName)
  if (
    newComponent &&
    newComponent.containerType === CONTAINER_TYPE.EDITOR_SCALE_SQUARE
  ) {
    listenApi.dispatch(
      configActions.updateSelectedComponent([newComponent.displayName]),
    )
  }
}

async function handleChangeCurrentPageWhenDelete(
  action: ReturnType<typeof componentsActions.deletePageNodeReducer>,
  listenerApi: AppListenerEffectAPI,
) {
  const rootState = listenerApi.getState()
  const executionTree = getExecutionResult(rootState)
  const rootNode = executionTree.root
  const { currentPageIndex, homepageDisplayName, pageSortedKey } = rootNode
  const { displayName, originPageSortedKey } = action.payload
  const newSortedKey = originPageSortedKey.filter((key) => key !== displayName)
  const currentPageDisplayName = originPageSortedKey[currentPageIndex]
  if (displayName === homepageDisplayName) {
    if (currentPageDisplayName === homepageDisplayName) {
      listenerApi.dispatch(
        componentsActions.updateRootNodePropsReducer({
          currentPageIndex: 0,
          homepageDisplayName: pageSortedKey[0],
          pageSortedKey,
        }),
      )
    } else {
      listenerApi.dispatch(
        componentsActions.updateRootNodePropsReducer({
          currentPageIndex: 0,
          homepageDisplayName: pageSortedKey[0],
          pageSortedKey,
        }),
      )
      setTimeout(() => {
        const newIndex = pageSortedKey.findIndex(
          (key: string) => key === currentPageDisplayName,
        )
        const currentIndex = newIndex === -1 ? 0 : newIndex
        listenerApi.dispatch(
          executionActions.updateExecutionByDisplayNameReducer({
            displayName: "root",
            value: {
              currentPageIndex: currentIndex,
            },
          }),
        )
      })
    }
  } else {
    const newIndex = pageSortedKey.findIndex(
      (key: string) => key === currentPageDisplayName,
    )
    listenerApi.dispatch(
      executionActions.updateExecutionByDisplayNameReducer({
        displayName: "root",
        value: {
          currentPageIndex: newIndex === -1 ? 0 : newIndex,
          pageSortedKey: newSortedKey,
        },
      }),
    )
  }
}

async function handleChangeCurrentSectionWhenDelete(
  action: ReturnType<typeof componentsActions.deleteSectionViewReducer>,
  listenerApi: AppListenerEffectAPI,
) {
  const { viewDisplayName, originPageSortedKey, parentNodeName } =
    action.payload
  const rootState = listenerApi.getState()
  const executionTree = getExecutionResult(rootState)
  const parentNode = executionTree[parentNodeName]
  if (!parentNode) return
  const oldIndex = originPageSortedKey.findIndex(
    (key) => key === viewDisplayName,
  )
  if (oldIndex === parentNode.currentViewIndex) {
    listenerApi.dispatch(
      executionActions.updateExecutionByDisplayNameReducer({
        displayName: parentNodeName,
        value: {
          currentViewIndex: 0,
        },
      }),
    )
  }
}

export const modifyComponentNodeX = (
  componentNode: ComponentNode,
  oldColumns: number,
  currentColumns: number,
) => {
  const resultComponentNode = cloneDeep(componentNode)
  const { x, w } = resultComponentNode
  const scale = currentColumns / oldColumns
  const scaleW = Math.ceil(w * scale)
  const scaleX = Math.ceil(x * scale)
  resultComponentNode.w =
    scaleW < resultComponentNode.minW ? resultComponentNode.minW : scaleW
  resultComponentNode.x = scaleX
  if (resultComponentNode.w === resultComponentNode.minW) {
    let diff = currentColumns - (resultComponentNode.x + resultComponentNode.w)
    while (diff < 0) {
      resultComponentNode.x--
      diff++
      if (resultComponentNode.x < 0) {
        resultComponentNode.x = 0
        break
      }
    }
  } else {
    let diff = currentColumns - (resultComponentNode.x + resultComponentNode.w)
    while (diff < 0) {
      resultComponentNode.w--
      diff++
      if (resultComponentNode.w < resultComponentNode.minW) {
        resultComponentNode.x = resultComponentNode.minW
        diff = currentColumns - (resultComponentNode.x + resultComponentNode.w)
        while (diff < 0) {
          resultComponentNode.x--
          diff++
          if (resultComponentNode.x < 0) {
            resultComponentNode.x = 0
            break
          }
        }
        break
      }
    }
  }

  return resultComponentNode
}

const updateComponentReflowComponentsAdapter = (
  action: ReturnType<
    | typeof componentsActions.addComponentReducer
    | typeof componentsActions.updateComponentLayoutInfoReducer
    | typeof componentsActions.copyComponentReducer
    | typeof componentsActions.updateComponentContainerReducer
  >,
) => {
  switch (action.type) {
    case "components/updateComponentContainerReducer": {
      const { newParentNodeDisplayName, updateSlices } = action.payload
      const square = combineWidgetInfos(updateSlices)
      const effectedDisplayNames = updateSlices.map(
        (slice) => slice.displayName,
      )
      const originUpdateSlice = updateSlices.map((slice) => ({
        displayName: slice.displayName,
        layoutInfo: {
          x: slice.x,
          y: slice.y,
          w: slice.w,
          h: slice.h,
        },
      }))
      return {
        parentDisplayName: newParentNodeDisplayName,
        effectedDisplayNames,
        square,
        originUpdateSlice,
      }
    }
    case "components/addComponentReducer": {
      return {
        parentDisplayName: action.payload[0].parentNode!,
        effectedDisplayNames: [action.payload[0].displayName],
        square: {
          x: action.payload[0].x,
          y: action.payload[0].y,
          w: action.payload[0].w,
          h: action.payload[0].h,
        },
        originUpdateSlice: [
          {
            displayName: action.payload[0].displayName,
            layoutInfo: {
              x: action.payload[0].x,
              y: action.payload[0].y,
              w: action.payload[0].w,
              h: action.payload[0].h,
            },
          },
        ],
      }
    }
    case "components/copyComponentReducer": {
      const { copyComponents } = action.payload
      const parentDisplayName = copyComponents[0].newComponentNode.parentNode
      const effectedDisplayNames = copyComponents.map((item) => {
        return item.originComponentNode.displayName
      })

      const square = combineWidgetInfos(
        copyComponents.map((item) => item.newComponentNode),
      )

      const originUpdateSlice = copyComponents.map((slice) => ({
        displayName: slice.newComponentNode.displayName,
        layoutInfo: {
          x: slice.newComponentNode.x,
          y: slice.newComponentNode.y,
          w: slice.newComponentNode.w,
          h: slice.newComponentNode.h,
        },
      }))
      return {
        parentDisplayName: parentDisplayName!,
        effectedDisplayNames,
        square,
        originUpdateSlice,
      }
    }
    case "components/updateComponentLayoutInfoReducer": {
      const { displayName, layoutInfo } = action.payload
      return {
        parentDisplayName: action.payload.parentNode,
        effectedDisplayNames: [displayName],
        square: {
          x: layoutInfo.x,
          y: layoutInfo.y,
          w: layoutInfo.w,
          h: layoutInfo.h,
        },
        originUpdateSlice: [
          {
            displayName,
            layoutInfo: layoutInfo,
          },
        ],
      }
    }
  }
}

function handleUpdateComponentReflowEffect(
  action: AnyAction,
  listenApi: AppListenerEffectAPI,
) {
  const updateComponents = updateComponentReflowComponentsAdapter(
    action as ReturnType<
      | typeof componentsActions.addComponentReducer
      | typeof componentsActions.updateComponentLayoutInfoReducer
      | typeof componentsActions.copyComponentReducer
      | typeof componentsActions.updateComponentContainerReducer
    >,
  )

  const updateSlice = updateComponents.originUpdateSlice

  const effectMap = getNewPositionWithCrossing(
    updateComponents.square,
    updateComponents.parentDisplayName,
    updateComponents.effectedDisplayNames,
    action.type === "components/copyComponentReducer"
      ? Object.values(getExecutionWidgetLayoutInfo(listenApi.getState()))
      : undefined,
  )

  if (effectMap && effectMap.size > 0) {
    effectMap.forEach((widgetLayoutInfo) => {
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

  listenApi.dispatch(
    componentsActions.batchUpdateComponentLayoutInfoWhenReflowReducer(
      updateSlice,
    ),
  )
}

const handleUpdateHeightEffect = (
  action: ReturnType<typeof componentsActions.updateComponentNodeHeightReducer>,
  listenerApi: AppListenerEffectAPI,
) => {
  const { displayName, height, oldHeight } = action.payload
  const rootState = listenerApi.getState()
  const rootNode = getCanvas(rootState)
  const newItem = searchDsl(rootNode, displayName)
  if (!newItem) return
  const parentNodeDisplayName = newItem.parentNode
  const target = searchDsl(rootNode, parentNodeDisplayName)
  let allComponents: ComponentNode[] = []
  if (target) {
    allComponents = target.childrenNode
  }

  const cloneDeepAllComponents = cloneDeep(allComponents)
  const findIndex = cloneDeepAllComponents.findIndex(
    (node) => node.displayName === newItem.displayName,
  )
  cloneDeepAllComponents.splice(findIndex, 1, newItem)

  if (oldHeight <= newItem.h && oldHeight < height) {
    const result = getReflowResult(newItem, cloneDeepAllComponents, false)
    listenerApi.dispatch(
      componentsActions.updateComponentReflowReducer([
        {
          parentDisplayName: newItem.parentNode || "root",
          childNodes: result.finalState,
        },
      ]),
    )
  }
  if (oldHeight >= newItem.h && oldHeight > height) {
    const effectRows = oldHeight - newItem.h
    const effectMap = getNearComponentNodes(
      {
        ...newItem,
        h: oldHeight,
      },
      cloneDeepAllComponents,
    )
    effectMap.set(newItem.displayName, newItem)
    effectMap.forEach((node) => {
      if (node.displayName !== newItem.displayName) {
        node.y -= effectRows
      }
    })
    let finalState = applyEffectMapToComponentNodes(effectMap, allComponents)
    listenerApi.dispatch(
      componentsActions.updateComponentReflowReducer([
        {
          parentDisplayName: newItem.parentNode || "root",
          childNodes: finalState,
        },
      ]),
    )
  }
}

const handleUpdateDisplayNameEffect = (
  action: ReturnType<
    typeof componentsActions.updateComponentDisplayNameReducer
  >,
  listenerApi: AppListenerEffectAPI,
) => {
  const { displayName, newDisplayName } = action.payload
  const rootState = listenerApi.getState()
  const independenciesMap = getInDependenciesMap(rootState)
  const seeds = getRawTree(rootState)

  const { updateActionSlice, updateWidgetSlice } = changeDisplayNameHelper(
    independenciesMap,
    seeds,
    displayName,
    newDisplayName,
  )

  listenerApi.dispatch(
    executionActions.updateWidgetLayoutInfoWhenChangeDisplayNameReducer({
      oldDisplayName: displayName,
      newDisplayName,
    }),
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

const handleUpdateGlobalDataDisplayNameEffect = (
  action: ReturnType<typeof componentsActions.setGlobalStateReducer>,
  listenerApi: AppListenerEffectAPI,
) => {
  const { key, oldKey } = action.payload
  if (!oldKey) return
  const rootState = listenerApi.getState()
  const independenciesMap = getInDependenciesMap(rootState)
  const seeds = getRawTree(rootState)
  const { updateActionSlice, updateWidgetSlice } = changeDisplayNameHelper(
    independenciesMap,
    seeds,
    oldKey,
    key,
    "globalDataKey",
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

const handlerUpdateViewportSizeEffect = (
  action: ReturnType<typeof componentsActions.updateViewportSizeReducer>,
  listenApi: AppListenerEffectAPI,
) => {
  listenApi.dispatch(cursorActions.resetCursorReducer())
}

export function setupComponentsListeners(
  startListening: AppStartListening,
): Unsubscribe {
  const subscriptions = [
    startListening({
      actionCreator: componentsActions.updateComponentDisplayNameReducer,
      effect: handleUpdateComponentDisplayNameEffect,
    }),
    startListening({
      matcher: isAnyOf(
        componentsActions.addComponentReducer,
        componentsActions.updateComponentLayoutInfoReducer,
        componentsActions.copyComponentReducer,
        componentsActions.batchUpdateComponentLayoutInfoReducer,
        componentsActions.updateComponentContainerReducer,
      ),
      effect: handleUpdateComponentReflowEffect,
    }),
    startListening({
      actionCreator: componentsActions.deletePageNodeReducer,
      effect: handleChangeCurrentPageWhenDelete,
    }),
    startListening({
      actionCreator: componentsActions.deleteComponentNodeReducer,
      effect: handleClearSelectedComponentExecution,
    }),
    startListening({
      actionCreator: componentsActions.deleteSectionViewReducer,
      effect: handleChangeCurrentSectionWhenDelete,
    }),
    startListening({
      actionCreator: componentsActions.updateComponentNodeHeightReducer,
      effect: handleUpdateHeightEffect,
    }),
    startListening({
      actionCreator: componentsActions.updateComponentDisplayNameReducer,
      effect: handleUpdateDisplayNameEffect,
    }),
    startListening({
      actionCreator: componentsActions.setGlobalStateReducer,
      effect: handleUpdateGlobalDataDisplayNameEffect,
    }),
    startListening({
      actionCreator: componentsActions.updateViewportSizeReducer,
      effect: handlerUpdateViewportSizeEffect,
    }),
  ]

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe())
  }
}
