import { RootState } from "@/store"

export const getComponentAttachUsers = (state: RootState) => {
  return state.currentApp.collaborators.components
}

export const getCurrentAppAttachUsers = (state: RootState) => {
  return state.currentApp.collaborators.inRoomUsers
}
