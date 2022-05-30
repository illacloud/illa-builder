import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  ActionListState,
  ActionItem,
} from "@/redux/currentApp/action/actionList/actionListState"

export const addActionItemReducer: CaseReducer<
  ActionListState,
  PayloadAction<ActionItem>
> = (state, action) => {
  return [...state, action.payload]
}

export const updateActionItemReducer: CaseReducer<
  ActionListState,
  PayloadAction<Partial<ActionItem>>
> = (state, action) => {
  let targetActionIndex = state.findIndex(
    (item: ActionItem) => item.id === action.payload.id,
  )

  state.splice(targetActionIndex, 1, {
    ...state[targetActionIndex],
    ...action.payload,
  })

  return state
}

export const removeActionItemReducer: CaseReducer<
  ActionListState,
  PayloadAction<string>
> = (state, action) => {
  state.splice(
    state.findIndex((item: ActionItem) => item.id === action.payload),
    1,
  )
  return state
}
