import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "@/store"

export const getCurrentId = (state: RootState) => state.team.currentId
export const getTeamItems = (state: RootState) => state.team.items
export const getCurrentMemberList = (state: RootState) =>
  state.team.currentMemberList

export const getCurrentTeamInfo = createSelector(
  [getCurrentId, getTeamItems],
  (currentId, items) => {
    if (!currentId || !items) return
    return items.find((item) => item.id === currentId)
  },
)

export const getCurrentTeamTotalLicense = createSelector(
  [getCurrentTeamInfo],
  (teamInfo) => {
    if (!teamInfo) return
    return teamInfo.totalTeamLicense
  },
)
