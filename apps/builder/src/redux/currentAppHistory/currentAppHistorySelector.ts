import { RootState } from "@/store"

export const getCurrentAppSnapshotList = (state: RootState) => {
  return state.currentAppHistory.snapshotList
}

export const getSnapshotListHasMore = (state: RootState) => {
  return state.currentAppHistory.hasMore
}

export const getCurrentAppSnapshotID = (state: RootState) => {
  return state.currentAppHistory.currentSnapshotID
}
