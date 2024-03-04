import { Avatar } from "@illa-public/avatar"
import { getFileIconByContentType } from "@illa-public/icon"
import { GCS_OBJECT_TYPE } from "@illa-public/public-types"
import { getCurrentUser } from "@illa-public/user-data"
import { FC } from "react"
import { useSelector } from "react-redux"
import { Tag, getColor } from "@illa-design/react"
import MarkdownMessage from "@/page/AI/components/MarkdownMessage"
import { UserMessageProps } from "@/page/AI/components/UserMessage/interface"
import {
  agentMessageContainer,
  fileItemContainerStyle,
  fileTypeIconStyle,
  messageContainerStyle,
  senderAvatarStyle,
  senderContainerStyle,
  senderNicknameStyle,
} from "@/page/AI/components/UserMessage/style"

export const UserMessage: FC<UserMessageProps> = (props) => {
  const { message, hideAvatar } = props
  const currentUserInfo = useSelector(getCurrentUser)

  return (
    <div css={agentMessageContainer}>
      <div css={senderContainerStyle}>
        <span css={senderNicknameStyle}>{currentUserInfo.nickname}</span>
        {Array.isArray(message.knowledgeFiles) &&
          message.knowledgeFiles.length > 0 && (
            <div css={fileItemContainerStyle}>
              {message.knowledgeFiles.map((item) => (
                <Tag
                  key={item.name}
                  bg={getColor("grayBlue", "09")}
                  icon={getFileIconByContentType(
                    GCS_OBJECT_TYPE.FILE,
                    item.type,
                    fileTypeIconStyle,
                  )}
                >
                  {item.name}
                </Tag>
              ))}
            </div>
          )}
        {message.message && (
          <div css={messageContainerStyle}>
            <MarkdownMessage isOwnMessage>{message.message}</MarkdownMessage>
          </div>
        )}
      </div>
      {!hideAvatar && (
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
