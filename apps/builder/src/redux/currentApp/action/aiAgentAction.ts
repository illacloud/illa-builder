import { AI_AGENT_MODEL, AI_AGENT_TYPE } from "@/redux/aiAgent/aiAgentState"
import { Params } from "@/redux/resource/restapiResource"

export interface AiAgentActionContent {
  agentType: AI_AGENT_TYPE
  model: AI_AGENT_MODEL
  variables: Params[]
  input: string
  modelConfig: {
    maxTokens: number
    stream: boolean
  }
}
