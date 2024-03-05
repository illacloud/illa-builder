import { ChatMessage } from "@/page/AI/components/PreviewChat/interface"

export interface AIAgentMessageProps {
  message: ChatMessage
  isMobile: boolean
  canShowLongCopy: boolean
}
