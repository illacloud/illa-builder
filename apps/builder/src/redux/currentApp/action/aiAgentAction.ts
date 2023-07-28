import { Params } from "@/redux/resource/restapiResource"

export interface AiAgentAction {
  maxTokens: number
  variables: Params[]
}
