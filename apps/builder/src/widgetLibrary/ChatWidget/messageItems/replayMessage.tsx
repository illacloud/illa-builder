import { FC } from "react"
import { MessageContent } from "../interface"
import { replayMessageStyle, replayNameStyle } from "../style"
import { AudioMessage } from "./audioMessage"
import { ImageMessage } from "./imageMessage"
import { TextMessage } from "./textMessage"
import { VideoMessage } from "./videoMessage"

export const ReplayMessage: FC<{
  messageId: string
  value: MessageContent[]
}> = ({ messageId, value }) => {
  const message = value.find((item) => item.messageId === messageId)
  if (!message) return null
  const { messageType, message: content, senderName } = message
  return (
    <div css={replayMessageStyle}>
      <div>
        <span css={replayNameStyle}>{senderName}: </span>
        {messageType === "text" && <TextMessage content={content} isReply />}
        {messageType === "image" && <ImageMessage content={content} isReply />}
        {messageType === "audio" && <AudioMessage content={content} isReply />}
        {messageType === "video" && <VideoMessage content={content} isReply />}
      </div>
    </div>
  )
}
