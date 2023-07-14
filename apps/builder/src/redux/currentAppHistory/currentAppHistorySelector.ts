import { RootState } from "@/store"

export const getCurrentAppSnapshotList = (state: RootState) => {
  return state.currentAppHistory.snapshotList
}

export const getCurrentAppSnapshotID = (state: RootState) => {
  return state.currentAppHistory.currentSnapshotID
}
