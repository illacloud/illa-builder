import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import * as Sentry from "@sentry/react"
import { CurrentUser } from "@/redux/currentUser/currentUserState"

export const updateCurrentUserReducer: CaseReducer<
  CurrentUser,
  PayloadAction<CurrentUser>
> = (state, action) => {
  Sentry.setUser({
    id: state.userId,
    email: state.email,
    username: state.nickname,
  })
  state = action.payload
  return state
}

export const updateUserAvatarReducer: CaseReducer<
  CurrentUser,
  PayloadAction<string>
> = (state, action) => {
  if (!state) return
  const { payload } = action
  return {
    ...state,
    avatar: payload,
  }
}
