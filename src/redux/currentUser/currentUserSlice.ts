import { createSlice } from "@reduxjs/toolkit"
import { updateCurrentUserReducer } from "@/redux/currentUser/currentUserReducer"
import { CurrentUserInitialState } from "@/redux/currentUser/currentUserState"

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: CurrentUserInitialState,
  reducers: {
    updateCurrentUserReducer,
  },
})

export const currentUserActions = currentUserSlice.actions
export default currentUserSlice.reducer
