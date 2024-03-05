import { copyToClipboard } from "@illa-public/utils"
import { FC, useContext } from "react"
import { useTranslation } from "react-i18next"
import { CopyIcon, useMessage } from "@illa-design/react"
import { ChatContext } from "@/page/AI/components/ChatContext"
import { GenerationMessageProps } from "@/page/AI/components/GenerationMessage/interface"
import {
  avatarContainerStyle,
  avatarStyle,
  copyContainerStyle,
  generationContainerStyle,
  nickNameStyle,
} from "@/page/AI/components/GenerationMessage/style"
import MarkdownMessage from "@/page/AI/components/MarkdownMessage"
import { SenderType } from "@/page/AI/components/PreviewChat/interface"
import { Avatar } from "@/page/App/components/Avatar"

export const GenerationMessage: FC<GenerationMessageProps> = (props) => {
  const { message } = props

  const m = useMessage()
  const { t } = useTranslation()

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
    <div css={generationContainerStyle}>
      <div css={avatarContainerStyle}>
        <Avatar
          css={avatarStyle}
          avatar={senderAvatar}
          nickname={senderNickname}
        />
      </div>
      <div css={nickNameStyle}>{senderNickname}</div>
      <MarkdownMessage>{message.message}</MarkdownMessage>
      <div
        css={copyContainerStyle}
        onClick={() => {
          copyToClipboard(message.message)
          m.success({
            content: t("copied"),
          })
        }}
      >
        <CopyIcon fs="16px" />
      </div>
    </div>
  )
}
