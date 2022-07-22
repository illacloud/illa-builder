import { RootState } from "@/store"

export const getActionList = (state: RootState) => state.currentApp.action
