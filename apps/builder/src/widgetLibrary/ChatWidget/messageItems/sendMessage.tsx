import { forwardRef } from "react"
import { MessageSpecProps, MessageType } from "../interface"
import { messageItemContainerStyle } from "../style"
import { AudioMessage } from "./audioMessage"
import { ImageMessage } from "./imageMessage"
import { TextMessage } from "./textMessage"
import { VideoMessage } from "./videoMessage"

export const SendMessage = forwardRef<
  HTMLDivElement,
  MessageSpecProps & { messageType: MessageType }
>((props, ref) => {
  const {
    messageType,
    content,
    isOwnMessage,
    leftMessageColor,
    rightMessageColor,
  } = props
  return (
    <div css={messageItemContainerStyle} ref={ref}>
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
})
SendMessage.displayName = "SendMessage"
