import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export type RoomType = "dashboard" | "app"

export interface Room {
  wsURL: string
}

export enum Signal {
  SIGNAL_ENTER = 1,
  SIGNAL_LEAVE = 2,
  SIGNAL_CREATE_STATE = 3,
  SIGNAL_DELETE_STATE = 4,
  SIGNAL_UPDATE_STATE = 5,
  SIGNAL_MOVE_STATE = 6,
  SIGNAL_CREATE_OR_UPDATE_STATE = 7,
  SIGNAL_ONLY_BROADCAST = 8,
  SIGNAL_PUT_STATE = 9,
  SIGNAL_GLOBAL_BROADCAST_ONLY = 10,
  SIGNAL_COOPERATE_ATTACH = 11,
  SIGNAL_COOPERATE_DISATTACH = 12,
}

export enum Target {
  TARGET_NOTHING = 0,
  TARGET_COMPONENTS = 1,
  TARGET_DEPENDENCIES = 2,
  TARGET_DRAG_SHADOW = 3,
  TARGET_DOTTED_LINE_SQUARE = 4,
  TARGET_DISPLAY_NAME = 5,
  TARGET_APPS = 6,
  TARGET_RESOURCE = 7,
  TARGET_ACTION = 8,
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
}
