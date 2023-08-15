import { AI_AGENT_MODEL } from "@/redux/aiAgent/aiAgentState"
import { Params } from "@/redux/resource/restapiResource"

export interface AiAgentActionContent {
  maxTokens: number
  variables: Params[]
  aiAgentModel: AI_AGENT_MODEL
  input: string
}
