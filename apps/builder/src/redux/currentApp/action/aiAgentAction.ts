import { AI_AGENT_MODEL } from "@illa-public/market-agent/MarketAgentCard/interface"
import { Params } from "@/redux/resource/restapiResource"

export interface AiAgentActionContent {
  maxTokens: number
  variables: Params[]
  aiAgentModel: AI_AGENT_MODEL
  input: string
}
