import { createSlice } from "@reduxjs/toolkit"
import { updateCurrentUserReducer } from "@/redux/currentUser/currentUserReducer"
import {
  CurrentUser,
  CurrentUserInitialState,
} from "@/redux/currentUser/currentUserState"
import { SliceCaseReducers } from "@reduxjs/toolkit/src/createSlice"

const currentUserSlice = createSlice<
  CurrentUser | null,
  SliceCaseReducers<CurrentUser | null>,
  "currentUser"
>({
  name: "currentUser",
  initialState: CurrentUserInitialState,
  reducers: {
    updateCurrentUserReducer,
  },
})

export const currentUserActions = currentUserSlice.actions
export default currentUserSlice.reducer
