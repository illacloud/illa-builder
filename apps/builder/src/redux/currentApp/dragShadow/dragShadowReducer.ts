import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { DragShadowState, UpdateCursorPayload } from "./dragShadowState"

export const updateDragShadowInfoReducer: CaseReducer<
  DragShadowState,
  PayloadAction<UpdateCursorPayload>
> = (state, action) => {
  const { userID } = action.payload
  const hasUser = !!state[userID]
  if (!hasUser) {
    state[userID] = []
  }
  if (state[userID].length === 1) {
    state[userID].splice(0, 1, action.payload)
  } else {
    state[userID].push(action.payload)
  }
}

export const deleteDragShadowInfoReducer: CaseReducer<
  DragShadowState,
  PayloadAction<string>
> = (state, action) => {
  const userID = action.payload
  const hasUser = !!state[userID]
  if (hasUser) {
    delete state[userID]
  }
}

export const removeAnimationEndDragShadowInfoReducer: CaseReducer<
  DragShadowState,
  PayloadAction<string>
> = (state, action) => {
  const targetUserCursorInfo = state[action.payload]
  if (targetUserCursorInfo.length > 1) {
    targetUserCursorInfo.shift()
  }
}

export const resetDragShadowInfoReducer: CaseReducer<DragShadowState> = (
  state,
) => {
  Object.keys(state).forEach((userID) => {
    delete state[userID]
  })
}

export const filterDragShadowInfoReducer: CaseReducer<
  DragShadowState,
  PayloadAction<string[]>
> = (state, action) => {
  action.payload.forEach((displayName) => {
    Object.keys(state).forEach((userID) => {
      const targetUserCursorInfo = state[userID]
      if (
        Array.isArray(targetUserCursorInfo) &&
        targetUserCursorInfo.length > 0
      ) {
        state[userID] = targetUserCursorInfo.filter(
          (cursorInfo) => cursorInfo.parentDisplayName !== displayName,
        )
      }
    })
  })
}

export const leaveContainerDragShadowInfoReducer: CaseReducer<
  DragShadowState,
  PayloadAction<string>
> = (state, action) => {
  const targetUserCursorInfo = state[action.payload]

  if (targetUserCursorInfo.length > 0) {
    targetUserCursorInfo.shift()
  }
}
