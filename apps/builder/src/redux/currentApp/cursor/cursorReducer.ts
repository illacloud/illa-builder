import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  CursorState,
  UpdateCursorPayload,
} from "@/redux/currentApp/cursor/cursorState"

export const updateCursorReducer: CaseReducer<
  CursorState,
  PayloadAction<UpdateCursorPayload>
> = (state, action) => {
  const {
    userID,
    nickname,
    parentDisplayName,
    x,
    y,
    w,
    h,
    status,
    lastUpdateTime,
  } = action.payload
  const hasUser = !!state[userID]
  if (!hasUser) {
    state[userID] = []
  }
  const cursorInfo = {
    userID,
    nickname,
    parentDisplayName,
    status,
    x,
    y,
    w,
    h,
    lastUpdateTime,
  }
  if (state[userID].length === 1) {
    state[userID].splice(0, 1, cursorInfo)
  } else {
    state[userID].push(cursorInfo)
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

export const removeAnimationEndCursorInfo: CaseReducer<
  CursorState,
  PayloadAction<string>
> = (state, action) => {
  const targetUserCursorInfo = state[action.payload]
  if (targetUserCursorInfo.length > 1) {
    targetUserCursorInfo.shift()
  }
}

export const leaveContainerReducer: CaseReducer<
  CursorState,
  PayloadAction<string>
> = (state, action) => {
  const targetUserCursorInfo = state[action.payload]

  if (targetUserCursorInfo.length > 0) {
    targetUserCursorInfo.shift()
  }
}
