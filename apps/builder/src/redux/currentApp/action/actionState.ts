import { ActionContent, ActionItem } from "@illa-public/public-types"

// TODO @aruseito not use any
export interface Events {
  successEvent?: any[]
  failedEvent?: any[]
}

export interface UpdateActionDisplayNamePayload {
  oldDisplayName: string
  newDisplayName: string
  actionID: string
}

export interface UpdateActionSlicePropsPayload {
  displayName: string
  actionID: string
  propsSlice: {
    [key: string]: unknown
  }
}

export const actionInitialState: ActionItem<ActionContent>[] = []

export interface RemoveActionItemReducerPayload {
  actionID: string
  displayName: string
}
