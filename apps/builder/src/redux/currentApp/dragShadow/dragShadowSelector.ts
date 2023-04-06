import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "@/store"

export const getDragShadowInfo = (state: RootState) => {
  return state.currentApp.dragShadow
}

export const getDragShadowInfoArray = createSelector(
  [getDragShadowInfo],
  (cursor) => Object.values(cursor),
)

export const getFirstDragShadowInfo = createSelector(
  [getDragShadowInfo],
  (dragShadows) => {
    return Object.keys(dragShadows).map((userID) => {
      if (dragShadows[userID].length > 0) {
        return dragShadows[userID][0]
      }
    })
  },
)
