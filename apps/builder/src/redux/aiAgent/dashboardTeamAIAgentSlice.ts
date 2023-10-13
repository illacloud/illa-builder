import { createSlice } from "@reduxjs/toolkit"
import {
  addTeamAIAgentReducer,
  modifyTeamAIAgentReducer,
  removeTeamAIAgentReducer,
  updateTeamAIAgentListReducer,
} from "./dashboardTeamAIAgentReducer"
import { AgentInitial } from "./dashboardTeamAIAgentState"

const aiAgentSlice = createSlice({
  name: "aiAgent",
  initialState: AgentInitial,
  reducers: {
    updateTeamAIAgentListReducer,
    addTeamAIAgentReducer,
    removeTeamAIAgentReducer,
    modifyTeamAIAgentReducer,
  },
})

export const aiAgentActions = aiAgentSlice.actions
export default aiAgentSlice.reducer
