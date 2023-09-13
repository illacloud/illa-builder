import { AI_AGENT_MODEL, AI_AGENT_TYPE, Agent } from "@illa-public/market-agent"

export const AgentInitial: Agent = {
  name: "",
  teamIdentifier: "",
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
