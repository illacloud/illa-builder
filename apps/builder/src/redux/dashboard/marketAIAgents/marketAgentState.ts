import { MarketAiAgent } from "@illa-public/market-agent/MarketAgentCard/interface"

export interface DashboardMarketAgentState {
  list: MarketAiAgent[]
}

export const MarketAgentInitial: DashboardMarketAgentState = {
  list: [],
}
