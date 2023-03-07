import {
  ILLA_WEBSOCKET_CONTEXT,
  ILLA_WEBSOCKET_STATUS,
} from "@/api/ws/interface"

export interface UpdateCanvasShapePayload {
  canvasWidth: number
  canvasHeight: number
}

export interface UpdateWSStatusPayload {
  context: ILLA_WEBSOCKET_CONTEXT
  wsStatus: ILLA_WEBSOCKET_STATUS
}
