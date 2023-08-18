import { PublicMarketAiAgent } from "@/redux/aiAgent/aiAgentState"

export interface DashboardMarketAiAgentState {
  products: PublicMarketAiAgent[]
  total: number
  pageSize: number
  pageIndex: number
}

export const MarketAiAgentInitial: DashboardMarketAiAgentState = {
  products: [],
  total: 0,
  pageSize: 0,
  pageIndex: 0,
}
