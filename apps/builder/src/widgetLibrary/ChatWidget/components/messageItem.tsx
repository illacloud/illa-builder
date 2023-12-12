import { Avatar, Message } from "@chatscope/chat-ui-kit-react"
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css"
import dayjs from "dayjs"
import { FC } from "react"
import { ReplyMessage } from "@/widgetLibrary/ChatWidget/components/messageItems/replayMessage"
import { SendMessage } from "@/widgetLibrary/ChatWidget/components/messageItems/sendMessage"
import { IMessageItem } from "@/widgetLibrary/ChatWidget/interface"
import {
  messageContentStyle,
  messageHeaderNameStyle,
  messageHeaderStyle,
  messageHeaderTimeStyle,
} from "../style"

export const MessageItem: FC<IMessageItem> = (props) => {
  const {
    message,
    currentSenderId = "",
    leftMessageColor = "grayBlue",
    rightMessageColor = "blue",
    value = [],
    timeFormat,
    showAvatar,
    showName,
    showSendTime,
    avatarPadding,
  } = props
  const {
    message: content = "",
    senderAvatar,
    senderId,
    senderName,
    messageId,
    sendTime,
    messageType = "text",
    replyMessageId,
  } = message

  const isOwnMessage = !!currentSenderId && senderId === currentSenderId
  return (
    <>
      <Message
        key={messageId}
        model={{
          direction: isOwnMessage ? "outgoing" : "incoming",
          position: "single",
        }}
        avatarPosition={isOwnMessage ? "tr" : "tl"}
        css={messageContentStyle(isOwnMessage, avatarPadding)}
      >
        {showAvatar && <Avatar src={senderAvatar} />}
        <Message.Header>
          <div css={messageHeaderStyle(isOwnMessage)}>
            {showName && <span css={messageHeaderNameStyle}>{senderName}</span>}
            {showSendTime && (
              <span css={messageHeaderTimeStyle}>
                {dayjs(sendTime).format(timeFormat)}
              </span>
            )}
          </div>
        </Message.Header>
        <Message.CustomContent>
          <SendMessage
            {...props}
            messageType={messageType}
            isOwnMessage={isOwnMessage}
            leftMessageColor={leftMessageColor}
            rightMessageColor={rightMessageColor}
            content={content}
          />
        </Message.CustomContent>
        {value.length && replyMessageId && (
          <Message.Footer
            style={{
              flexDirection: isOwnMessage ? "row-reverse" : "row",
              width: "100%",
            }}
          >
            <ReplyMessage messageId={replyMessageId} value={value} />
          </Message.Footer>
        )}
      </Message>
    </>
  )
}
