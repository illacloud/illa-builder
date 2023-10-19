import { Agent } from "@illa-public/market-agent"

export interface AddTeamAIAgentPayload {
  aiAgent: Agent
}

export interface ModifyTeamAIAgentPayload {
  aiAgentID: string
  modifiedProps: Partial<Agent>
}
