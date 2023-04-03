import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  CursorInfo,
  CursorState,
  UpdateCursorPayload,
} from "@/redux/currentApp/cursor/cursorState"

export const updateCursorReducer: CaseReducer<
  CursorState,
  PayloadAction<UpdateCursorPayload>
> = (state, action) => {
  const { userID, nickname, x, y, w, h, lastUpdateTime } = action.payload
  const hasUser = !!state[userID]
  if (hasUser) {
    state[userID].lastUpdateTime = lastUpdateTime
    state[userID].x = x
    state[userID].y = y
    state[userID].w = w
    state[userID].h = h
  } else {
    state[userID] = {
      userID,
      nickname,
      x,
      y,
      w,
      h,
      lastUpdateTime,
    }
  }
}

export const deleteCursorReducer: CaseReducer<
  CursorState,
  PayloadAction<string>
> = (state, action) => {
  const userID = action.payload
  const hasUser = !!state[userID]
  if (hasUser) {
    delete state[userID]
  }
}
