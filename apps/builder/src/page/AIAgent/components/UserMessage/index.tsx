import React, { FC } from "react"
import { useSelector } from "react-redux"
import { Avatar } from "@/illa-public-component/Avatar"
import MarkdownMessage from "@/page/AIAgent/components/MarkdownMessage"
import { UserMessageProps } from "@/page/AIAgent/components/UserMessage/interface"
import {
  agentMessageContainer,
  senderAvatarStyle,
  senderContainerStyle,
  senderNicknameStyle,
} from "@/page/AIAgent/components/UserMessage/style"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"

export const UserMessage: FC<UserMessageProps> = (props) => {
  const { message } = props
  const currentUserInfo = useSelector(getCurrentUser)
  return (
    <div css={agentMessageContainer}>
      <div css={senderContainerStyle}>
        <span css={senderNicknameStyle}>{currentUserInfo.nickname}</span>
        <MarkdownMessage>{message.message}</MarkdownMessage>
      </div>
      <Avatar
        css={senderAvatarStyle}
        avatarUrl={currentUserInfo.avatar}
        name={currentUserInfo.nickname}
        id={currentUserInfo.userId}
      />
    </div>
  )
}

export default UserMessage
UserMessage.displayName = "UserMessage"
