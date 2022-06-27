import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  ExecutionState,
  SetExecutionPayload,
} from "@/redux/currentApp/executionTree/execution/executionState"
import { isObject } from "@/utils/typeHelper"

export const setExecutionReducer: CaseReducer<
  ExecutionState,
  PayloadAction<SetExecutionPayload>
> = (state, action) => {
  const { execution } = action.payload
  if (!isObject(execution)) {
    return state
  }
  Object.keys(execution).forEach((key) => {
    state[key] = execution[key]
  })
}
