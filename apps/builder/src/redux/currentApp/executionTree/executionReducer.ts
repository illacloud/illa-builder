import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { applyChange } from "deep-diff"
import { cloneDeep } from "lodash"
import {
  DependenciesState,
  ErrorShape,
  ExecutionState,
  UpdateExecutionByDisplayNamePayload,
  setExecutionResultPayload,
} from "@/redux/currentApp/executionTree/executionState"

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

export const setExecutionDebuggerDataReducer: CaseReducer<
  ExecutionState,
  PayloadAction<Record<string, ErrorShape[]>>
> = (state, action) => {
  state.debuggerData = action.payload
}

export const startExecutionReducer: CaseReducer<
  ExecutionState,
  PayloadAction<void>
> = (state) => {
  return state
}

export const updateExecutionByDisplayNameReducer: CaseReducer<
  ExecutionState,
  PayloadAction<UpdateExecutionByDisplayNamePayload>
> = (state, action) => {
  const { displayName, value } = action.payload
  state.result[displayName] = {
    ...state.result[displayName],
    ...value,
  }
}

export const updateExecutionByMultiDisplayNameReducer: CaseReducer<
  ExecutionState,
  PayloadAction<UpdateExecutionByDisplayNamePayload[]>
> = (state, action) => {
  action.payload.forEach(({ displayName, value }) => {
    state.result[displayName] = {
      ...state.result[displayName],
      ...value,
    }
  })
}

export const updateModalDisplayReducer: CaseReducer<
  ExecutionState,
  PayloadAction<{
    displayName: string
    display: boolean
  }>
> = (state, action) => {
  const result = state.result
  const currentNode = result[action.payload.displayName]
  if (!currentNode) return state
  const parentNodeDisplayName = currentNode.$parentNode
  if (!parentNodeDisplayName) return state
  const parentNode = result[parentNodeDisplayName]
  if (
    !parentNode ||
    !Array.isArray(parentNode.$childrenNode) ||
    parentNode.$childrenNode.length === 0
  )
    return state
  const otherNodeDisplayNames = parentNode.$childrenNode.filter(
    (key: string) => key !== action.payload.displayName,
  )
  currentNode.isVisible = action.payload.display
  if (action.payload.display) {
    otherNodeDisplayNames.forEach((key: string) => {
      const node = result[key]
      if (node) {
        node.isVisible = false
      }
    })
  }
}
