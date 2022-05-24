import { RootState } from "@/store"
import { createSelector } from "@reduxjs/toolkit"
import { ActionListState } from "@/redux/action/actionList/actionListState"

export const selectAllActionItem = (state: RootState) => state.action.actionList
