import { createSlice } from "@reduxjs/toolkit"
import {
  addTeamAIAgentReducer,
  modifyTeamAIAgentReducer,
  removeTeamAIAgentReducer,
  updateTeamAIAgentListReducer,
} from "./dashboardTeamAIAgentReducer"
import { TeamAgentInitial } from "./dashboardTeamAIAgentState"

const dashboardTeamAIAgentSlice = createSlice({
  name: "teamAIAgents",
  initialState: TeamAgentInitial,
  reducers: {
    updateTeamAIAgentListReducer,
    addTeamAIAgentReducer,
    removeTeamAIAgentReducer,
    modifyTeamAIAgentReducer,
  },
})

export const dashboardTeamAIAgentActions = dashboardTeamAIAgentSlice.actions
export default dashboardTeamAIAgentSlice.reducer
