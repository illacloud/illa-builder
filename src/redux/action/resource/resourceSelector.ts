import { RootState } from "@/store"

export const selectAllResource = (state: RootState) => state.action.resource
