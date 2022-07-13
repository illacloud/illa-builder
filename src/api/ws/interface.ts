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
  SIGNAL_CREATE_OR_UPDATE = 7,
  SIGNAL_ONLY_BROADCAST = 8,
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
}

export interface Broadcast {
  type: string
  payload: string
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
