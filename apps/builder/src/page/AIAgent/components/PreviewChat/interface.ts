import { AI_AGENT_TYPE, ChatMessage } from "@/redux/aiAgent/aiAgentState"

export interface PreviewChatProps {
  agentType: AI_AGENT_TYPE
  chatMessages: ChatMessage[]
  generationMessage?: ChatMessage
  onSendMessage: (message: ChatMessage, agentType: AI_AGENT_TYPE) => void
  onCancelReceiving: () => void
  blockInput: boolean
  isReceiving: boolean
}
