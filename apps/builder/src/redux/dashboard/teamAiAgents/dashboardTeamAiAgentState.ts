import { Agent } from "@illa-public/market-agent/MarketAgentCard/interface"

export interface DashboardTeamAiAgentState {
  list: Agent[]
}

export const TeamAgentInitial: DashboardTeamAiAgentState = {
  list: [],
}
