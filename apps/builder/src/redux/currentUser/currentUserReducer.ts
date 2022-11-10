import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { CurrentUser } from "@/redux/currentUser/currentUserState"
import * as Sentry from "@sentry/react"

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
