import { createSlice } from "@reduxjs/toolkit"
import { updateCurrentUserReducer } from "@/redux/currentUser/currentUserReducer"
import { CurrentUser } from "@/redux/currentUser/currentUserState"
import { SliceCaseReducers } from "@reduxjs/toolkit/src/createSlice"

const currentUserSlice = createSlice<
  CurrentUser | undefined,
  SliceCaseReducers<CurrentUser | undefined>,
  "currentUser"
>({
  name: "currentUser",
  initialState: undefined,
  reducers: {
    updateCurrentUserReducer,
  },
})

export const currentUserActions = currentUserSlice.actions
export default currentUserSlice.reducer
