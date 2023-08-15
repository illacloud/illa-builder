import React, { FC } from "react"
import { useSelector } from "react-redux"
import { Avatar } from "@/illa-public-component/Avatar"
import MarkdownMessage from "@/page/AI/components/MarkdownMessage"
import { UserMessageProps } from "@/page/AI/components/UserMessage/interface"
import {
  agentMessageContainer,
  messageContainerStyle,
  senderAvatarStyle,
  senderContainerStyle,
  senderNicknameStyle,
} from "@/page/AI/components/UserMessage/style"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"

export const UserMessage: FC<UserMessageProps> = (props) => {
  const { message } = props
  const currentUserInfo = useSelector(getCurrentUser)
  return (
    <div css={agentMessageContainer}>
      <div css={senderContainerStyle}>
        <span css={senderNicknameStyle}>{currentUserInfo.nickname}</span>
        <div css={messageContainerStyle}>
          <MarkdownMessage>{message.message}</MarkdownMessage>
        </div>
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
