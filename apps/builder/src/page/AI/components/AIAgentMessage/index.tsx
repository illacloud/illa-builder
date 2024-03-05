import { Avatar } from "@illa-public/avatar"
import { copyToClipboard } from "@illa-public/utils"
import { FC, useContext } from "react"
import { useTranslation } from "react-i18next"
import { CopyIcon, useMessage } from "@illa-design/react"
import { ChatContext } from "@/page/AI/components/ChatContext"
import MarkdownMessage from "@/page/AI/components/MarkdownMessage"
import { SenderType } from "@/page/AI/components/PreviewChat/interface"
import { AIAgentMessageProps } from "./interface"
import {
  agentMessageContainer,
  hoverCopyStyle,
  messageContainerStyle,
  senderAvatarStyle,
  senderContainerStyle,
  senderNicknameStyle,
} from "./style"

export const AIAgentMessage: FC<AIAgentMessageProps> = (props) => {
  const { message, isMobile, canShowLongCopy } = props
  const chatContext = useContext(ChatContext)
  const showMessage = useMessage()
  const { t } = useTranslation()

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
      {!isMobile && (
        <Avatar
          size={32}
          css={senderAvatarStyle}
          avatarUrl={senderAvatar}
          name={senderNickname}
          id={message.sender.senderID}
        />
      )}
      <div css={senderContainerStyle}>
        {canShowLongCopy && message.message && (
          <span
            css={hoverCopyStyle}
            onClick={() => {
              copyToClipboard(message.message ?? "")
              showMessage.success({
                content: t("copied"),
              })
            }}
          >
            <CopyIcon size="14px" />
          </span>
        )}
        <div css={senderNicknameStyle}>{senderNickname}</div>
        <div css={messageContainerStyle}>
          <MarkdownMessage disableTrigger={canShowLongCopy}>
            {message.message}
          </MarkdownMessage>
        </div>
      </div>
    </div>
  )
}

export default AIAgentMessage
AIAgentMessage.displayName = "AIAgentMessage"
