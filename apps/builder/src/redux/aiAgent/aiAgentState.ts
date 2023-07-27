import { Params } from "@/redux/resource/restapiResource"

export interface Agent {
  icon: string
  name: string
  description: string
  mode: string
  modal: string
  maxToken: number
  variable: Params[]
  temperature: number
  prompt: string
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

export interface AgentVariable {
  name: string
  defaultValue: string
}

export interface AgentModelConfig {
  temperature: number
}

export interface AgentModelPayload {
  variables: AgentVariable[]
  maxToken: number
  welcomeMessage: string
  prompts: string[]
  modelConfig: AgentModelConfig
}

export enum AI_Agent_Type {
  chat = 1,
  text_generate = 2,
}

export enum AI_Agent_Model {
  gpt_3_5_turbo = 1,
  gpt_3_5_turbo_16k = 2,
  gpt_4 = 3,
}

export interface Config {
  icon: string
  description: string
}

interface EditedBy {
  userID: string
  nickname: string
  avatar: string
  email: string
  editedAt: string
}

export interface TeamAiAgent {
  aiAgentID: string
  name: string
  model: AI_Agent_Model
  type: AI_Agent_Type
  publish_to_marketplace: boolean
  config: Config
  createdAt: string
  createdBy: string
  editedBy: EditedBy[]
}

export interface MarketAiAgent {
  aiAgentID: string
  name: string
  config: Config
  teamInfo: {
    id: string
    name: string
    icon: string
  }
  starCount: number
  runCount: number
  forkCount: number
}
