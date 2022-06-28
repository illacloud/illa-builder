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
  (execution) => execution.error,
)

export const getWidgetExecutionResult = createSelector(
  [getExecutionResult],
  (executionResult) => {
    const widgetExecutionResult: Record<string, any> = {}
    Object.keys(executionResult).forEach((key) => {
      const entiy = executionResult[key]
      if (entiy.$type === "WIDGET") {
        widgetExecutionResult[key] = entiy
      }
    })
    return widgetExecutionResult
  },
)
