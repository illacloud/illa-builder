import { FC, useCallback, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { v4 } from "uuid"
import { Button, ContributeIcon, DependencyIcon } from "@illa-design/react"
import { ReactComponent as AgentBlockInput } from "@/assets/agent/agent-block-input.svg"
import AIAgentMessage from "@/page/AIAgent/components/AIAgentMessage"
import { PreviewChatProps } from "@/page/AIAgent/components/PreviewChat/interface"
import {
  blockInputContainerStyle,
  blockInputTextStyle,
  chatContainerStyle,
  inputStyle,
  inputTextContainerStyle,
  previewChatContainerStyle,
  previewTitleContainerStyle,
  previewTitleTextStyle,
} from "@/page/AIAgent/components/PreviewChat/style"
import UserMessage from "@/page/AIAgent/components/UserMessage"
import { ChatMessage, SenderType } from "@/redux/aiAgent/aiAgentState"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"

export const PreviewChat: FC<PreviewChatProps> = (props) => {
  const { messages, onSendMessage, blockSend, blockInput } = props

  const currentUserInfo = useSelector(getCurrentUser)

  const [textAreaVal, setTextAreaVal] = useState("")

  const messagesList = useMemo(() => {
    return messages.map((message) => {
      if (
        message.sender.senderType === SenderType.User &&
        message.sender.senderID === currentUserInfo.userId
      ) {
        return <UserMessage key={message.threadID} message={message} />
      }
      return <AIAgentMessage key={message.threadID} message={message} />
    })
  }, [currentUserInfo.userId, messages])

  const sendAndClearMessage = useCallback(() => {
    if (textAreaVal !== "") {
      onSendMessage({
        threadID: v4(),
        message: textAreaVal,
        sender: {
          senderID: currentUserInfo.userId,
          senderType: SenderType.User,
        },
      } as ChatMessage)
      setTextAreaVal("")
    }
  }, [currentUserInfo.userId, onSendMessage, textAreaVal])

  return (
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
      <div css={chatContainerStyle}>{messagesList}</div>
      <div css={inputTextContainerStyle}>
        <textarea
          value={textAreaVal}
          css={inputStyle}
          placeholder="Input Something"
          onKeyDown={(event) => {
            if (blockSend || blockInput) {
              return
            }
            if (event.key === "Enter") {
              sendAndClearMessage()
            }
          }}
          onChange={(event) => {
            setTextAreaVal(event.target.value)
          }}
        />
        <Button
          alignSelf="end"
          disabled={blockSend}
          mt="16px"
          colorScheme="techPurple"
          onClick={() => {
            sendAndClearMessage()
          }}
        >
          Send
        </Button>
      </div>
      {blockInput && (
        <div css={blockInputContainerStyle}>
          <AgentBlockInput />
          <div css={blockInputTextStyle}>
            Complete the Agent and click run in the left panel
          </div>
        </div>
      )}
    </div>
  )
}
