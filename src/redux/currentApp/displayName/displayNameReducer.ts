import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { DisplayNameState } from "@/redux/currentApp/displayName/displayNameState"
import { DisplayNamePayload } from "@/redux/currentApp/displayName/displayNamePayload"
import store from "@/store"

export const addDisplayNameReducer: CaseReducer<
  DisplayNameState,
  PayloadAction<DisplayNamePayload>
> = (state, action) => {
  if (state.cacheMap[action.payload.type] == null) {
    state.cacheMap[action.payload.type] = []
  }
  if (
    !state.cacheMap[action.payload.type].includes(action.payload.displayName)
  ) {
    state.cacheMap[action.payload.type].push(action.payload.displayName)
  }
}

export const removeDisplayNameReducer: CaseReducer<
  DisplayNameState,
  PayloadAction<DisplayNamePayload>
> = (state, action) => {
  if (
    state.cacheMap[action.payload.type] != null &&
    state.cacheMap[action.payload.type].includes(action.payload.displayName)
  ) {
    const index = state.cacheMap[action.payload.type].indexOf(
      action.payload.displayName,
    )
    state.cacheMap[action.payload.type].splice(index, 1)
  }
}

export function isAlreadyGenerate(payload: DisplayNamePayload): boolean {
  return (
    payload.type in store.getState().currentApp.displayName.cacheMap &&
    store
      .getState()
      .currentApp.displayName.cacheMap[payload.type].includes(
        payload.displayName,
      )
  )
}
