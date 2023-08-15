import { SenderType } from "@/redux/aiAgent/aiAgentState"

export interface CollaboratorsInfo {
  id: string
  nickname: string
  avatar: string
  roomRole: SenderType
}

export interface CollaboratorsState {
  components: Record<string, CollaboratorsInfo[]>
  inRoomUsers: CollaboratorsInfo[]
}

export const CollaboratorsInitialState: CollaboratorsState = {
  inRoomUsers: [],
  components: {},
}

export const ComponentAvatarSize = 14
export const ComponentAvatarSpacing = 4

export const MAX_AVATAR_COUNT = 3
