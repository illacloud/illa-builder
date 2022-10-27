import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  ActionContent,
  ActionEvents,
  ActionItem,
} from "@/redux/currentApp/action/actionState"

export const updateActionListReducer: CaseReducer<
  ActionItem<ActionContent, ActionEvents>[],
  PayloadAction<ActionItem<ActionContent, ActionEvents>[]>
> = (_, action) => {
  return action.payload
}

export const addActionItemReducer: CaseReducer<
  ActionItem<ActionContent, ActionEvents>[],
  PayloadAction<ActionItem<ActionContent, ActionEvents>>
> = (state, action) => {
  state.push(action.payload)
  return state
}

export const updateActionItemReducer: CaseReducer<
  ActionItem<ActionContent, ActionEvents>[],
  PayloadAction<ActionItem<ActionContent, ActionEvents>>
> = (state, action) => {
  const index = state.findIndex(
    (item: ActionItem<ActionContent, ActionEvents>) => {
      return item.actionId === action.payload.actionId
    },
  )
  if (index != -1) {
    state[index] = action.payload
  }
  return state
}

export const removeActionItemReducer: CaseReducer<
  ActionItem<ActionContent, ActionEvents>[],
  PayloadAction<string>
> = (state, action) => {
  state.splice(
    state.findIndex(
      (item: ActionItem<ActionContent, ActionEvents>) =>
        item.displayName === action.payload,
    ),
    1,
  )
  return state
}
