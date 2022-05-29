import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { LiveFamilyState, Presence } from "@/redux/liveFamily/liveFamilyState"
import { AddPresencePayload } from "@/redux/liveFamily/liveFamilyPayload"

export const updateLiveFamilyListReducer: CaseReducer<
  LiveFamilyState,
  PayloadAction<Presence[]>
> = (state, action) => {
  state.others = action.payload
  return state
}

export const addPresenceReducer: CaseReducer<
  LiveFamilyState,
  PayloadAction<AddPresencePayload>
> = (state, action) => {
  if (action.payload.index != undefined) {
    let list = state.others
    state.others = [
      ...list.splice(0, action.payload.index),
      action.payload.presence,
      ...list.splice(action.payload.index, list.length),
    ]
  } else {
    state.others = [...state.others, action.payload.presence]
  }
  return state
}

export const removePresenceReducer: CaseReducer<
  LiveFamilyState,
  PayloadAction<string>
> = (state, action) => {
  let index = state.others.findIndex((element, index) => {
    return element.userId == action.payload
  })
  if (index != -1) {
    let list = state.others
    state.others = [
      ...list.splice(0, index),
      ...list.splice(index + 1, list.length),
    ]
  }
  return state
}

export const updatePresenceReducer: CaseReducer<
  LiveFamilyState,
  PayloadAction<Presence>
> = (state, action) => {
  let index = state.others.findIndex((element, index) => {
    return element.userId == action.payload.userId
  })
  if (index != -1) {
    state.others[index] = action.payload
  }
  return state
}
