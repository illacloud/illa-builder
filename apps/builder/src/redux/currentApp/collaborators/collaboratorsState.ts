import { SenderType } from "@/page/AI/components/PreviewChat/interface"

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
