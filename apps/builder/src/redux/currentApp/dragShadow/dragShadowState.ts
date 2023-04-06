import { MovingMessageBin } from "@/api/ws/ILLA_PROTO"

export interface DragShadowInfo {
  userID: MovingMessageBin["userID"]
  nickname: MovingMessageBin["nickname"]
  parentDisplayName: MovingMessageBin["parentDisplayName"]
  displayNames: MovingMessageBin["displayNames"]
  status: MovingMessageBin["status"] // 2 is dragging move,-1 is drop end
  rectX: MovingMessageBin["x"]
  rectY: MovingMessageBin["y"]
  rectW: MovingMessageBin["w"]
  rectH: MovingMessageBin["h"]
  canDrop: boolean
  lastUpdateTime: number
}

export type UpdateCursorPayload = DragShadowInfo

export type DragShadowState = Record<string, DragShadowInfo[]>

export const DragShadowInitialState: DragShadowState = {}
