import { RootState } from "@/store"

export const selectAllActionItem = (state: RootState) =>
  state.currentApp.action.actionList
