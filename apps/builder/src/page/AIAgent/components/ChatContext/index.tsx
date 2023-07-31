import { createContext } from "react"
import { ChatContextProps } from "@/page/AIAgent/components/ChatContext/interface"

export const ChatContext = createContext<ChatContextProps>({
  inRoomUsers: [],
})

ChatContext.displayName = "ChatContext"
