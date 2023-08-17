import { RootState } from "@/store"

export const getDashboardTeamAiAgentList = (state: RootState) => {
  return state.dashboard.dashboardTeamAiAgents.list
}
