import { Avatar } from "@illa-public/avatar"
import { getCurrentUser } from "@illa-public/user-data"
import { FC } from "react"
import { useSelector } from "react-redux"
import MarkdownMessage from "@/page/AI/components/MarkdownMessage"
import { UserMessageProps } from "@/page/AI/components/UserMessage/interface"
import {
  agentMessageContainer,
  messageContainerStyle,
  senderAvatarStyle,
  senderContainerStyle,
  senderNicknameStyle,
} from "@/page/AI/components/UserMessage/style"
import ShowFilesMobile from "./ShowFiles"

export const UserMessage: FC<UserMessageProps> = (props) => {
  const { message, isMobile } = props
  const currentUserInfo = useSelector(getCurrentUser)

  return (
    <div css={agentMessageContainer}>
      <div css={senderContainerStyle}>
        <span css={senderNicknameStyle}>{currentUserInfo.nickname}</span>
        {Array.isArray(message.knowledgeFiles) &&
          message.knowledgeFiles.length > 0 && (
            <ShowFilesMobile knowledgeFiles={message.knowledgeFiles} />
          )}
        {message.message && (
          <div css={messageContainerStyle}>
            <MarkdownMessage isOwnMessage>{message.message}</MarkdownMessage>
          </div>
        )}
      </div>
      {!isMobile && (
        <Avatar
          size={32}
          css={senderAvatarStyle}
          avatarUrl={currentUserInfo.avatar}
          name={currentUserInfo.nickname}
          id={currentUserInfo.userID}
        />
      )}
    </div>
  )
}

export default UserMessage
UserMessage.displayName = "UserMessage"
