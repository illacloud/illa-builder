import { RootState } from "@/store"
import { CollaboratorsInfo } from "./collaboratorsState"

export const getComponentAttachUsers = (state: RootState) => {
  return state.currentApp.collaborators.components
}

export const getCurrentAppAttachUsers = (state: RootState) => {
  return state.currentApp.collaborators.inRoomUsers
}

export const getTargetCurrentUsersExpendMe = (
  attachUsers: Record<string, CollaboratorsInfo[]>,
  targetComponentDisplayName: string,
  currentUserId: string,
): CollaboratorsInfo[] => {
  const targetComponentAttachUsers = attachUsers[targetComponentDisplayName]
  if (!targetComponentAttachUsers) return []
  return targetComponentAttachUsers.filter((user) => user.id !== currentUserId)
}
