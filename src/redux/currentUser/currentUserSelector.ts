import { RootState } from "@/store"

export const getCurrentUser = (state: RootState) => {
  return state.currentUser
}
