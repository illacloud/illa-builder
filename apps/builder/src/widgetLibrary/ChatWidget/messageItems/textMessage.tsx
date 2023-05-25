import { FC } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Paragraph } from "@illa-design/react"
import { MessageSpecProps } from "../interface"
import { messageTextStyle, replayTextStyle } from "../style"

export const TextMessage: FC<MessageSpecProps> = ({
  content,
  isReply,
  isOwnMessage = false,
  leftMessageColor = "grayBlue",
  rightMessageColor = "blue",
}) => {
  return (
    <>
      <div
        css={
          isReply
            ? replayTextStyle
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
          }}
        >
          {content ?? ""}
        </ReactMarkdown>
      </div>
    </>
  )
}
