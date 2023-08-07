import { createContext } from "react"
import { ChatContextProps } from "@/page/AI/components/ChatContext/interface"

export const ChatContext = createContext<ChatContextProps>({
  inRoomUsers: [],
})

ChatContext.displayName = "ChatContext"
