import { createSlice } from "@reduxjs/toolkit"
import { actionListInitialState } from "@/redux/action/actionList/actionListState"
import {
  addActionItemReducer,
  removeActionItemReducer,
  updateActionItemReducer,
} from "@/redux/action/actionList/actionListReducer"

const actionListSlice = createSlice({
  name: "actionList",
  initialState: actionListInitialState,
  reducers: {
    addActionItemReducer,
    updateActionItemReducer,
    removeActionItemReducer,
  },
})

export default actionListSlice.reducer
export const actionListActions = actionListSlice.actions
