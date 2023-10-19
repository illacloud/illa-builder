import { Agent } from "@illa-public/market-agent"

export interface AIAgentState {
  list: Agent[]
}

export const AgentInitial: AIAgentState = {
  list: [],
}
