import { FC } from "react"
import { MessageContent } from "@/widgetLibrary/ChatWidget/interface"
import {
  replyMessageStyle,
  replyNameStyle,
} from "@/widgetLibrary/ChatWidget/style"
import { AudioMessage } from "./audioMessage"
import { ImageMessage } from "./imageMessage"
import { TextMessage } from "./textMessage"
import { VideoMessage } from "./videoMessage"

export const ReplyMessage: FC<{
  messageId: string
  value: MessageContent[]
}> = (props) => {
  const { messageId, value } = props
  const message = value.find((item) => item.messageId === messageId)
  if (!message) return null
  const { messageType, message: content, senderName } = message
  return (
    <div css={replyMessageStyle}>
      <div>
        <span css={replyNameStyle}>{senderName}: </span>
        {messageType === "text" && <TextMessage content={content} isReply />}
        {messageType === "image" && <ImageMessage content={content} isReply />}
        {messageType === "audio" && <AudioMessage content={content} isReply />}
        {messageType === "video" && <VideoMessage content={content} isReply />}
      </div>
    </div>
  )
}
