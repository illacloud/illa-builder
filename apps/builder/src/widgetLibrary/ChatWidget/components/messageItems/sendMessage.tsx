import { FC } from "react"
import {
  MessageSpecProps,
  MessageType,
} from "@/widgetLibrary/ChatWidget/interface"
import { messageItemContainerStyle } from "@/widgetLibrary/ChatWidget/style"
import { AudioMessage } from "./audioMessage"
import { ImageMessage } from "./imageMessage"
import { TextMessage } from "./textMessage"
import { VideoMessage } from "./videoMessage"

export const SendMessage: FC<
  MessageSpecProps & { messageType: MessageType }
> = (props) => {
  const { messageType, isOwnMessage = false } = props
  return (
    <div css={messageItemContainerStyle(isOwnMessage)}>
      {messageType === "text" && <TextMessage {...props} />}
      {messageType === "image" && <ImageMessage {...props} />}
      {messageType === "audio" && <AudioMessage {...props} />}
      {messageType === "video" && <VideoMessage {...props} />}
    </div>
  )
}
