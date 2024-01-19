import { ActionContent, ActionItem } from "@illa-public/public-types"
import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { klona } from "klona/json"
import { set } from "lodash-es"
import {
  RemoveActionItemReducerPayload,
  UpdateActionDisplayNamePayload,
  UpdateActionSlicePropsPayload,
  actionInitialState,
} from "@/redux/currentApp/action/actionState"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { isObject } from "@/utils/typeHelper"

export const initActionListReducer: CaseReducer<
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

export const batchAddActionItemReducer: CaseReducer<
  ActionItem<ActionContent>[],
  PayloadAction<ActionItem<ActionContent>[]>
> = (state, action) => {
  return state.concat(action.payload)
}

export const updateActionItemReducer: CaseReducer<
  ActionItem<ActionContent>[],
  PayloadAction<ActionItem<ActionContent>>
> = (state, action) => {
  const index = state.findIndex((item: ActionItem<ActionContent>) => {
    return item.actionID === action.payload.actionID
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
    return item.actionID === action.payload.actionID
  })
  if (index != -1) {
    DisplayNameGenerator.removeDisplayName(state[index].displayName)
    state[index].displayName = action.payload.newDisplayName
    DisplayNameGenerator.addDisplayNames([action.payload.newDisplayName])
  }
  return state
}

export const batchUpdateMultiActionSlicePropsReducer: CaseReducer<
  ActionItem<ActionContent>[],
  PayloadAction<UpdateActionSlicePropsPayload[]>
> = (state, action) => {
  action.payload.forEach(({ actionID, displayName, propsSlice }) => {
    if (!isObject(propsSlice) || !displayName) {
      return
    }
    const actionIndex = state.findIndex((item) => {
      return item.actionID === actionID
    })
    if (actionIndex === -1) return
    const action = state[actionIndex]
    const clonedAction = klona(action)
    Object.keys(propsSlice).forEach((path) => {
      const newValue = propsSlice[path]
      set(clonedAction, path, newValue)
    })
    state[actionIndex] = clonedAction
  })
}

export const removeActionItemReducer: CaseReducer<
  ActionItem<ActionContent>[],
  PayloadAction<RemoveActionItemReducerPayload>
> = (state, action) => {
  state.splice(
    state.findIndex(
      (item: ActionItem<ActionContent>) =>
        item.displayName === action.payload.displayName,
    ),
    1,
  )
  DisplayNameGenerator.removeDisplayName(action.payload.displayName)

  return state
}

export const resetActionReducer: CaseReducer<
  ActionItem<ActionContent>[],
  PayloadAction
> = () => {
  return actionInitialState
}

export const batchUpdateResourceID: CaseReducer<
  ActionItem<ActionContent>[],
  PayloadAction<Record<string, { actionID: string; resourceID: string }>>
> = (state, action) => {
  const payload = action.payload
  Object.values(payload).forEach(({ actionID, resourceID }) => {
    const index = state.findIndex((item: ActionItem<ActionContent>) => {
      return item.actionID === actionID
    })
    if (index != -1) {
      state[index].resourceID = resourceID
    }
  })
}

export const batchUpdateActionItemReducer: CaseReducer<
  ActionItem<ActionContent>[],
  PayloadAction<ActionItem<ActionContent>[]>
> = (state, action) => {
  action.payload.forEach((item) => {
    const index = state.findIndex((actionItem) => {
      return actionItem.actionID === item.actionID
    })
    if (index != -1) {
      state[index] = item
    }
  })
  return state
}
