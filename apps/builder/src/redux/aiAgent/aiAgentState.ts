import { Params } from "@/redux/resource/restapiResource"

export interface AgentRaw {
  name: string
  agentType: AI_AGENT_TYPE
  model: AI_AGENT_MODEL
  variables: Params[]
  prompt: string
  modelConfig: AgentAdvanceConfig
  icon: string
  description: string
}

export interface Agent extends AgentRaw {
  aiAgentID: string
  teamID: string
  publishedToMarketplace: boolean
  createdAt: string
  createdBy: string
  updatedBy: string
  updatedAt: string
  editedBy: AgentEditor[]
}

export interface AgentEditor {
  userID: string
  nickname: string
  avatar: string
  email: string
  editedAt: string
}

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

export interface AgentAdvanceConfig {
  temperature: number
  maxTokens: number
}

export enum SenderType {
  USER = 1,
  AGENT = 2,
  ANONYMOUS_AGENT = 3,
}

export interface ChatWsAppendResponse {
  sender: ChatSender
  threadID: string
  message: string
  actionID: string
}

export interface ChatWsEndResponse {
  actionID: string
}

export interface ChatSender {
  senderID: string
  senderType: SenderType
}

export interface ChatMessage {
  threadID: string
  message: string
  sender: ChatSender
}

export interface ChatSendRequestPayload {
  threadID: string
  prompt: string
  variables: Params[]
  modelConfig: AgentAdvanceConfig
}

export enum AI_AGENT_TYPE {
  CHAT = 1,
  TEXT_GENERATION = 2,
}

export enum AI_AGENT_MODEL {
  GPT_3_5_TURBO = 1,
  GPT_3_5_TURBO_16K = 2,
  GPT_4 = 3,
}

export interface ContributorTeam {
  teamID: string
  icon: string
  name: string
}

export interface MarketplaceInfo {
  marketplaceID: string
  numStars: number
  numForks: number
  numRuns: number
  contributorTeam: ContributorTeam
  createdBy: string
  createdAt: string
  updatedBy: string
  updatedAt: string
}

export interface MarketAiAgent {
  aiAgent: Agent
  marketplace: MarketplaceInfo
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
  },
  icon: "",
  description: "",
  aiAgentID: "",
  teamID: "",
  publishedToMarketplace: false,
  createdAt: "",
  createdBy: "",
  updatedBy: "",
  updatedAt: "",
  editedBy: [],
}
