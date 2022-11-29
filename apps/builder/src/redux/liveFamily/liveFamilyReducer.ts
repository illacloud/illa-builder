import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { AddPresencePayload } from "@/redux/liveFamily/liveFamilyPayload"
import { LiveFamilyState, Presence } from "@/redux/liveFamily/liveFamilyState"

export const updateLiveFamilyListReducer: CaseReducer<
  LiveFamilyState,
  PayloadAction<Presence[]>
> = (state, action) => {
  state.others = action.payload
}

export const addPresenceReducer: CaseReducer<
  LiveFamilyState,
  PayloadAction<AddPresencePayload>
> = (state, action) => {
  if (action.payload.index != undefined) {
    state.others.splice(action.payload.index, 0, action.payload.presence)
  } else {
    state.others.push(action.payload.presence)
  }
}

export const removePresenceReducer: CaseReducer<
  LiveFamilyState,
  PayloadAction<string>
> = (state, action) => {
  let index = state.others.findIndex((element, index) => {
    return element.userId == action.payload
  })
  if (index != -1) {
    state.others.splice(index, 1)
  }
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
}
