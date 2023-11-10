import { ComponentTreeNode } from "@illa-public/public-types"
import { TextSignal, TextTarget } from "@/api/ws/textSignal"

export type RoomType = "dashboard" | "app" | "ai-agent"

export interface Room {
  wsURL: string
}

export interface Broadcast {
  type: string
  payload: any
}

export interface Callback<T> {
  broadcast: Broadcast
  // extra data
  data: T
  // string
  errorMessage: string
  // 0 success, not zero error
  errorCode: number
  target: TextTarget
  signal: TextSignal
}

export interface ILLAWebSocketComponentPayload {
  before: {
    displayName: string
  }
  after: ComponentTreeNode
}

export enum ILLA_WEBSOCKET_STATUS {
  INIT = "INIT",
  CONNECTING = "CONNECTING",
  CONNECTED = "CONNECTED",
  CLOSED = "CLOSED",
  FAILED = "FAILED",
  LOCKING = "LOCKING",
}

export enum ILLA_WEBSOCKET_CONTEXT {
  DASHBOARD = "DASHBOARD",
  APP = "APP",
  APP_BINARY = "APP_BINARY",
  AI_AGENT = "AI_AGENT",
}
