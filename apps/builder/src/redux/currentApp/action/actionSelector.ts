import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "@/store"

export const getActionList = (state: RootState) => state.currentApp.action

export const getActionItemByDisplayName = (
  state: RootState,
  displayName: string,
) => {
  const actionList = getActionList(state)
  return actionList.find((item) => {
    return item.displayName === displayName
  })
}

export const getDisplayNameMapActions = createSelector(
  [getActionList],
  (actions) => {
    const displayNameMapActions: Record<string, any> = {}
    actions.forEach((action) => {
      displayNameMapActions[action.displayName] = action
    })
    return displayNameMapActions
  },
)
