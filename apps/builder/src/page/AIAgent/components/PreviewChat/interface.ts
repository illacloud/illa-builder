import { ChatMessage } from "@/redux/aiAgent/aiAgentState"

export interface PreviewChatProps {
  messages: ChatMessage[]
  onSendMessage: (message: ChatMessage) => void
}
