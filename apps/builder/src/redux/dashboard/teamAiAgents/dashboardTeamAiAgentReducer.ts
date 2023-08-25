import { Agent } from "@illa-public/market-agent/MarketAgentCard/interface"
import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  AddTeamAiAgentPayload,
  ModifyTeamAiAgentPayload,
} from "@/redux/dashboard/teamAiAgents/dashboardTeamAiAgentPayload"
import { DashboardTeamAiAgentState } from "@/redux/dashboard/teamAiAgents/dashboardTeamAiAgentState"

export const updateTeamAiAgentListReducer: CaseReducer<
  DashboardTeamAiAgentState,
  PayloadAction<Agent[]>
> = (state, action) => {
  state.list = action.payload
}

export const addTeamAiAgentReducer: CaseReducer<
  DashboardTeamAiAgentState,
  PayloadAction<AddTeamAiAgentPayload>
> = (state, action) => {
  let payload = action.payload
  if (payload.index == undefined) {
    state.list = [payload.aiAgent, ...state.list]
  } else {
    state.list.splice(payload.index, 0, payload.aiAgent)
  }
}

export const removeTeamAiAgentReducer: CaseReducer<
  DashboardTeamAiAgentState,
  PayloadAction<string>
> = (state, action) => {
  let index = state.list.findIndex((element) => {
    return element.aiAgentID == action.payload
  })
  if (index != -1) {
    state.list.splice(index, 1)
  }
}

export const modifyTeamAiAgentReducer: CaseReducer<
  DashboardTeamAiAgentState,
  PayloadAction<ModifyTeamAiAgentPayload>
> = (state, action) => {
  let index = state.list.findIndex((element) => {
    return element.aiAgentID == action.payload.aiAgentID
  })
  if (index != -1) {
    state.list[index] = {
      ...state.list[index],
      ...action.payload.modifiedProps,
    }
  }
}
