import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import store from "@/store"

export const addDisplayNameReducer: CaseReducer<
  string[],
  PayloadAction<string>
> = (state, action) => {
  if (!state.includes(action.payload)) {
    state.push(action.payload)
  }
}

export const updateDisplayNameReducer: CaseReducer<
  string[],
  PayloadAction<string[]>
> = (state, action) => {
  return action.payload
}

export const removeDisplayNameReducer: CaseReducer<
  string[],
  PayloadAction<string>
> = (state, action) => {
  if (state.includes(action.payload)) {
    state.splice(state.indexOf(action.payload), 1)
  }
}

export function isAlreadyGenerate(displayName: string): boolean {
  return store.getState().currentApp.displayName.includes(displayName)
}
