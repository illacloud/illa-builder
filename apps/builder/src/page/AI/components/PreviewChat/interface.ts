import { AI_AGENT_TYPE, ChatMessage } from "@/redux/aiAgent/aiAgentState"

export type EDIT_STATE = "EDIT" | "RUN"

export interface PreviewChatProps {
  editState: EDIT_STATE
  agentType: AI_AGENT_TYPE
  chatMessages: ChatMessage[]
  generationMessage?: ChatMessage
  onSendMessage: (message: ChatMessage, agentType: AI_AGENT_TYPE) => void
  onCancelReceiving: () => void
  blockInput: boolean
  isReceiving: boolean
  isMobile: boolean
}
