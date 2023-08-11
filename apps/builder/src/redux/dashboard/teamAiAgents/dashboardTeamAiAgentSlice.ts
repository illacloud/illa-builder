import { createSlice } from "@reduxjs/toolkit"
import {
  addTeamAiAgentReducer,
  modifyTeamAiAgentReducer,
  removeTeamAiAgentReducer,
  updateTeamAiAgentListReducer,
} from "@/redux/dashboard/teamAiAgents/dashboardTeamAiAgentReducer"
import { TeamAgentInitial } from "@/redux/dashboard/teamAiAgents/dashboardTeamAiAgentState"

const dashboardTeamAiAgentSlice = createSlice({
  name: "teamAiAgents",
  initialState: TeamAgentInitial,
  reducers: {
    updateTeamAiAgentListReducer,
    addTeamAiAgentReducer,
    removeTeamAiAgentReducer,
    modifyTeamAiAgentReducer,
  },
})

export const dashboardTeamAiAgentActions = dashboardTeamAiAgentSlice.actions
export default dashboardTeamAiAgentSlice.reducer
