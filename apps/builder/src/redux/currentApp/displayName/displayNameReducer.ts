import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import store from "@/store"
import { DisplayNameState } from "@/redux/currentApp/displayName/displayNameState"

export const addDisplayNameReducer: CaseReducer<
  DisplayNameState,
  PayloadAction<string>
> = (state, action) => {
  if (!state.includes(action.payload)) {
    state.push(action.payload)
  }
}

export const updateDisplayNameReducer: CaseReducer<
  DisplayNameState,
  PayloadAction<string[]>
> = (state, action) => {
  return action.payload
}

export const removeDisplayNameMultiReducer: CaseReducer<
  DisplayNameState,
  PayloadAction<string[]>
> = (state, action) => {
  action.payload.forEach((displayName) => {
    if (state.includes(displayName)) {
      state.splice(state.indexOf(displayName), 1)
    }
  })
}

export const removeDisplayNameReducer: CaseReducer<
  DisplayNameState,
  PayloadAction<string>
> = (state, action) => {
  if (state.includes(action.payload)) {
    state.splice(state.indexOf(action.payload), 1)
  }
}

export function isAlreadyGenerate(displayName: string): boolean {
  return store.getState().currentApp.displayName.includes(displayName)
}
