import { FC, useContext } from "react"
import { Image } from "@illa-design/react"
import { AIAgentMessageProps } from "@/page/AIAgent/components/AIAgentMessage/interface"
import {
  agentMessageContainer,
  senderContainerStyle,
  senderMessageStyle,
  senderNicknameStyle,
} from "@/page/AIAgent/components/AIAgentMessage/style"
import { ChatContext } from "@/page/AIAgent/components/ChatContext"
import { SenderType } from "@/redux/aiAgent/aiAgentState"

export const AIAgentMessage: FC<AIAgentMessageProps> = (props) => {
  const { message } = props
  const chatContext = useContext(ChatContext)
  const senderNickname =
    message.sender.senderType === SenderType.ANONYMOUS_AGENT
      ? chatContext.inRoomUsers.find(
          (user) => user.role == SenderType.ANONYMOUS_AGENT,
        )?.nickname
      : chatContext.inRoomUsers.find(
          (user) => user.id == message.sender.senderID,
        )?.nickname

  const senderAvatar =
    message.sender.senderType === SenderType.ANONYMOUS_AGENT
      ? chatContext.inRoomUsers.find(
          (user) => user.role == SenderType.ANONYMOUS_AGENT,
        )?.avatar
      : chatContext.inRoomUsers.find(
          (user) => user.id == message.sender.senderID,
        )?.avatar

  return (
    <div css={agentMessageContainer}>
      <Image radius="8px" width="32px" height="32px" src={senderAvatar} />
      <div css={senderContainerStyle}>
        <div css={senderNicknameStyle}>{senderNickname}</div>
        <div css={senderMessageStyle}>{message.message}</div>
      </div>
    </div>
  )
}

export default AIAgentMessage
AIAgentMessage.displayName = "AIAgentMessage"
