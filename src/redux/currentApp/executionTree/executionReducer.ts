import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  DependenciesState,
  ErrorShape,
  ExecutionState,
  setExecutionResultPayload,
} from "@/redux/currentApp/executionTree/executionState"
import { applyChange } from "deep-diff"

export const setDependenciesReducer: CaseReducer<
  ExecutionState,
  PayloadAction<DependenciesState>
> = (state, action) => {
  state.dependencies = action.payload
}

export const setExecutionResultReducer: CaseReducer<
  ExecutionState,
  PayloadAction<setExecutionResultPayload>
> = (state, action) => {
  const { updates } = action.payload
  if (updates.length === 0) {
    return state
  }
  for (const update of updates) {
    if (!Array.isArray(update.path) || update.path.length === 0) {
      continue
    }
    try {
      applyChange(state.result, undefined, update)
    } catch (e) {
      console.error(e)
    }
  }
}

export const setExecutionErrorReducer: CaseReducer<
  ExecutionState,
  PayloadAction<Record<string, ErrorShape[]>>
> = (state, action) => {
  state.error = action.payload
}

export const startExecutionReducer: CaseReducer<
  ExecutionState,
  PayloadAction<void>
> = (state) => {
  return state
}
