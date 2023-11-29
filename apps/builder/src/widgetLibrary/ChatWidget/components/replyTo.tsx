import { FC } from "react"
import { useTranslation } from "react-i18next"
import CloseReplySvg from "@/assets/chat/closeReplay.svg?react"
import { MessageContent } from "@/widgetLibrary/ChatWidget/interface"
import {
  replyContent,
  replyToHeaderStyle,
  replyToStyle,
} from "@/widgetLibrary/ChatWidget/style"

export const ReplyTo: FC<{
  replyMessage: MessageContent
  clearReplyMessage: () => void
}> = ({ replyMessage, clearReplyMessage }) => {
  const { t } = useTranslation()
  const { messageType, message, senderName } = replyMessage
  return (
    <div css={replyToStyle}>
      <div css={replyToHeaderStyle}>
        <span>{t("editor.inspect.widget.reply")}</span>
        <span onClick={clearReplyMessage}>
          <CloseReplySvg />
        </span>
      </div>
      <div css={replyContent}>
        <span style={{ fontWeight: 500 }}>{senderName}:&nbsp;</span>
        {messageType === "audio" && (
          <span>{t("editor.inspect.widget.reply_audio")}</span>
        )}
        {messageType === "image" && (
          <span>{t("editor.inspect.widget.reply_image")}</span>
        )}
        {messageType === "video" && (
          <span>{t("editor.inspect.widget.reply_video")}</span>
        )}
        {messageType === "text" && <span>{message}</span>}
      </div>
    </div>
  )
}
