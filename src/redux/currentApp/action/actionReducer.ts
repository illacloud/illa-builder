import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"

export const updateActionListReducer: CaseReducer<
  ActionItem<ActionContent>[],
  PayloadAction<ActionItem<ActionContent>[]>
> = (_, action) => {
  return action.payload
}

export const addActionItemReducer: CaseReducer<
  ActionItem<ActionContent>[],
  PayloadAction<ActionItem<ActionContent>>
> = (state, action) => {
  state.push(action.payload)
}

export const updateActionItemReducer: CaseReducer<
  ActionItem<ActionContent>[],
  PayloadAction<ActionItem<ActionContent>>
> = (state, action) => {
  const index = state.findIndex(
    (item: ActionItem<ActionContent>) =>
      item.displayName === action.payload.displayName,
  )
  if (index != -1) {
    state[index] = action.payload
  }
}

export const removeActionItemReducer: CaseReducer<
  ActionItem<ActionContent>[],
  PayloadAction<string>
> = (state, action) => {
  state.splice(
    state.findIndex(
      (item: ActionItem<ActionContent>) => item.displayName === action.payload,
    ),
    1,
  )
}
