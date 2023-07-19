import { createSlice } from "@reduxjs/toolkit"
import {
  initCurrentAppHistoryReducer,
  updateCurrentAppHistoryReducer,
  updateCurrentSnapshotIDReducer,
} from "@/redux/currentAppHistory/currentAppHistoryReducer"
import { CurrentAppHistoryInitialState } from "@/redux/currentAppHistory/currentAppHistoryState"

const currentAppHistorySlice = createSlice({
  name: "currentAppHistory",
  initialState: CurrentAppHistoryInitialState,
  reducers: {
    initCurrentAppHistoryReducer,
    updateCurrentAppHistoryReducer,
    updateCurrentSnapshotIDReducer,
  },
})

export const currentAppHistoryActions = currentAppHistorySlice.actions
export default currentAppHistorySlice.reducer
