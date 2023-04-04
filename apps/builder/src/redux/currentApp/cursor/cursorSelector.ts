import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "@/store"

export const getCursor = (state: RootState) => {
  return state.currentApp.cursor
}

export const getCursorArray = createSelector([getCursor], (cursor) =>
  Object.values(cursor),
)
