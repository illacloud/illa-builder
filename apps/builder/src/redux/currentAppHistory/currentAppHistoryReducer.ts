import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  CurrentAppHistory,
  Snapshot,
} from "@/redux/currentAppHistory/currentAppHistoryState"

export const updateCurrentAppHistoryReducer: CaseReducer<
  CurrentAppHistory,
  PayloadAction<Snapshot[]>
> = (state, action) => {
  const { payload } = action
  state.snapshotList = payload
}

// update currentSnapshotID
export const updateCurrentSnapshotIDReducer: CaseReducer<
  CurrentAppHistory,
  PayloadAction<string>
> = (state, action) => {
  const { payload } = action
  state.currentSnapshotID = payload
}
