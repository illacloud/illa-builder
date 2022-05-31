import { createSlice } from "@reduxjs/toolkit"
import { actionListInitialState } from "@/redux/currentApp/action/actionList/actionListState"
import {
  addActionItemReducer,
  removeActionItemReducer,
  updateActionItemReducer,
} from "@/redux/currentApp/action/actionList/actionListReducer"

const actionListSlice = createSlice({
  name: "actionList",
  initialState: actionListInitialState,
  reducers: {
    addActionItemReducer,
    updateActionItemReducer,
    removeActionItemReducer,
  },
})

export const actionListActions = actionListSlice.actions
export default actionListSlice.reducer
