import { FC } from "react"
import { useSelector } from "react-redux"
import { Avatar } from "@/illa-public-component/Avatar"
import { UserMessageProps } from "@/page/AIAgent/components/UserMessage/interface"
import {
  agentMessageContainer,
  senderAvatarStyle,
  senderContainerStyle,
  senderMessageStyle,
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
        <span css={senderMessageStyle}>{message.message}</span>
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
