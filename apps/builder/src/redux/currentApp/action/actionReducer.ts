import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { cloneDeep, set } from "lodash"
import {
  ActionContent,
  ActionItem,
  UpdateActionDisplayNamePayload,
  UpdateActionSlicePropsPayload,
  actionInitialState,
} from "@/redux/currentApp/action/actionState"
import { isObject } from "@/utils/typeHelper"

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

export const updateActionDisplayNameReducer: CaseReducer<
  ActionItem<ActionContent>[],
  PayloadAction<UpdateActionDisplayNamePayload>
> = (state, action) => {
  const index = state.findIndex((item: ActionItem<ActionContent>) => {
    return item.actionId === action.payload.actionID
  })
  if (index != -1) {
    state[index].displayName = action.payload.newDisplayName
  }
  return state
}

export const batchUpdateMultiActionSlicePropsReducer: CaseReducer<
  ActionItem<ActionContent>[],
  PayloadAction<UpdateActionSlicePropsPayload[]>
> = (state, action) => {
  action.payload.forEach(({ displayName, propsSlice }) => {
    if (!isObject(propsSlice) || !displayName) {
      return
    }
    const actionIndex = state.findIndex((item) => {
      return item.displayName === displayName
    })
    if (actionIndex === -1) return
    const action = state[actionIndex]
    const clonedAction = cloneDeep(action)
    Object.keys(propsSlice).forEach((path) => {
      const newValue = propsSlice[path]
      set(clonedAction, path, newValue)
    })
    state[actionIndex] = clonedAction
  })
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
