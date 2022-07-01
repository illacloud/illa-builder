import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { DisplayNameState } from "@/redux/currentApp/displayName/displayNameState"
import store from "@/store"

export const addDisplayNameReducer: CaseReducer<
  DisplayNameState,
  PayloadAction<string>
> = (state, action) => {
  if (!state.displayNameList.includes(action.payload)) {
    state.displayNameList.push(action.payload)
  }
}

export const updateDisplayNameReducer: CaseReducer<
  DisplayNameState,
  PayloadAction<DisplayNameState>
> = (state, action) => {
  return action.payload
}

export const removeDisplayNameReducer: CaseReducer<
  DisplayNameState,
  PayloadAction<string>
> = (state, action) => {
  if (state.displayNameList.includes(action.payload)) {
    state.displayNameList.splice(
      state.displayNameList.indexOf(action.payload),
      1,
    )
  }
}

export function isAlreadyGenerate(displayName: string): boolean {
  return store
    .getState()
    .currentApp.displayName.displayNameList.includes(displayName)
}
