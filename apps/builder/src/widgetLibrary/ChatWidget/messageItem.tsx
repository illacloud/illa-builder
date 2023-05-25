import { Avatar, Message } from "@chatscope/chat-ui-kit-react"
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css"
import dayjs from "dayjs"
import { FC, useCallback } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Paragraph } from "@illa-design/react"
import { Trigger } from "@illa-design/react"
import { WrappedAudio } from "@/widgetLibrary/AudioWidget/audio"
import { IMessageItem } from "@/widgetLibrary/ChatWidget/interface"
import { WrappedVideo } from "@/widgetLibrary/VideoWidget"
import { Options } from "./options"
import {
  messageContentStyle,
  messageHeaderNameStyle,
  messageHeaderStyle,
  messageHeaderTimeStyle,
  messageTextStyle,
  replayImageStyle,
  replayMessageStyle,
  replayNameStyle,
  replayTextStyle,
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

  const emptyFun = useCallback(() => {}, [])

  const renderMedia = useCallback(
    (messageId: string) => {
      const message = value.find((item) => item.messageId === messageId)
      if (!message) return null
      const { messageType, message: content, senderName } = message
      return (
        <div css={replayMessageStyle}>
          <div>
            <span css={replayNameStyle}>{senderName}: </span>
            {messageType === "text" && (
              <div css={replayTextStyle}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }) => <Paragraph>{children}</Paragraph>,
                  }}
                >
                  {content ?? ""}
                </ReactMarkdown>
              </div>
            )}
            {messageType === "image" && (
              <div css={replayImageStyle}>
                <img src={content} />
              </div>
            )}
            {messageType === "audio" && (
              <div style={{ height: "50px", width: "320px" }}>
                <WrappedAudio
                  {...props}
                  url={content}
                  controls={true}
                  onPlay={emptyFun}
                  onPause={emptyFun}
                  onEnded={emptyFun}
                  onReady={emptyFun}
                  onPlaybackRateChange={emptyFun}
                />
              </div>
            )}
            {messageType === "video" && (
              <div style={{ height: "150px", width: "320px" }}>
                <WrappedVideo
                  {...props}
                  url={content}
                  controls={true}
                  onPlay={emptyFun}
                  onPause={emptyFun}
                  onEnded={emptyFun}
                  onReady={emptyFun}
                  onPlaybackRateChange={emptyFun}
                />
              </div>
            )}
          </div>
        </div>
      )
    },
    [emptyFun, props, value],
  )
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
            <div>
              {messageType === "text" && (
                <div
                  css={messageTextStyle(
                    isOwnMessage,
                    leftMessageColor,
                    rightMessageColor,
                  )}
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
              )}
              {messageType === "image" && (
                <img src={content} alt="" width="300px" />
              )}
              {messageType === "audio" && (
                <div style={{ height: "50px", width: "300px" }}>
                  <WrappedAudio
                    {...props}
                    url={content}
                    controls={true}
                    onPlay={emptyFun}
                    onPause={emptyFun}
                    onEnded={emptyFun}
                    onReady={emptyFun}
                    onPlaybackRateChange={emptyFun}
                  />
                </div>
              )}
              {messageType === "video" && (
                <div style={{ height: "150px", width: "300px" }}>
                  <WrappedVideo
                    {...props}
                    url={content}
                    controls={true}
                    onPlay={emptyFun}
                    onPause={emptyFun}
                    onEnded={emptyFun}
                    onReady={emptyFun}
                    onPlaybackRateChange={emptyFun}
                  />
                </div>
              )}
            </div>
          </Trigger>
        </Message.CustomContent>
        {value.length && replyMessageId && (
          <Message.Footer
            style={{ flexDirection: isOwnMessage ? "row-reverse" : "row" }}
          >
            {renderMedia(replyMessageId)}
          </Message.Footer>
        )}
      </Message>
    </>
  )
}
