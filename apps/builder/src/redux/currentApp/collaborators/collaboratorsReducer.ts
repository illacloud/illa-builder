import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  CollaboratorsInfo,
  CollaboratorsState,
} from "@/redux/currentApp/collaborators/collaboratorsState"

// update component attach user
export const setComponentAttachedUsers: CaseReducer<
  CollaboratorsState,
  PayloadAction<{ componentAttachedUsers: Record<string, CollaboratorsInfo[]> }>
> = (state, action) => {
  state.components = action.payload.componentAttachedUsers
}

// update component attach user
export const updateComponentAttachedUsers: CaseReducer<
  CollaboratorsState,
  PayloadAction<{ componentAttachedUsers: Record<string, CollaboratorsInfo[]> }>
> = (state, action) => {
  state.components = action.payload.componentAttachedUsers
}

// enter room
export const setInRoomUsers: CaseReducer<
  CollaboratorsState,
  PayloadAction<{ inRoomUsers: CollaboratorsInfo[] }>
> = (state, action) => {
  state.inRoomUsers = action.payload.inRoomUsers
}
