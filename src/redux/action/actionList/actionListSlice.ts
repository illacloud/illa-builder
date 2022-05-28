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

export const {
  addActionItemReducer: addActionItem,
  updateActionItemReducer: updateActionItem,
  removeActionItemReducer: removeActionItem,
} = actionListSlice.actions

export default actionListSlice.reducer
