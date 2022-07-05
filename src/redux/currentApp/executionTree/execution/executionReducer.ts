import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  ExecutionState,
  SetExecutionErrorPayload,
  SetExecutionResultPayload,
  UpdateExecutionByDisplayNamePayload,
  UpdateExecutionErrorByAttrPathPayload,
} from "@/redux/currentApp/executionTree/execution/executionState"
import { isObject } from "@/utils/typeHelper"
import { get, set, cloneDeep } from "lodash"

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

export const setExecutionReducer: CaseReducer<
  ExecutionState,
  PayloadAction<ExecutionState>
> = (state, action) => {
  const { result, error } = action.payload
  state.result = result
  state.error = error
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

/**
 * example payload:
 * {
 *     attrPath:"mySQL.sql"  <-> "displayName.attrName"
 *     value: errorShape <-> { errorType: ExecutionErrorType.LINT, errorMessage: "errorMessage", errorLine: 1, errorColumn: 1 }
 * }
 **/
export const updateExecutionErrorByAttrPathReducer: CaseReducer<
  ExecutionState,
  PayloadAction<UpdateExecutionErrorByAttrPathPayload>
> = (state, action) => {
  const { attrPath, value } = action.payload
  if (!attrPath) {
    return
  }
  const newErrors = cloneDeep(state.error)
  const oldTargetErrors = get(state.error, attrPath, [])
  const newType = value.errorType
  const newTargetErrors = oldTargetErrors.filter(
    (error) => error.errorType !== newType,
  )
  set(newErrors, attrPath, [...newTargetErrors, value])

  state.error = newErrors
}
