import { MovingMessageBin } from "@/api/ws/ILLA_PROTO"

export interface DragShadowInfo {
  userID: MovingMessageBin["userID"]
  nickname: MovingMessageBin["nickname"]
  parentDisplayName: MovingMessageBin["parentDisplayName"]
  displayNames: MovingMessageBin["displayNames"]
  status: MovingMessageBin["status"] // 1 is Dragging move, 2 is resize,-1 is dragging end
  xInteger: MovingMessageBin["cursorXInteger"]
  yInteger: MovingMessageBin["cursorYInteger"]
  xMod: MovingMessageBin["cursorXMod"]
  yMod: MovingMessageBin["cursorYMod"]
  rectX: MovingMessageBin["widgetX"]
  rectY: MovingMessageBin["widgetY"]
  rectW: MovingMessageBin["widgetW"]
  rectH: MovingMessageBin["widgetH"]
  lastUpdateTime: number
}

export type UpdateCursorPayload = DragShadowInfo

export type DragShadowState = Record<string, DragShadowInfo[]>

export const DragShadowInitialState: DragShadowState = {}
