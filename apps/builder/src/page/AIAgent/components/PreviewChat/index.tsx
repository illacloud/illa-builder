import { FC, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { Button, ContributeIcon, DependencyIcon } from "@illa-design/react"
import AIAgentMessage from "@/page/AIAgent/components/AIAgentMessage"
import { ChatContext } from "@/page/AIAgent/components/ChatContext"
import { PreviewChatProps } from "@/page/AIAgent/components/PreviewChat/interface"
import {
  chatContainerStyle,
  inputStyle,
  inputTextContainerStyle,
  previewChatContainerStyle,
  previewTitleContainerStyle,
  previewTitleTextStyle,
} from "@/page/AIAgent/components/PreviewChat/style"
import UserMessage from "@/page/AIAgent/components/UserMessage"
import { ChatMessage, SenderType } from "@/redux/aiAgent/aiAgentState"
import { CollaboratorsInfo } from "@/redux/currentApp/collaborators/collaboratorsState"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"

export const PreviewChat: FC<PreviewChatProps> = () => {
  const currentUserInfo = useSelector(getCurrentUser)
  const [messageList, setMessageList] = useState<ChatMessage[]>([])
  const [inRoomUsers, setInRoomUsers] = useState<CollaboratorsInfo[]>([])

  const messages = useMemo(() => {
    return messageList.map((message) => {
      if (
        message.sender.senderType === SenderType.User &&
        message.sender.senderID === currentUserInfo.userId
      ) {
        return <UserMessage key={message.threadID} message={message} />
      }
      return <AIAgentMessage key={message.threadID} message={message} />
    })
  }, [currentUserInfo.userId, messageList])

  return (
    <ChatContext.Provider
      value={{
        inRoomUsers,
      }}
    >
      <div css={previewChatContainerStyle}>
        <div css={previewTitleContainerStyle}>
          <div css={previewTitleTextStyle}>Preview Window</div>
          <Button ml="8px" colorScheme="grayBlue" leftIcon={<DependencyIcon />}>
            Share
          </Button>
          <Button ml="8px" colorScheme="grayBlue" leftIcon={<ContributeIcon />}>
            Contribute to marketplace
          </Button>
        </div>
        <div css={chatContainerStyle}>{messages}</div>
        <div css={inputTextContainerStyle}>
          <textarea css={inputStyle} placeholder="Input Something" />
          <Button alignSelf="end" mt="16px" colorScheme="techPurple">
            Send
          </Button>
        </div>
      </div>
    </ChatContext.Provider>
  )
}
