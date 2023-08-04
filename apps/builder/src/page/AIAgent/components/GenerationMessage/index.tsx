import { FC, useContext } from "react"
import { ChatContext } from "@/page/AIAgent/components/ChatContext"
import { GenerationMessageProps } from "@/page/AIAgent/components/GenerationMessage/interface"
import {
  avatarStyle,
  generationContainerStyle,
  nickNameStyle,
} from "@/page/AIAgent/components/GenerationMessage/style"
import { Avatar } from "@/page/App/components/Avatar"
import { SenderType } from "@/redux/aiAgent/aiAgentState"

export const GenerationMessage: FC<GenerationMessageProps> = (props) => {
  const { message } = props

  const chatContext = useContext(ChatContext)
  const senderNickname =
    message.sender.senderType === SenderType.ANONYMOUS_AGENT
      ? chatContext.inRoomUsers.find(
          (user) => user.role == SenderType.ANONYMOUS_AGENT,
        )?.nickname ?? ""
      : chatContext.inRoomUsers.find(
          (user) => user.id == message.sender.senderID,
        )?.nickname ?? ""

  const senderAvatar =
    message.sender.senderType === SenderType.ANONYMOUS_AGENT
      ? chatContext.inRoomUsers.find(
          (user) => user.role == SenderType.ANONYMOUS_AGENT,
        )?.avatar ?? ""
      : chatContext.inRoomUsers.find(
          (user) => user.id == message.sender.senderID,
        )?.avatar ?? ""

  return (
    <div css={generationContainerStyle}>
      <Avatar
        css={avatarStyle}
        avatar={senderAvatar}
        nickname={senderNickname}
      />
      <div css={nickNameStyle}>{senderNickname}</div>
      <div>{message.message}</div>
    </div>
  )
}
