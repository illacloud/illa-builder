export enum ExecutionErrorType {
  EVALUATED = "EVALUATED",
  LINT = "LINT",
  VALIDATION = "VALIDATION",
}

export interface ErrorShape {
  errorType: ExecutionErrorType
  errorMessage: string
  errorLine?: number
  errorColumn?: number
}

export interface ExecutionState {
  result: Record<string, any>
  error: Record<string, ErrorShape[]>
}

export interface SetExecutionResultPayload {
  result: ExecutionState["result"]
}

export interface SetExecutionErrorPayload {
  error: ExecutionState["error"]
}

export const executionInitialState: ExecutionState = {
  result: {},
  error: {},
}

export interface UpdateExecutionByDisplayNamePayload {
  displayName: string
  value: Record<string, any>
}
