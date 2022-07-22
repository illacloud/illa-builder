import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { ActionItem } from "@/redux/currentApp/action/actionState"

export const updateActionListReducer: CaseReducer<
  ActionItem[],
  PayloadAction<ActionItem[]>
> = (_, action) => {
  return action.payload
}

export const addActionItemReducer: CaseReducer<
  ActionItem[],
  PayloadAction<ActionItem>
> = (state, action) => {
  state.push(action.payload)
}

export const updateActionItemReducer: CaseReducer<
  ActionItem[],
  PayloadAction<ActionItem>
> = (state, action) => {
  const index = state.findIndex(
    (item: ActionItem) => item.displayName === action.payload.displayName,
  )
  if (index != -1) {
    state[index] = action.payload
  }
}

export const removeActionItemReducer: CaseReducer<
  ActionItem[],
  PayloadAction<string>
> = (state, action) => {
  state.splice(
    state.findIndex((item: ActionItem) => item.displayName === action.payload),
    1,
  )
}
