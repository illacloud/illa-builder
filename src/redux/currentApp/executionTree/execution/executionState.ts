export interface propShape {
  result: any
  error: boolean
  errorMessage: string
}

export interface ExecutionState {
  [key: string]: Record<string, propShape>
}

export interface SetExecutionPayload {
  execution: ExecutionState
}

export const executionInitialState: ExecutionState = {}
