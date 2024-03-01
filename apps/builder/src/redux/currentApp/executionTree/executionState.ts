import { Diff } from "deep-diff"

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
  errorName?: string
}
export type DependenciesState = Record<string, string[]>

export interface ExecutionState {
  dependencies: DependenciesState
  result: Record<string, any>
  error: Record<string, ErrorShape[]>
  independencies: DependenciesState
}

export const executionInitialState: ExecutionState = {
  dependencies: {},
  result: {},
  error: {},
  independencies: {},
}

export interface setExecutionResultPayload {
  updates: Diff<Record<string, any>, Record<string, any>>[]
}

export interface UpdateExecutionByDisplayNamePayload {
  displayName: string
  value: Record<string, any>
}

export interface UpdateCurrentPagePathPayload {
  pageDisplayName: string
  subPagePath?: string
}
