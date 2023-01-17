import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  CollaboratorsInfo,
  CollaboratorsState,
} from "@/redux/currentApp/collaborators/collaboratorsState"

// update component attach user
export const clearComponentAttachedUsers: CaseReducer<
  CollaboratorsState,
  PayloadAction<Record<string, CollaboratorsInfo[]>>
> = (state, action) => {
  const payload = action.payload || {}
  state.components =
    Object.keys(payload).reduce((result, key) => {
      return {
        ...result,
        [key]: (payload[key] || []).reverse(),
      }
    }, {}) || {}
}

// update component attach user
export const updateComponentAttachedUsers: CaseReducer<
  CollaboratorsState,
  PayloadAction<Record<string, CollaboratorsInfo[]>>
> = (state, action) => {
  const payload = action.payload || {}
  state.components =
    Object.keys(payload).reduce((result, key) => {
      return {
        ...result,
        [key]: (payload[key] || []).reverse(),
      }
    }, {}) || {}
}

// enter room
export const setInRoomUsers: CaseReducer<
  CollaboratorsState,
  PayloadAction<{ inRoomUsers: CollaboratorsInfo[] }>
> = (state, action) => {
  state.inRoomUsers = action.payload.inRoomUsers.reverse()
}
