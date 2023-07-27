import { AgentVariable } from "@/redux/aiAgent/aiAgentState"

export interface AiAgentAction {
  maxToken: number
  variables: AgentVariable[]
}
