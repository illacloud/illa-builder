import { RootState } from "@/store"

export const getDashboardMarketAiAgent = (state: RootState) => {
  return state.dashboard.dashboardMarketAiAgents
}

export const getDashboardMarketAiAgentList = (state: RootState) => {
  return state.dashboard.dashboardMarketAiAgents.products
}
