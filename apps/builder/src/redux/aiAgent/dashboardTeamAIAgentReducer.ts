import { Agent } from "@illa-public/public-types"
import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  AddTeamAIAgentPayload,
  ModifyTeamAIAgentPayload,
} from "./dashboardTeamAIAgentPayload"
import { AIAgentState } from "./dashboardTeamAIAgentState"

export const updateTeamAIAgentListReducer: CaseReducer<
  AIAgentState,
  PayloadAction<Agent[]>
> = (state, action) => {
  state.list = action.payload
}

export const addTeamAIAgentReducer: CaseReducer<
  AIAgentState,
  PayloadAction<AddTeamAIAgentPayload>
> = (state, action) => {
  let payload = action.payload
  state.list = [payload.aiAgent, ...state.list]
}

export const removeTeamAIAgentReducer: CaseReducer<
  AIAgentState,
  PayloadAction<string>
> = (state, action) => {
  let index = state.list.findIndex((element) => {
    return element.aiAgentID == action.payload
  })
  if (index != -1) {
    state.list.splice(index, 1)
  }
}

export const modifyTeamAIAgentReducer: CaseReducer<
  AIAgentState,
  PayloadAction<ModifyTeamAIAgentPayload>
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
