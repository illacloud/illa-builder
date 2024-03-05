import {
  AI_AGENT_MODEL,
  AI_AGENT_TYPE,
  AgentAdvanceConfig,
  KnowledgeFile,
} from "@illa-public/public-types"
import { Params } from "@illa-public/record-editor"

export type EDIT_STATE = "EDIT" | "RUN"

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
  knowledgeFiles?: KnowledgeFile[]
}

export interface ChatSendRequestPayload {
  threadID: string
  prompt: string
  actionID: string // the ID of who answered the question
  variables: Params[]
  model: AI_AGENT_MODEL
  agentType: AI_AGENT_TYPE
  modelConfig: AgentAdvanceConfig
}

export interface PreviewChatProps {
  model: AI_AGENT_MODEL
  hasCreated: boolean
  editState: EDIT_STATE
  agentType: AI_AGENT_TYPE
  chatMessages: ChatMessage[]
  generationMessage?: ChatMessage
  onSendMessage: (message: ChatMessage, agentType: AI_AGENT_TYPE) => void
  onCancelReceiving: () => void
  blockInput: boolean
  isReceiving: boolean
  isRunning: boolean
  isConnecting: boolean
  isMobile: boolean
  showShareDialog: boolean
  showContributeDialog: boolean
  showEditPanel: boolean
  setShowEditPanel?: (show: boolean) => void
  onShowShareDialog?: () => void
  onShowContributeDialog?: () => void
  onClickCreateApp?: () => void
  onClickStartRunning?: () => void
}
