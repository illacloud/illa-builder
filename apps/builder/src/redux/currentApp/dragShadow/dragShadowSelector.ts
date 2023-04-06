import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "@/store"

export const getDragShadowInfo = (state: RootState) => {
  return state.currentApp.dragShadow
}

export const getDragShadowInfoArray = createSelector(
  [getDragShadowInfo],
  (cursor) => Object.values(cursor),
)
