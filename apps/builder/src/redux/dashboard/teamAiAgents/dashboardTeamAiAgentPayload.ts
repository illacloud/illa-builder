import { Agent } from "@/redux/aiAgent/aiAgentState"

export interface AddTeamAiAgentPayload {
  aiAgent: Agent
  index?: number
}

export interface ModifyTeamAiAgentPayload {
  aiAgentID: string
  modifiedProps: Partial<Agent>
}
