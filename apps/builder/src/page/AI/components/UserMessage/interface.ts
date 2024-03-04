import {
  ChatMessage,
  EDIT_STATE,
} from "@/page/AI/components/PreviewChat/interface"

export interface UserMessageProps {
  message: ChatMessage
  hideAvatar: boolean
  editState: EDIT_STATE
}
