import {
  AI_AGENT_MODEL,
  AI_AGENT_TYPE,
  Agent,
} from "@/redux/aiAgent/aiAgentState"
import { Params } from "@/redux/resource/restapiResource"

export interface BaseAiAgentActionContent {
  agentType: AI_AGENT_TYPE
  model: AI_AGENT_MODEL
  variables: Params[]
  input: string
  modelConfig: {
    maxTokens: number
    stream: boolean
  }
}

export interface AiAgentActionContent extends BaseAiAgentActionContent {
  virtualResource: Agent
}
