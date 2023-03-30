import { createSlice } from "@reduxjs/toolkit"
import {
  updateCurrentUserReducer,
  updateUserAvatarReducer,
  updateUserIsTutorialViewedReducer,
} from "@/redux/currentUser/currentUserReducer"
import { CurrentUserInitialState } from "@/redux/currentUser/currentUserState"

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: CurrentUserInitialState,
  reducers: {
    updateCurrentUserReducer,
    updateUserAvatarReducer,
    updateUserIsTutorialViewedReducer,
  },
})

export const currentUserActions = currentUserSlice.actions
export default currentUserSlice.reducer
