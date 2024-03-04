import { AI_AGENT_MODEL, AI_AGENT_TYPE, Agent } from "@illa-public/public-types"

export const AgentInitial: Agent = {
  name: "",
  teamIdentifier: "",
  agentType: AI_AGENT_TYPE.CHAT,
  model: AI_AGENT_MODEL.GPT_3_5,
  variables: [{ key: "", value: "" }],
  knowledge: [],
  prompt: "",
  modelConfig: {
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

export enum SCROLL_ID {
  PROMPT = "prompt",
  VARIABLES = "variables",
  KNOWLEDGE = "knowledge",
  NAME = "name",
  DESCRIPTION = "description",
  ICON = "icon",
}
