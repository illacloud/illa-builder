import {
  AI_AGENT_MODEL,
  AI_AGENT_TYPE,
  Agent,
} from "@illa-public/market-agent/MarketAgentCard/interface"

export function getModelLimitToken(model: AI_AGENT_MODEL): number {
  switch (model) {
    case AI_AGENT_MODEL.GPT_3_5_TURBO:
      return 4096
    case AI_AGENT_MODEL.GPT_3_5_TURBO_16K:
      return 16000
    case AI_AGENT_MODEL.GPT_4:
      return 8192
    default:
      return 2048
  }
}

export const AgentInitial: Agent = {
  name: "",
  agentType: AI_AGENT_TYPE.CHAT,
  model: AI_AGENT_MODEL.GPT_3_5_TURBO,
  variables: [{ key: "", value: "" }],
  prompt: "",
  modelConfig: {
    temperature: 1,
    maxTokens: 2048,
    stream: true,
  },
  icon: "",
  description: "",
  aiAgentID: "",
  teamID: "",
  teamIcon: "",
  teamName: "",
  publishedToMarketplace: false,
  createdAt: "",
  createdBy: "",
  updatedBy: "",
  updatedAt: "",
  editedBy: [],
}
