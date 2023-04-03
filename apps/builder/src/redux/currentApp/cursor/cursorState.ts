export interface CursorInfo {
  userID: string
  nickname: string
  x: number
  y: number
  w: number
  h: number
  lastUpdateTime: number
}

export type UpdateCursorPayload = CursorInfo

export type CursorState = Record<string, CursorInfo>

export const CursorInitialState: CursorState = {}
