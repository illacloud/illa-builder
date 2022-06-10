import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  DragShadow,
  DragShadowState,
} from "@/redux/currentApp/editor/dragShadow/dragShadowState"

export const addOrUpdateDragShadowReducer: CaseReducer<
  DragShadowState,
  PayloadAction<DragShadow>
> = (state, action) => {
  state.map[action.payload.displayName] = action.payload
}

export const removeDragShadowReducer: CaseReducer<
  DragShadowState,
  PayloadAction<string>
> = (state, action) => {
  delete state.map[action.payload]
}
