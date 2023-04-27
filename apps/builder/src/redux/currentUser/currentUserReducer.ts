import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import * as Sentry from "@sentry/react"
import { CurrentUser } from "@/redux/currentUser/currentUserState"

export const updateCurrentUserReducer: CaseReducer<
  CurrentUser,
  PayloadAction<CurrentUser>
> = (state, action) => {
  const { userId, nickname, email } = action.payload
  Sentry.setUser({
    id: userId,
    email: email,
    username: nickname,
    ip_address: "",
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

export const updateUserIsTutorialViewedReducer: CaseReducer<
  CurrentUser,
  PayloadAction<boolean>
> = (state, action) => {
  if (!state) return
  const { payload } = action
  state["isTutorialViewed"] = payload
}
