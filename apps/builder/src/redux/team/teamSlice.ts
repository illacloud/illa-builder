import { createSlice } from "@reduxjs/toolkit"
import {
  updateCurrentIdReducer,
  updateCurrentRoleReducer,
  updateMemberListReducer,
  updateTeamItemsReducer,
  updateTeamReducer,
} from "@/redux/team/teamReducer"
import { teamInitialState } from "@/redux/team/teamState"

const teamSlice = createSlice({
  name: "team",
  initialState: teamInitialState,
  reducers: {
    updateTeamReducer,
    updateCurrentIdReducer,
    updateTeamItemsReducer,
    updateCurrentRoleReducer,
    updateMemberListReducer,
  },
})

export const teamActions = teamSlice.actions
export default teamSlice.reducer
