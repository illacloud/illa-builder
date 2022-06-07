import { RootState } from "@/store"

export const selectAllResource = (state: RootState) =>
  state.currentApp.action.resource
