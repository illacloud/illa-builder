import { Agent } from "@illa-public/market-agent/MarketAgentCard/interface"

export interface AddTeamAiAgentPayload {
  aiAgent: Agent
  index?: number
}

export interface ModifyTeamAiAgentPayload {
  aiAgentID: string
  modifiedProps: Partial<Agent>
}
