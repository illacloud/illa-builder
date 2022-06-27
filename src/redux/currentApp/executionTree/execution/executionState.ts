export interface ErrorShape {
  error: boolean
  errorMessage: string | undefined
}

export interface ExecutionState {
  result: {
    [key: string]: Record<string, any>
  }
  error: { [key: string]: Record<string, ErrorShape> }
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
