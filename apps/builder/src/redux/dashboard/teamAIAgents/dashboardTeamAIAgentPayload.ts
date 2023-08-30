import { Agent } from "@illa-public/market-agent/MarketAgentCard/interface"

export interface AddTeamAIAgentPayload {
  aiAgent: Agent
}

export interface ModifyTeamAIAgentPayload {
  aiAgentID: string
  modifiedProps: Partial<Agent>
}
