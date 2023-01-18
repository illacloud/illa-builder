import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "@/store"

export const getCurrentId = (state: RootState) => state.team.currentId
export const getTeamItems = (state: RootState) => state.team.items

export const getCurrentTeamInfo = createSelector(
  [getCurrentId, getTeamItems],
  (currentId, items) => {
    if (!currentId || !items) return
    return items.find((item) => item.id === currentId)
  },
)

export const getCurrentTeamIdentifier = createSelector(
  [getCurrentId, getTeamItems],
  (currentId, items) => {
    if (!currentId || !items) return
    return items.find((item) => item.id === currentId)?.identifier
  },
)
