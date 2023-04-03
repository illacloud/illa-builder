import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export type RoomType = "dashboard" | "app"

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
}

export interface ILLAWebSocketComponentPayload {
  before: {
    displayName: string
  }
  after: ComponentNode
}

export enum ILLA_WEBSOCKET_STATUS {
  INIT = "INIT",
  CONNECTING = "CONNECTING",
  CONNECTED = "CONNECTED",
  CLOSED = "CLOSED",
  FAILED = "FAILED",
}

export enum ILLA_WEBSOCKET_CONTEXT {
  DASHBOARD = "DASHBOARD",
  APP = "APP",
  APP_BINARY = "APP_BINARY",
}
