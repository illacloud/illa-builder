import { FC } from "react"
import { useSelector } from "react-redux"
import { Image } from "@illa-design/react"
import { UserMessageProps } from "@/page/AIAgent/components/UserMessage/interface"
import {
  agentMessageContainer,
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
        <div css={senderNicknameStyle}>{currentUserInfo.nickname}</div>
        <div css={senderMessageStyle}>{message.message}</div>
      </div>
      <Image
        radius="16px"
        width="32px"
        height="32px"
        src={currentUserInfo.avatar}
      />
    </div>
  )
}

export default UserMessage
UserMessage.displayName = "UserMessage"
