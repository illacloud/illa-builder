import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  ActionContent,
  ActionItem,
  actionInitialState,
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
  return state
}

export const updateActionItemReducer: CaseReducer<
  ActionItem<ActionContent>[],
  PayloadAction<ActionItem<ActionContent>>
> = (state, action) => {
  const index = state.findIndex((item: ActionItem<ActionContent>) => {
    return item.actionId === action.payload.actionId
  })
  if (index != -1) {
    state[index] = action.payload
  }
  return state
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
  return state
}

export const resetActionReducer: CaseReducer<
  ActionItem<ActionContent>[],
  PayloadAction
> = (state, action) => {
  return actionInitialState
}
