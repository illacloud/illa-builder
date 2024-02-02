import { ComponentMapNode } from "@illa-public/public-types"
import { UnknownAction, Unsubscribe, isAnyOf } from "@reduxjs/toolkit"
import { klona } from "klona/json"
import {
  getNewPositionWithCrossing,
  sortedRuleByYAndX,
} from "@/page/App/components/DotPanel/utils/crossingHelper"
import {
  getAllComponentDisplayNameMapLayoutInfo,
  getComponentMap,
  searchDSLByDisplayName,
} from "@/redux/currentApp/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { AppListenerEffectAPI, AppStartListening } from "@/store"
import { getClientWidgetLayoutInfo } from "./layoutInfoSelector"
import { layoutInfoActions } from "./layoutInfoSlice"
import {
  BatchUpdateWidgetLayoutInfoPayload,
  WidgetLayoutInfo,
} from "./layoutInfoState"

async function handleUpdateReflowEffect(
  action: ReturnType<typeof layoutInfoActions.updateWidgetLayoutInfoReducer>,
  listenerApi: AppListenerEffectAPI,
) {
  const rootState = listenerApi.getState()
  const widgetLayoutInfos = getClientWidgetLayoutInfo(rootState)
  const components = getComponentMap(rootState)
  let updateSlice: BatchUpdateWidgetLayoutInfoPayload[] = []

  const { layoutInfo, displayName, parentNode } = action.payload

  const originNodes = searchDSLByDisplayName(parentNode)

  let originChildrenNode: ComponentMapNode[] = []

  if (
    originNodes &&
    originNodes.childrenNode &&
    originNodes.childrenNode.length > 0
  ) {
    originChildrenNode = originNodes.childrenNode.map(
      (displayName) => components[displayName],
    )
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

  const currentLayoutInfos = klona(widgetLayoutInfos)

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
    layoutInfoActions.batchUpdateWidgetLayoutInfoReducer(updateSlice),
  )
}

const updateWidgetPositionAdapter = (
  action: ReturnType<
    | typeof componentsActions.addComponentReducer
    | typeof componentsActions.updateComponentLayoutInfoReducer
    | typeof componentsActions.updateComponentPositionReducer
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
    case "components/updateComponentPositionReducer": {
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
  action: UnknownAction,
  listenerApi: AppListenerEffectAPI,
) {
  const rootState = listenerApi.getState()
  let displayNameMapNode = getAllComponentDisplayNameMapLayoutInfo(rootState)
  if (!displayNameMapNode) return
  const executionLayoutInfos = getClientWidgetLayoutInfo(rootState)
  let setWidgetLayoutInfoReducerActionPayload: Record<
    string,
    WidgetLayoutInfo
  > = {}
  let effectDisplayNames: string[] = []
  if (
    componentsActions.addComponentReducer.match(action) ||
    componentsActions.updateComponentLayoutInfoReducer.match(action) ||
    componentsActions.updateComponentPositionReducer.match(action) ||
    componentsActions.batchUpdateComponentLayoutInfoWhenReflowReducer.match(
      action,
    )
  ) {
    effectDisplayNames = updateWidgetPositionAdapter(action)
  }

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
    layoutInfoActions.setWidgetLayoutInfoReducer(
      setWidgetLayoutInfoReducerActionPayload,
    ),
  )
}

export function setupLayoutInfoListeners(
  startListening: AppStartListening,
): Unsubscribe {
  const subscriptions = [
    startListening({
      actionCreator: layoutInfoActions.updateWidgetLayoutInfoReducer,
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
        componentsActions.updateComponentPositionReducer,
        componentsActions.addSubPageReducer,
        executionActions.startExecutionReducer,
      ),
      effect: handleUpdateWidgetPositionInExecutionLayoutInfo,
    }),
  ]

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe())
  }
}
