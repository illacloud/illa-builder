import { FC } from "react"
import { Trigger } from "@illa-design/react"
import { MessageSpecProps } from "@/widgetLibrary/ChatWidget/interface"
import {
  replyImageStyle,
  sendImageStyle,
} from "@/widgetLibrary/ChatWidget/style"
import { Options } from "../options"

export const ImageMessage: FC<Partial<MessageSpecProps>> = (props) => {
  const { content, isReply, toolbarDelete, toolbarReply, isOwnMessage } = props
  return (
    <Trigger
      bdRadius="4px"
      bg="white"
      content={<Options {...props} />}
      colorScheme="transparent"
      disabled={!toolbarDelete && !toolbarReply}
      position={isOwnMessage ? "left-start" : "right-start"}
      showArrow={false}
      autoFitPosition={false}
      withoutPadding
      trigger="hover"
      withoutShadow
    >
      <div>
        {isReply ? (
          <div css={replyImageStyle}>
            <img src={content} />
          </div>
        ) : (
          <img src={content} alt="" width="100%" css={sendImageStyle} />
        )}
      </div>
    </Trigger>
  )
}
