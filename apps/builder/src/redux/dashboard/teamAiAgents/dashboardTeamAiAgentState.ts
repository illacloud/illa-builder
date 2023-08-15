import { Agent } from "@/redux/aiAgent/aiAgentState"

export interface DashboardTeamAiAgentState {
  list: Agent[]
}

export const TeamAgentInitial: DashboardTeamAiAgentState = {
  list: [],
}
