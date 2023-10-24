import { RootState } from "@/store"

export const getDashboardTeamAIAgentList = (state: RootState) => {
  return state.aiAgent.list
}
