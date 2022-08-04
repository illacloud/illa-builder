import { RootState } from "@/store"
import { createSelector } from "@reduxjs/toolkit"

export const getExecution = (state: RootState) =>
  state.currentApp.executionTree.execution

export const getExecutionResult = createSelector(
  [getExecution],
  (execution) => execution.result,
)

export const getExecutionError = createSelector(
  [getExecution],
  (execution) => execution.error ?? {},
)

export const getWidgetExecutionResult = createSelector(
  [getExecutionResult],
  (executionResult) => {
    const widgetExecutionResult: Record<string, any> = {}
    Object.keys(executionResult).forEach((key) => {
      const widgetOrAction = executionResult[key]
      if (widgetOrAction.$type === "WIDGET") {
        widgetExecutionResult[key] = widgetOrAction
      }
    })
    return widgetExecutionResult
  },
)

export const getWidgetExecutionResultArray = createSelector(
  [getWidgetExecutionResult],
  (widgetExecutionResult) => {
    const widgetExecutionResultArray: Record<string, any>[] = []
    Object.keys(widgetExecutionResult).forEach((key) => {
      widgetExecutionResultArray.push({
        ...widgetExecutionResult[key],
        displayName: key,
      })
    })
    return widgetExecutionResultArray
  },
)

export const getActionExecutionResult = createSelector(
  [getExecutionResult],
  (executionResult) => {
    const actionExecutionResult: Record<string, any> = {}
    Object.keys(executionResult).forEach((key) => {
      const widgetOrAction = executionResult[key]
      if (widgetOrAction.$type === "ACTION") {
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

export const getGlobalInfoExecutionResult = createSelector(
  [getExecutionResult],
  (executionResult) => {
    const globalInfo: Record<string, any>[] = []
    Object.keys(executionResult).forEach((key) => {
      if (key === "builderInfo" || key === "currentUser") {
        globalInfo.push({ ...executionResult[key], displayName: key })
      }
    })
    return globalInfo
  },
)
