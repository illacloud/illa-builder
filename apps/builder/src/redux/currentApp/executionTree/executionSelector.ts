import { createSelector } from "@reduxjs/toolkit"
import { cloneDeep } from "lodash"
import { getBuilderInfo } from "@/redux/builderInfo/builderInfoSelector"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import { getAllComponentDisplayNameMapProps } from "@/redux/currentApp/editor/components/componentsSelector"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { RootState } from "@/store"
import { RawTreeFactory } from "@/utils/executionTreeHelper/rawTreeFactory"
import { isObject } from "@/utils/typeHelper"

export const getRawTree = createSelector(
  [
    getActionList,
    getAllComponentDisplayNameMapProps,
    getCurrentUser,
    getBuilderInfo,
  ],
  (actions, widgets, currentUserInfo, builderInfo) => {
    return RawTreeFactory.create({
      actions: actions ?? [],
      widgets: widgets ?? {},
      currentUserInfo,
      builderInfo,
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

export const getGeneralWidgetExecutionResultArray = createSelector(
  [getWidgetExecutionResult],
  (widgetExecutionResult) => {
    const widgetExecutionResultArray: Record<string, any>[] = []
    Object.keys(widgetExecutionResult).forEach((key) => {
      if (!IGNORE_WIDGET_TYPES.has(widgetExecutionResult[key].$widgetType)) {
        widgetExecutionResultArray.push({
          ...widgetExecutionResult[key],
          displayName: key,
        })
      }
    })
    return widgetExecutionResultArray
  },
)
export const getModalWidgetExecutionResultArray = createSelector(
  [getWidgetExecutionResult],
  (widgetExecutionResult) => {
    const widgetExecutionResultArray: Record<string, any>[] = []
    Object.keys(widgetExecutionResult).forEach((key) => {
      if (widgetExecutionResult[key].$widgetType === "MODAL_WIDGET") {
        widgetExecutionResultArray.push({
          ...widgetExecutionResult[key],
          displayName: key,
        })
      }
    })
    return widgetExecutionResultArray
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

export const getCurrentPageDisplayName = createSelector(
  [getRootNodeExecutionResult],
  (rootNode) => {
    const { pageSortedKey, currentPageIndex } = rootNode
    if (currentPageIndex > pageSortedKey.lengths) return pageSortedKey[0]
    return pageSortedKey[currentPageIndex]
  },
)

export const getExecutionResultToCodeMirror = createSelector(
  [getExecutionResult],
  (executionResult) => {
    const result: Record<string, unknown> = {}
    Object.keys(executionResult).forEach((key) => {
      if (!IGNORE_WIDGET_TYPES.has(executionResult[key]?.$widgetType)) {
        result[key] = cloneDeep(executionResult[key])
      }
    })
    Object.keys(result).forEach((key) => {
      const componentOrAction = result[key]
      if (isObject(componentOrAction)) {
        Object.keys(componentOrAction as Record<string, unknown>).forEach(
          (key) => {
            if (key.startsWith("$")) {
              delete (componentOrAction as Record<string, unknown>)[key]
            }
          },
        )
      }
    })
    return result
  },
)
