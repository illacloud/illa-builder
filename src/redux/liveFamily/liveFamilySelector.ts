import { RootState } from "@/store"

export const getOthersPresence = (state: RootState) => {
  state.liveFamily.others
}
