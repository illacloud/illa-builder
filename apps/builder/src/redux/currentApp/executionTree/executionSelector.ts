import { getCurrentUser } from "@illa-public/user-data"
import { createSelector } from "@reduxjs/toolkit"
import { cloneDeep, get } from "lodash"
import { getBuilderInfo } from "@/redux/builderInfo/builderInfoSelector"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import {
  getAllComponentDisplayNameMapProps,
  getOriginalGlobalData,
  getPageNameMapDescendantNodeDisplayNames,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { RootState } from "@/store"
import { RawTreeFactory } from "@/utils/executionTreeHelper/rawTreeFactory"

export const getRawTree = createSelector(
  [
    getActionList,
    getAllComponentDisplayNameMapProps,
    getCurrentUser,
    getBuilderInfo,
    getOriginalGlobalData,
  ],
  (actions, widgets, currentUserInfo, builderInfo, globalData) => {
    return RawTreeFactory.create({
      actions: actions ?? [],
      widgets: widgets ?? {},
      currentUserInfo,
      builderInfo,
      globalData,
    })
  },
)

export const getExecution = (state: RootState) => state.currentApp.execution

export const getExecutionResult = createSelector(
  [getExecution],
  (execution) => execution.result || {},
)

export const getExecutionError = createSelector(
  [getExecution],
  (execution) => execution.error ?? {},
)

export const getExecutionDebuggerData = createSelector(
  [getExecution],
  (execution) => execution.debuggerData ?? {},
)
export const IGNORE_WIDGET_TYPES = new Set<string>([
  "PAGE_NODE",
  "SECTION_NODE",
  "CANVAS",
  "DOT_PANEL",
  "MODAL_WIDGET",
  "MODAL_SECTION_NODE",
])

export const getWidgetExecutionResult = createSelector(
  [getExecutionResult],
  (executionResult) => {
    const widgetExecutionResult: Record<string, any> = {}
    Object.keys(executionResult).forEach((key) => {
      const widgetOrAction = executionResult[key]
      if (widgetOrAction && widgetOrAction.$type === "WIDGET") {
        widgetExecutionResult[key] = widgetOrAction
      }
    })
    return widgetExecutionResult
  },
)

export const getPageExecutionResultArray = createSelector(
  [getWidgetExecutionResult],
  (widgetExecutionResult) => {
    const widgetExecutionResultArray: Record<string, any>[] = []
    Object.keys(widgetExecutionResult).forEach((key) => {
      if (
        widgetExecutionResult[key] &&
        widgetExecutionResult[key].$widgetType === "PAGE_NODE"
      ) {
        widgetExecutionResultArray.push({
          ...widgetExecutionResult[key],
          displayName: key,
        })
      }
    })
    return widgetExecutionResultArray
  },
)

export const getSectionExecutionResultArray = createSelector(
  [getWidgetExecutionResult],
  (widgetExecutionResult) => {
    const sectionExecutionResult: Record<string, any> = {}
    Object.keys(widgetExecutionResult).forEach((key) => {
      if (
        widgetExecutionResult[key] &&
        widgetExecutionResult[key].$widgetType === "SECTION_NODE"
      ) {
        sectionExecutionResult[key] = {
          ...widgetExecutionResult[key],
          displayName: key,
        }
      }
    })
    return sectionExecutionResult
  },
)

export const getRootNodeExecutionResult = createSelector(
  [getWidgetExecutionResult],
  (widgetExecutionResult) => {
    const rootNode = widgetExecutionResult["root"]
    return rootNode
      ? rootNode
      : {
          currentPageIndex: 0,
          pageSortedKey: ["page1"],
          homepageDisplayName: "page1",
        }
  },
)

export const getActionExecutionResult = createSelector(
  [getExecutionResult],
  (executionResult) => {
    const actionExecutionResult: Record<string, any> = {}
    Object.keys(executionResult).forEach((key) => {
      const widgetOrAction = executionResult[key]
      if (widgetOrAction && widgetOrAction.$type === "ACTION") {
        actionExecutionResult[key] = widgetOrAction
      }
    })
    return actionExecutionResult
  },
)

export const getActionExecutionResultArray = createSelector(
  [getActionExecutionResult],
  (actionExecutionResult) => {
    const actionExecutionResultArray: Record<string, any>[] = []
    Object.keys(actionExecutionResult).forEach((key) => {
      actionExecutionResultArray.push({
        ...actionExecutionResult[key],
        displayName: key,
      })
    })
    return actionExecutionResultArray
  },
)

export const getCurrentPageIndex = createSelector(
  [getRootNodeExecutionResult],
  (rootNode) => rootNode.currentPageIndex as number,
)

export const getCurrentPageDisplayName = createSelector(
  [getRootNodeExecutionResult],
  (rootNode) => {
    const { pageSortedKey, currentPageIndex } = rootNode
    if (currentPageIndex > pageSortedKey.lengths)
      return pageSortedKey[0] as string
    return pageSortedKey[currentPageIndex] as string
  },
)

export const getExecutionResultToGlobalCodeMirror = createSelector(
  [getExecutionResult],
  (executionResult) => {
    const result: Record<string, unknown> = {}
    Object.keys(executionResult).forEach((key) => {
      if (
        !IGNORE_WIDGET_TYPES.has(executionResult[key]?.$widgetType) &&
        executionResult[key] != undefined
      ) {
        result[key] = cloneDeep(executionResult[key])
      }
    })
    return result
  },
)

export const getExecutionResultToCurrentPageCodeMirror = createSelector(
  [
    getCurrentPageDisplayName,
    getPageNameMapDescendantNodeDisplayNames,
    getExecutionResult,
  ],
  (
    currentPageDisplayName,
    pageNameMapDescendantNodeDisplayNames,
    executionResult,
  ) => {
    const currentPageWidgets =
      pageNameMapDescendantNodeDisplayNames[currentPageDisplayName]
    const result: Record<string, unknown> = {}
    Object.keys(executionResult).forEach((key) => {
      const currentSeed = executionResult[key]
      if (
        currentSeed != undefined &&
        currentSeed.$type === "WIDGET" &&
        !IGNORE_WIDGET_TYPES.has(executionResult[key]?.$widgetType) &&
        currentPageWidgets.includes(key)
      ) {
        result[key] = cloneDeep(executionResult[key])
      }
      if (currentSeed && currentSeed.$type !== "WIDGET") {
        result[key] = cloneDeep(executionResult[key])
      }
    })
    return result
  },
)

export const getDependenciesMap = (state: RootState) => {
  return state.currentApp.execution.dependencies
}

export const getInDependenciesMap = (state: RootState) => {
  return state.currentApp.execution.independencies
}

export const getGlobalDataExecutionResult = createSelector(
  [getExecutionResult],
  (result) => {
    return get(result, "globalData", {})
  },
)

export const getBuilderInfoExecutionResult = createSelector(
  [getExecutionResult],
  (result) => get(result, "builderInfo", {}),
)

export const getCurrentUserInfoExecutionResult = createSelector(
  [getExecutionResult],
  (result) => get(result, "currentUserInfo", {}),
)

export const getURLParamsExecutionResult = createSelector(
  getExecutionResult,
  (result) => {
    return get(result, "urlParams", {})
  },
)

export const getLocalStorageExecutionResult = createSelector(
  getExecutionResult,
  (result) => {
    return get(result, "localStorage", {})
  },
)

export const getPageInfosExecutionResult = createSelector(
  getExecutionResult,
  (result) => {
    return get(result, "pageInfos", {})
  },
)

export const getCurrentPageInfoExecutionResult = createSelector(
  getExecutionResult,
  (result) => {
    return get(result, "currentPageInfo", {})
  },
)

export const getGlobalInfoExecutionResult = createSelector(
  [
    getCurrentUserInfoExecutionResult,
    getBuilderInfoExecutionResult,
    getURLParamsExecutionResult,
    getLocalStorageExecutionResult,
    getPageInfosExecutionResult,
    getCurrentPageInfoExecutionResult,
  ],
  (
    currentUserInfo,
    builderInfo,
    urlParams,
    localStorage,
    pageInfos,
    currentPageInfo,
  ) => {
    const globalInfo: Record<string, any>[] = [
      {
        ...currentUserInfo,
        displayName: "currentUserInfo",
      },
      {
        ...builderInfo,
        displayName: "builderInfo",
      },
      {
        ...urlParams,
        displayName: "urlParams",
      },
      {
        ...localStorage,
        displayName: "localStorage",
      },
      {
        ...pageInfos,
        displayName: "pageInfos",
      },
      {
        ...currentPageInfo,
        displayName: "currentPageInfo",
      },
    ]
    return globalInfo
  },
)

export const getExecutionWidgetLayoutInfo = createSelector(
  [getExecution],
  (execution) => execution.widgetsLayoutInfo,
)

export const getPageLoadingActions = createSelector(
  [getActionExecutionResultArray],
  (actionResult) => {
    return actionResult.filter(
      (action) => action.config?.advancedConfig.runtime === "pageLoading",
    )
  },
)

export const getAppLoadedActions = createSelector(
  [getActionExecutionResultArray],
  (actions) => {
    return actions.filter(
      (action) => action.config?.advancedConfig.runtime === "appLoaded",
    )
  },
)

export const getIntervalActions = createSelector(
  [getActionExecutionResultArray],
  (actions) => {
    return actions.filter(
      (action) => action?.config?.advancedConfig.isPeriodically,
    )
  },
)

export const getCurrentPageWidgetExecutionResultArray = createSelector(
  [
    getCurrentPageDisplayName,
    getPageNameMapDescendantNodeDisplayNames,
    getWidgetExecutionResult,
  ],
  (
    currentPageDisplayName,
    pageNameMapDescendantNodeDisplayNames,
    widgetExecutionResult,
  ) => {
    const descendantNodeDisplayNames =
      pageNameMapDescendantNodeDisplayNames[currentPageDisplayName]
    if (!Array.isArray(descendantNodeDisplayNames)) return []
    const widgetExecutionResultArray: Record<string, any>[] = []
    descendantNodeDisplayNames.forEach((displayName) => {
      if (!widgetExecutionResult[displayName]) return
      widgetExecutionResultArray.push({
        ...widgetExecutionResult[displayName],
        displayName,
      })
    })
    return widgetExecutionResultArray
  },
)

export const getCurrentPageGeneralWidgetExecutionResultArray = createSelector(
  [getCurrentPageWidgetExecutionResultArray],
  (currentPageWidgetExecutionResult) => {
    const widgetExecutionResultArray: Record<string, any>[] = []
    currentPageWidgetExecutionResult.forEach((widget) => {
      if (!IGNORE_WIDGET_TYPES.has(widget.$widgetType)) {
        widgetExecutionResultArray.push(widget)
      }
    })
    return widgetExecutionResultArray
  },
)

export const getCurrentPageModalWidgetExecutionResultArray = createSelector(
  [getCurrentPageWidgetExecutionResultArray],
  (currentPageWidgetExecutionResult) => {
    const widgetExecutionResultArray: Record<string, any>[] = []
    currentPageWidgetExecutionResult.forEach((widget) => {
      if (widget.$widgetType === "MODAL_WIDGET") {
        widgetExecutionResultArray.push(widget)
      }
    })
    return widgetExecutionResultArray
  },
)

export const getDraggingComponentIDs = createSelector(
  [getExecution],
  (execution) => execution.draggingComponentIDs,
)

export const getResizingComponentIDs = createSelector(
  [getExecution],
  (execution) => {
    return execution.resizingComponentIDs
  },
)

export const getIsDragging = createSelector(
  [getDraggingComponentIDs],
  (ids) => {
    return ids.length > 0
  },
)

export const getIsResizing = createSelector(
  [getResizingComponentIDs],
  (ids) => {
    return ids.length > 0
  },
)
