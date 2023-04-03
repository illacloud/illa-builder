export interface CursorInfo {
  userID: string
  nickname: string
  parentDisplayName: string
  status: number // -1 is is Leave,1 is moving, 0 is stop
  x: number
  y: number
  w: number
  h: number
  lastUpdateTime: number
}

export type UpdateCursorPayload = CursorInfo

export type CursorState = Record<string, CursorInfo[]>

export const CursorInitialState: CursorState = {}
