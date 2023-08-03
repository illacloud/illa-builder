import { AnimatePresence, motion } from "framer-motion"
import { FC, useCallback, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { v4 } from "uuid"
import { Button, ContributeIcon, DependencyIcon } from "@illa-design/react"
import { ReactComponent as AgentBlockInput } from "@/assets/agent/agent-block-input.svg"
import { ReactComponent as StopIcon } from "@/assets/agent/stop.svg"
import AIAgentMessage from "@/page/AIAgent/components/AIAgentMessage"
import { PreviewChatProps } from "@/page/AIAgent/components/PreviewChat/interface"
import {
  blockInputContainerStyle,
  blockInputTextStyle,
  chatContainerStyle,
  generatingContainerStyle,
  generatingContentContainerStyle,
  generatingDividerStyle,
  generatingTextStyle,
  inputStyle,
  inputTextContainerStyle,
  previewChatContainerStyle,
  previewTitleContainerStyle,
  previewTitleTextStyle,
  stopIconStyle,
} from "@/page/AIAgent/components/PreviewChat/style"
import UserMessage from "@/page/AIAgent/components/UserMessage"
import {
  AI_AGENT_TYPE,
  ChatMessage,
  SenderType,
} from "@/redux/aiAgent/aiAgentState"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"

export const PreviewChat: FC<PreviewChatProps> = (props) => {
  const {
    agentType,
    chatMessages,
    generationMessage,
    onSendMessage,
    isReceiving,
    blockInput,
    onCancelReceiving,
  } = props

  const currentUserInfo = useSelector(getCurrentUser)

  const [textAreaVal, setTextAreaVal] = useState("")

  const messagesList = useMemo(() => {
    return chatMessages.map((message) => {
      if (
        message.sender.senderType === SenderType.USER &&
        message.sender.senderID === currentUserInfo.userId
      ) {
        return <UserMessage key={message.threadID} message={message} />
      }
      return <AIAgentMessage key={message.threadID} message={message} />
    })
  }, [currentUserInfo.userId, chatMessages])

  const generationBlock = useMemo(() => {
    return <div>{JSON.stringify(generationMessage)}</div>
  }, [generationMessage])

  const sendAndClearMessage = useCallback(() => {
    if (textAreaVal !== "") {
      onSendMessage(
        {
          threadID: v4(),
          message: textAreaVal,
          sender: {
            senderID: currentUserInfo.userId,
            senderType: SenderType.USER,
          },
        } as ChatMessage,
        agentType,
      )
      setTextAreaVal("")
    }
  }, [agentType, currentUserInfo.userId, onSendMessage, textAreaVal])

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
      <div css={chatContainerStyle}>
        {agentType === AI_AGENT_TYPE.CHAT ? messagesList : generationBlock}
      </div>
      <div css={inputTextContainerStyle}>
        <AnimatePresence>
          {isReceiving && (
            <motion.div
              css={generatingContainerStyle}
              initial={{
                y: 0,
              }}
              animate={{
                y: -20,
              }}
              exit={{
                y: 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <div css={generatingContentContainerStyle}>
                <div css={generatingTextStyle}>Generating...</div>
                <div css={generatingDividerStyle} />
                <StopIcon
                  css={stopIconStyle}
                  onClick={() => {
                    onCancelReceiving()
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <textarea
          value={textAreaVal}
          css={inputStyle}
          placeholder="Input Something"
          onKeyDown={(event) => {
            if (isReceiving || blockInput) {
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
          disabled={isReceiving}
          mt="16px"
          colorScheme="techPurple"
          onClick={() => {
            sendAndClearMessage()
          }}
        >
          Send
        </Button>
      </div>
      {false && (
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
