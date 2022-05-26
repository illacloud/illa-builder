import { createSlice } from "@reduxjs/toolkit"
import { AppThunk } from "@/store"
import {
  actionListInitialState,
  ActionListState,
} from "@/redux/action/actionList/actionListState"
import { selectAllActionItem } from "@/redux/action/actionList/actionListSelector"
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

export const {
  addActionItemReducer: addActionItem,
  updateActionItemReducer: updateActionItem,
  removeActionItemReducer: removeActionItem,
} = actionListSlice.actions

export const removeActionItemThunk =
  (id: string, cb: (actionItems: ActionListState) => void): AppThunk =>
  (dispatch, getState) => {
    dispatch(removeActionItem(id))
    cb(selectAllActionItem(getState()))
  }
