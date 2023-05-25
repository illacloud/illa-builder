import { FC } from "react"
import { MessageSpecProps, MessageType } from "../interface"
import { messageItemContainerStyle } from "../style"
import { AudioMessage } from "./audioMessage"
import { ImageMessage } from "./imageMessage"
import { TextMessage } from "./textMessage"
import { VideoMessage } from "./videoMessage"

export const SendMessage: FC<
  MessageSpecProps & { messageType: MessageType }
> = ({
  messageType,
  content,
  isOwnMessage,
  leftMessageColor,
  rightMessageColor,
}) => {
  console.log("messageType", messageType)
  return (
    <div css={messageItemContainerStyle}>
      {messageType === "text" && (
        <TextMessage
          content={content}
          isOwnMessage={isOwnMessage}
          leftMessageColor={leftMessageColor}
          rightMessageColor={rightMessageColor}
        />
      )}
      {messageType === "image" && <ImageMessage content={content} />}
      {messageType === "audio" && <AudioMessage content={content} />}
      {messageType === "video" && <VideoMessage content={content} />}
    </div>
  )
}
