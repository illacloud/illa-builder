import React, { FC, useContext } from "react"
import { Avatar } from "@/illa-public-component/Avatar"
import { ChatContext } from "@/page/AI/components/ChatContext"
import MarkdownMessage from "@/page/AI/components/MarkdownMessage"
import { SenderType } from "@/redux/aiAgent/aiAgentState"
import { AIAgentMessageProps } from "./interface"
import {
  agentMessageContainer,
  messageContainerStyle,
  senderAvatarStyle,
  senderContainerStyle,
  senderNicknameStyle,
} from "./style"

export const AIAgentMessage: FC<AIAgentMessageProps> = (props) => {
  const { message } = props
  const chatContext = useContext(ChatContext)

  const senderNickname =
    message.sender.senderType === SenderType.ANONYMOUS_AGENT
      ? chatContext.inRoomUsers.find(
          (user) => user.roomRole == SenderType.ANONYMOUS_AGENT,
        )?.nickname ?? ""
      : chatContext.inRoomUsers.find(
          (user) => user.id == message.sender.senderID,
        )?.nickname ?? ""

  const senderAvatar =
    message.sender.senderType === SenderType.ANONYMOUS_AGENT
      ? chatContext.inRoomUsers.find(
          (user) => user.roomRole == SenderType.ANONYMOUS_AGENT,
        )?.avatar ?? ""
      : chatContext.inRoomUsers.find(
          (user) => user.id == message.sender.senderID,
        )?.avatar ?? ""

  return (
    <div css={agentMessageContainer}>
      <Avatar
        css={senderAvatarStyle}
        avatarUrl={senderAvatar}
        name={senderNickname}
        id={message.sender.senderID}
      />
      <div css={senderContainerStyle}>
        <div css={senderNicknameStyle}>{senderNickname}</div>
        <div css={messageContainerStyle}>
          <MarkdownMessage>{message.message}</MarkdownMessage>
        </div>
      </div>
    </div>
  )
}

export default AIAgentMessage
AIAgentMessage.displayName = "AIAgentMessage"
