import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { ActionItem } from "@/redux/action/actionList/actionListState"

export const addActionItemReducer: CaseReducer<
  ActionState,
  PayloadAction<string>
> = (state, action) => {}

export const updateActionItemReducer: CaseReducer<
  ActionState,
  PayloadAction<ActionItem>
> = (state, action) => {}

export const removeActionItemReducer: CaseReducer<
  ActionState,
  PayloadAction<string>
> = (state, action) => {}
