import { MovingMessageBin } from "@/api/ws/ILLA_PROTO"

export interface CursorInfo {
  userID: MovingMessageBin["userID"]
  nickname: MovingMessageBin["nickname"]
  parentDisplayName: MovingMessageBin["parentDisplayName"]
  status: MovingMessageBin["status"] // -1 is is Leave,1 is moving, 0 is stop
  x: MovingMessageBin["x"]
  y: MovingMessageBin["y"]
  w: MovingMessageBin["w"]
  h: MovingMessageBin["h"]
  lastUpdateTime: number
}

export type UpdateCursorPayload = CursorInfo

export type CursorState = Record<string, CursorInfo[]>

export const CursorInitialState: CursorState = {}
