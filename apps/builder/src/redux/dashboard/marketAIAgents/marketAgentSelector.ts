import { RootState } from "@/store"

export const getDashboardMarketAgentList = (state: RootState) => {
  return state.dashboard.dashboardMarketAgents.list
}
