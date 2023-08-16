import {
  AI_AGENT_MODEL,
  AI_AGENT_TYPE,
} from "@illa-public/market-agent/MarketAgentCard/interface"
import { Params } from "@/redux/resource/restapiResource"

export interface AIAgentActionContent {
  agentType: AI_AGENT_TYPE
  model: AI_AGENT_MODEL
  variables: Params[]
  input: string
  modelConfig: {
    maxTokens: number
    stream: boolean
  }
}
