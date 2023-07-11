import DefaultAvatar from "@/assets/chat/empty.svg"
import { MessageContent, Pluralize } from "@/widgetLibrary/ChatWidget/interface"

export const formatEventOptions = (
  mappedOption: Pluralize<MessageContent> = {
    messageIds: [],
    messages: [],
    messageTypes: [],
    senderAvatars: [],
    replyMessageIds: [],
    senderIds: [],
    senderNames: [],
    sendTimes: [],
  },
) => {
  const messageId = mappedOption.messageIds ?? []
  const message = mappedOption.messages ?? []
  const messageType = mappedOption.messageTypes ?? []
  const senderAvatar = mappedOption.senderAvatars ?? []
  const replyMessageId = mappedOption.replyMessageIds ?? []
  const senderId = mappedOption.senderIds ?? []
  const senderName = mappedOption.senderNames ?? []
  const sendTime = mappedOption.sendTimes ?? []
  const maxLength = Math.max(
    messageId.length,
    message.length,
    messageType.length,
    senderAvatar.length,
    replyMessageId.length,
    senderId.length,
    senderName.length,
    sendTime.length,
  )
  const messageList: MessageContent[] = []
  for (let i = 0; i < maxLength; i++) {
    const messageIdItem = messageId[i] || `${i + 1}`
    const messageItem = message[i] || ""
    const messageTypeItem = messageType[i] || "text"
    const senderAvatarItem = senderAvatar[i] || DefaultAvatar
    const replyMessageIdtem = replyMessageId[i] || ""
    const senderIdItem = senderId[i] || ""
    const senderNameItem = senderName[i] ?? ""
    const sendTimeItem = sendTime[i] ?? ""
    messageList.push({
      messageId: messageIdItem,
      message: safeNodeValue(messageItem),
      messageType: messageTypeItem,
      senderAvatar: senderAvatarItem,
      replyMessageId: replyMessageIdtem,
      senderId: senderIdItem,
      senderName: safeNodeValue(senderNameItem),
      sendTime: safeNodeValue(sendTimeItem),
    })
  }
  return messageList
}
const safeNodeValue = (value: unknown) => {
  return typeof value === "string" ? value : ""
}

export const addOrDelLoading = (
  receiving: boolean,
  messageList: MessageContent[],
  updateLoading: (messageList: MessageContent[]) => void,
  handleOnSizeChange: () => void,
) => {
  if (!messageList.length) return
  if (receiving) {
    updateLoading([...messageList, { loading: true }])
  } else {
    updateLoading(messageList)
    handleOnSizeChange()
  }
}
