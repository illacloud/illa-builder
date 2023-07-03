import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export type MessageType = "text" | "image" | "video" | "audio"

export type Pluralize<T> = {
  [K in keyof T as `${string & K}s`]: T[K][]
}

export interface IMessageItem extends BaseChatProps {
  message: MessageContent
}

export interface MessageContent {
  messageId?: string
  message?: string
  sendTime?: string
  replyMessageId?: string
  senderName?: string
  senderId?: string
  senderAvatar?: string
  messageType?: MessageType
  loading?: boolean
}

export interface BaseChatProps extends BaseWidgetProps {
  value?: MessageContent[]
  currentSenderId?: string
  leftMessageColor?: string
  rightMessageColor?: string
  receiving?: boolean
  selectedMessage?: MessageContent
  timeFormat?: string
  toolbarReplay?: boolean
  toolbarDelete?: boolean
  showAvatar?: boolean
  showName?: boolean
  showSendTime?: boolean
  showFooter?: boolean
  backgroundColor?: string
  handleOnReplay?: (message: MessageContent) => void
  handleOnDelete?: (message: MessageContent) => void
}

export interface ChatWidgetProps
  extends BaseChatProps,
    Pick<TooltipWrapperProps, "tooltipText"> {
  footerHeight?: number
  mappedOption?: Pluralize<MessageContent>
  columnNumber: number
}

export interface MessageSpecProps {
  content?: string
  isReply?: boolean
  isOwnMessage?: boolean
  leftMessageColor?: string
  rightMessageColor?: string
}

export const SendMessageProps = {}
