import { FC } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Paragraph, Trigger } from "@illa-design/react"
import { MessageSpecProps } from "@/widgetLibrary/ChatWidget/interface"
import {
  messageTextStyle,
  replyTextStyle,
} from "@/widgetLibrary/ChatWidget/style"
import { Options } from "../options"

export const TextMessage: FC<Partial<MessageSpecProps>> = (props) => {
  const {
    content,
    isReply,
    isOwnMessage = false,
    leftMessageColor = "grayBlue",
    rightMessageColor = "blue",
    toolbarDelete,
    toolbarReply,
  } = props
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
      <div
        css={
          isReply
            ? replyTextStyle
            : messageTextStyle(
                isOwnMessage,
                leftMessageColor,
                rightMessageColor,
              )
        }
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => <Paragraph>{children}</Paragraph>,
            img: ({ src, alt }) => <img src={src} alt={alt} width="100%" />,
          }}
        >
          {content ?? ""}
        </ReactMarkdown>
      </div>
    </Trigger>
  )
}
TextMessage.displayName = "TextMessage"
