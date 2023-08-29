import { Agent } from "@illa-public/market-agent/MarketAgentCard/interface"

export interface DashboardTeamAIAgentState {
  list: Agent[]
}

export const TeamAgentInitial: DashboardTeamAIAgentState = {
  list: [],
}
