import { Params } from "@/redux/resource/restapiResource"

export interface AgentRaw {
  name: string
  agentType: AI_AGENT_TYPE
  modal: AI_AGENT_MODAL
  variable: Params[]
  prompt: string
  modalConfig: AgentAdvanceConfig
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

export interface AgentAdvanceConfig {
  temperature: number
  maxTokens: number
}

export enum SenderType {
  User = 1,
  Agent = 2,
}

export interface ChatSender {
  senderID: string
  senderType: SenderType
}

export interface ChatMessage {
  threadID: string
  prompt: string
  variable: Params[]
  message: string
  sender: ChatSender
}

export enum AI_AGENT_TYPE {
  CHAT = 1,
  TEXT_GENERATION = 2,
}

export enum AI_AGENT_MODAL {
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

export const AgentRawInitial: AgentRaw = {
  name: "",
  agentType: AI_AGENT_TYPE.CHAT,
  modal: AI_AGENT_MODAL.GPT_3_5_TURBO,
  variable: [{ key: "", value: "" }],
  prompt: "",
  modalConfig: {
    temperature: 1,
    maxTokens: 2048,
  },
  icon: "",
  description: "",
}
