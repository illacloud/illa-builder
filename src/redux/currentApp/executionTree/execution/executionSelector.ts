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
