import { RootState } from "@/store"

export const getOthersPresence = (state: RootState) => {
  return state.liveFamily.others
}
