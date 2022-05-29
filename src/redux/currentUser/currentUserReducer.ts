import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { CurrentUser } from "@/redux/currentUser/currentUserState"

export const updateCurrentUserReducer: CaseReducer<
  CurrentUser | undefined,
  PayloadAction<CurrentUser | undefined>
> = (state, action) => {
  state = action.payload
}
