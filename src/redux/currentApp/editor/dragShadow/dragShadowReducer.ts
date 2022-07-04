import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  DragShadow,
  DragShadowState,
} from "@/redux/currentApp/editor/dragShadow/dragShadowState"

export const updateDragShadowReducer: CaseReducer<
  DragShadowState,
  PayloadAction<DragShadowState>
> = (state, action) => {
  return action.payload
}

export const addOrUpdateDragShadowReducer: CaseReducer<
  DragShadowState,
  PayloadAction<DragShadow>
> = (state, action) => {
  state[action.payload.displayName] = action.payload
}

export const removeDragShadowReducer: CaseReducer<
  DragShadowState,
  PayloadAction<string>
> = (state, action) => {
  delete state[action.payload]
}
