import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  ExecutionState,
  SetExecutionErrorPayload,
  SetExecutionResultPayload,
} from "@/redux/currentApp/executionTree/execution/executionState"
import { isObject } from "@/utils/typeHelper"

export const setExecutionResultReducer: CaseReducer<
  ExecutionState,
  PayloadAction<SetExecutionResultPayload>
> = (state, action) => {
  const { result } = action.payload
  if (!isObject(result)) {
    return state
  }
  state.result = result
}

export const setExecutionErrorReducer: CaseReducer<
  ExecutionState,
  PayloadAction<SetExecutionErrorPayload>
> = (state, action) => {
  const { error } = action.payload
  if (!isObject(error)) {
    return state
  }
  state.error = error
}
