import { AnyAction, Unsubscribe, isAnyOf } from "@reduxjs/toolkit"
import { cloneDeep } from "lodash"
import {
  applyEffectMapToComponentNodes,
  getNearComponentNodes,
  getReflowResult,
} from "@/page/App/components/DotPanel/calc"
import { configActions } from "@/redux/config/configSlice"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { handleClearSelectedComponentExecution } from "@/redux/currentApp/collaborators/collaboratorsHandlers"
import {
  getAllComponentDisplayNameMapProps,
  getCanvas,
  getCurrentPageBodySectionComponentsSelector,
  getCurrentPageFooterSectionComponentsSelector,
  getCurrentPageHeaderSectionComponentsSelector,
  getCurrentPageLeftSectionComponentsSelector,
  getCurrentPageRightSectionComponentsSelector,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import {
  getExecutionResult,
  getInDependenciesMap,
  getRawTree,
} from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { AppListenerEffectAPI, AppStartListening } from "@/store"
import { changeDisplayNameHelper } from "@/utils/changeDisplayNameHelper"
import {
  BASIC_BLOCK_COLUMNS,
  LEFT_OR_RIGHT_DEFAULT_COLUMNS,
} from "@/utils/generators/generatePageOrSectionConfig"
import { cursorActions } from "../../cursor/cursorSlice"
import { UpdateComponentNodeLayoutInfoPayload } from "./componentsPayload"
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
  const { displayName, originPageSortedKey } = action.payload
  const oldIndex = originPageSortedKey.findIndex((key) => key === displayName)
  if (oldIndex === rootNode.currentPageIndex) {
    listenerApi.dispatch(
      executionActions.updateExecutionByDisplayNameReducer({
        displayName: "root",
        value: {
          currentPageIndex: 0,
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

export const modifyComponentNodeY = (
  componentNodes: ComponentNode[],
  rootNode: ComponentNode,
) => {
  const effectResultMap = new Map<string, ComponentNode>()

  if (Array.isArray(componentNodes) && componentNodes.length > 0) {
    const allComponents = cloneDeep(componentNodes)
    const walkedSetDisplayName: Set<string> = new Set()
    allComponents.forEach((baseComponentNode) => {
      const parentDisplayName = baseComponentNode.parentNode as string
      let parentNode = searchDsl(rootNode, parentDisplayName)
      if (!parentNode) {
        return
      }
      effectResultMap.set(parentDisplayName, {
        ...parentNode,
        childrenNode: allComponents,
      })
      let otherComponents: ComponentNode[] = allComponents

      otherComponents = otherComponents.filter((node) => {
        if (node.displayName === baseComponentNode.displayName) {
          return true
        }
        return !walkedSetDisplayName.has(node.displayName)
      })

      const { effectResultMap: reflowEffectMap } = getReflowResult(
        baseComponentNode,
        otherComponents,
        false,
      )
      walkedSetDisplayName.add(baseComponentNode.displayName)
      reflowEffectMap.forEach((value, key) => {
        if (parentNode) {
          const index = allComponents.findIndex(
            (node) => node.displayName === key,
          )
          if (index === -1) {
            return
          }
          allComponents.splice(index, 1, value)
          effectResultMap.set(parentDisplayName, {
            ...parentNode,
            childrenNode: allComponents,
          })
        }
      })
    }, [])
  }
  return effectResultMap
}

function reflowComponentNodesByUpdateColumns(
  sectionChildrenNodes: Record<string, ComponentNode[]>,
  oldColumns: number,
  newColumns: number,
  rootNode: ComponentNode,
  listenerApi: AppListenerEffectAPI,
) {
  Object.keys(sectionChildrenNodes).forEach((key) => {
    const componentNodes = sectionChildrenNodes[key]
    const modifyXComponentNode: ComponentNode[] = []

    componentNodes.forEach((component) => {
      modifyXComponentNode.push(
        modifyComponentNodeX(component, oldColumns, newColumns as number),
      )
    })
    const effectResultMap = modifyComponentNodeY(modifyXComponentNode, rootNode)
    if (effectResultMap) {
      effectResultMap.forEach((value, key) => {
        listenerApi.dispatch(
          componentsActions.updateComponentReflowReducer([
            {
              parentDisplayName: key,
              childNodes: value.childrenNode,
            },
          ]),
        )
      })
    }
  })
}

function handleUpdateTargetPagePropsEffect(
  action: ReturnType<typeof componentsActions.updateTargetPagePropsReducer>,
  listenerApi: AppListenerEffectAPI,
) {
  const {
    payload: { newProps, options },
  } = action
  const rootState = listenerApi.getState()
  const rootNode = getCanvas(rootState)
  if (!rootNode) return
  if (newProps.hasOwnProperty("bodyColumns") && options) {
    const oldColumns = options.bodyColumns as number

    const sectionChildrenNodes = cloneDeep(
      getCurrentPageBodySectionComponentsSelector(rootState),
    )
    reflowComponentNodesByUpdateColumns(
      sectionChildrenNodes,
      oldColumns,
      newProps.bodyColumns ?? BASIC_BLOCK_COLUMNS,
      rootNode,
      listenerApi,
    )
  }
  if (newProps.hasOwnProperty("leftColumns") && options) {
    const oldColumns = options.leftColumns as number

    const sectionChildrenNodes = cloneDeep(
      getCurrentPageLeftSectionComponentsSelector(rootState),
    )
    reflowComponentNodesByUpdateColumns(
      sectionChildrenNodes,
      oldColumns,
      newProps.leftColumns ?? LEFT_OR_RIGHT_DEFAULT_COLUMNS,
      rootNode,
      listenerApi,
    )
  }
  if (newProps.hasOwnProperty("rightColumns") && options) {
    const oldColumns = options.rightColumns as number

    const sectionChildrenNodes = cloneDeep(
      getCurrentPageRightSectionComponentsSelector(rootState),
    )
    reflowComponentNodesByUpdateColumns(
      sectionChildrenNodes,
      oldColumns,
      newProps.rightColumns ?? LEFT_OR_RIGHT_DEFAULT_COLUMNS,
      rootNode,
      listenerApi,
    )
  }
  if (newProps.hasOwnProperty("headerColumns") && options) {
    const oldColumns = options.headerColumns as number

    const sectionChildrenNodes = cloneDeep(
      getCurrentPageHeaderSectionComponentsSelector(rootState),
    )
    reflowComponentNodesByUpdateColumns(
      sectionChildrenNodes,
      oldColumns,
      newProps.headerColumns ?? BASIC_BLOCK_COLUMNS,
      rootNode,
      listenerApi,
    )
  }
  if (newProps.hasOwnProperty("footerColumns") && options) {
    const oldColumns = options.footerColumns as number

    const sectionChildrenNodes = cloneDeep(
      getCurrentPageFooterSectionComponentsSelector(rootState),
    )
    reflowComponentNodesByUpdateColumns(
      sectionChildrenNodes,
      oldColumns,
      newProps.footerColumns ?? BASIC_BLOCK_COLUMNS,
      rootNode,
      listenerApi,
    )
  }
}

const updateComponentReflowComponentsAdapter = (
  action: ReturnType<
    | typeof componentsActions.addComponentReducer
    | typeof componentsActions.updateComponentContainerReducer
    | typeof componentsActions.updateComponentLayoutInfoReducer
    | typeof componentsActions.copyComponentReducer
    | typeof componentsActions.batchUpdateComponentLayoutInfoReducer
  >,
) => {
  switch (action.type) {
    case "components/addComponentReducer": {
      return action.payload
    }
    case "components/updateComponentContainerReducer": {
      return action.payload.updateSlice.map((slice) => {
        return slice.component
      })
    }
    case "components/updateComponentLayoutInfoReducer": {
      return [
        {
          displayName: action.payload.displayName,
          x: action.payload.layoutInfo.x,
          y: action.payload.layoutInfo.y,
          w: action.payload.layoutInfo.w,
          h: action.payload.layoutInfo.h,
          parentNode: action.payload.options?.parentNode,
        },
      ] as ComponentNode[]
    }
    case "components/copyComponentReducer": {
      return action.payload.map((slice) => {
        return slice.newComponentNode
      })
    }
    case "components/batchUpdateComponentLayoutInfoReducer": {
      return action.payload.map((slice) => ({
        displayName: slice.displayName,
        x: slice.layoutInfo.x,
        y: slice.layoutInfo.y,
        w: slice.layoutInfo.w,
        h: slice.layoutInfo.h,
        parentNode: slice.options?.parentNode,
      })) as ComponentNode[]
    }
    default:
      return []
  }
}

function handleUpdateComponentReflowEffect(
  action: AnyAction,
  listenApi: AppListenerEffectAPI,
) {
  const rootState = listenApi.getState()
  const rootNode = getCanvas(rootState)
  let updateComponents: ComponentNode[] =
    updateComponentReflowComponentsAdapter(
      action as ReturnType<
        | typeof componentsActions.addComponentReducer
        | typeof componentsActions.updateComponentContainerReducer
        | typeof componentsActions.updateComponentLayoutInfoReducer
        | typeof componentsActions.copyComponentReducer
      >,
    )

  const effectResultMap = new Map<string, ComponentNode>()
  const updateSlice: UpdateComponentNodeLayoutInfoPayload[] = []

  updateComponents.forEach((componentNode) => {
    const parentNodeDisplayName = componentNode.parentNode
    let parentNode = searchDsl(rootNode, parentNodeDisplayName)
    if (!parentNode) {
      return
    }
    if (effectResultMap.has(parentNode.displayName)) {
      parentNode = effectResultMap.get(parentNode.displayName) as ComponentNode
    }
    const childrenNodes = parentNode.childrenNode
    const { finalState } = getReflowResult(componentNode, childrenNodes, true)
    finalState.forEach((node) => {
      updateSlice.push({
        displayName: node.displayName,
        layoutInfo: {
          x: node.x,
          y: node.y,
          w: node.w,
          h: node.h,
        },
      })
    })
    effectResultMap.set(parentNode.displayName, {
      ...parentNode,
      childrenNode: finalState,
    })
  })
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
  action: ReturnType<
    typeof componentsActions.batchUpdateComponentStatusInfoReducer
  >,
  listenApi: AppListenerEffectAPI,
) => {
  const { payload } = action
  let allChildrenDisplayName: string[] = []
  const displayNameMapProps =
    getAllComponentDisplayNameMapProps(listenApi.getState()) ?? {}
  payload.forEach((updateSlice) => {
    if (
      updateSlice.statusInfo.isDragging ||
      updateSlice.statusInfo.isResizing
    ) {
      allChildrenDisplayName = [
        ...allChildrenDisplayName,
        ...getAllChildrenDisplayName(
          updateSlice.displayName,
          displayNameMapProps,
        ),
      ]
    }
  })
  listenApi.dispatch(cursorActions.filterCursorReducer(allChildrenDisplayName))
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
        componentsActions.updateComponentContainerReducer,
        componentsActions.addComponentReducer,
        componentsActions.updateComponentLayoutInfoReducer,
        componentsActions.copyComponentReducer,
        componentsActions.batchUpdateComponentLayoutInfoReducer,
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
      actionCreator: componentsActions.updateTargetPagePropsReducer,
      effect: handleUpdateTargetPagePropsEffect,
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
    startListening({
      actionCreator: componentsActions.batchUpdateComponentStatusInfoReducer,
      effect: batchUpdateComponentStatusInfoEffect,
    }),
  ]

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe())
  }
}
