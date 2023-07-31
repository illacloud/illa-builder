import { AI_AGENT_TYPE, ChatMessage } from "@/redux/aiAgent/aiAgentState"

export interface PreviewChatProps {
  messages: ChatMessage[]
  onSendMessage: (message: ChatMessage) => void
  onCancelReceiving: () => void
  blockInput: boolean
  isReceiving: boolean
  mode: AI_AGENT_TYPE
}
