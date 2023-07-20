import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { CurrentAppHistory } from "@/redux/currentAppHistory/currentAppHistoryState"

export const initCurrentAppHistoryReducer: CaseReducer<
  CurrentAppHistory,
  PayloadAction<CurrentAppHistory>
> = (state, action) => {
  const { payload } = action
  return { ...state, ...payload }
}

export const updateCurrentAppHistoryReducer: CaseReducer<
  CurrentAppHistory,
  PayloadAction<CurrentAppHistory>
> = (state, action) => {
  const { payload } = action

  return {
    ...state,
    ...payload,
    snapshotList: state.snapshotList.concat(payload.snapshotList),
  }
}

// update currentSnapshotID
export const updateCurrentSnapshotIDReducer: CaseReducer<
  CurrentAppHistory,
  PayloadAction<string>
> = (state, action) => {
  const { payload } = action
  state.currentSnapshotID = payload
}
