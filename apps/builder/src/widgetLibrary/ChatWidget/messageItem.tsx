import { Avatar, Message } from "@chatscope/chat-ui-kit-react"
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css"
import dayjs from "dayjs"
import { FC } from "react"
import { Trigger } from "@illa-design/react"
import { IMessageItem } from "@/widgetLibrary/ChatWidget/interface"
import { Options } from "@/widgetLibrary/ChatWidget/options"
import { ReplayMessage } from "./messageItems/replayMessage"
import { SendMessage } from "./messageItems/sendMessage"
import {
  messageContentStyle,
  messageHeaderNameStyle,
  messageHeaderStyle,
  messageHeaderTimeStyle,
} from "./style"

export const MessageItem: FC<IMessageItem> = (props) => {
  const {
    message,
    currentSenderId = "",
    leftMessageColor = "grayBlue",
    rightMessageColor = "blue",
    value = [],
    timeFormat,
    toolbarReplay,
    toolbarDelete,
    showAvatar,
    showName,
    showSendTime,
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
        css={messageContentStyle}
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
          <Trigger
            bdRadius="4px"
            bg="white"
            content={<Options {...props} />}
            colorScheme="transparent"
            disabled={!toolbarDelete && !toolbarReplay}
            position={isOwnMessage ? "left-start" : "right-start"}
            showArrow={false}
            autoFitPosition={false}
            withoutPadding
            trigger="hover"
            withoutShadow
          >
            <SendMessage
              messageType={messageType}
              isOwnMessage={isOwnMessage}
              leftMessageColor={leftMessageColor}
              rightMessageColor={rightMessageColor}
              content={content}
            />
          </Trigger>
        </Message.CustomContent>
        {value.length && replyMessageId && (
          <Message.Footer
            style={{ flexDirection: isOwnMessage ? "row-reverse" : "row" }}
          >
            <ReplayMessage messageId={replyMessageId} value={value} />
          </Message.Footer>
        )}
      </Message>
    </>
  )
}
