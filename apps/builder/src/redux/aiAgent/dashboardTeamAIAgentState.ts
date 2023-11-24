import { Agent } from "@illa-public/public-types"

export interface AIAgentState {
  list: Agent[]
}

export const AgentInitial: AIAgentState = {
  list: [],
}
