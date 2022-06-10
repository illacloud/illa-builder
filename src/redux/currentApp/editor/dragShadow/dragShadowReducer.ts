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
