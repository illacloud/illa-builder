import { AnimatePresence, motion } from "framer-motion"
import { FC, useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { v4 } from "uuid"
import { Button, ContributeIcon, DependencyIcon } from "@illa-design/react"
import { ReactComponent as AgentBlockInput } from "@/assets/agent/agent-block-input.svg"
import { ReactComponent as StopIcon } from "@/assets/agent/stop.svg"
import { canManage } from "@/illa-public-component/UserRoleUtils"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
} from "@/illa-public-component/UserRoleUtils/interface"
import AIAgentMessage from "@/page/AI/components/AIAgentMessage"
import { GenerationMessage } from "@/page/AI/components/GenerationMessage"
import { PreviewChatProps } from "@/page/AI/components/PreviewChat/interface"
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
} from "@/page/AI/components/PreviewChat/style"
import UserMessage from "@/page/AI/components/UserMessage"
import {
  AI_AGENT_TYPE,
  ChatMessage,
  SenderType,
} from "@/redux/aiAgent/aiAgentState"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"

export const PreviewChat: FC<PreviewChatProps> = (props) => {
  const {
    hasCreated,
    isMobile,
    agentType,
    chatMessages,
    generationMessage,
    onSendMessage,
    isReceiving,
    blockInput,
    editState,
    onCancelReceiving,
    onShowShareDialog,
    onShowContributeDialog,
  } = props

  const currentUserInfo = useSelector(getCurrentUser)
  const currentTeamInfo = useSelector(getCurrentTeamInfo)!!

  const [textAreaVal, setTextAreaVal] = useState("")

  const { t } = useTranslation()

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

  const generationBlock = useMemo(() => {
    return (
      generationMessage && <GenerationMessage message={generationMessage} />
    )
  }, [generationMessage])

  return (
    <div css={previewChatContainerStyle}>
      {!isMobile &&
        canManage(
          currentTeamInfo.myRole,
          ATTRIBUTE_GROUP.AGENT,
          ACTION_MANAGE.FORK_AGENT,
        ) && (
          <div css={previewTitleContainerStyle}>
            <div css={previewTitleTextStyle}>
              {t("editor.ai-agent.title-preview")}
            </div>
            {editState === "EDIT" && (
              <Button
                disabled={!hasCreated}
                ml="8px"
                colorScheme="grayBlue"
                leftIcon={<DependencyIcon />}
                onClick={() => {
                  onShowShareDialog?.()
                }}
              >
                {t("share")}
              </Button>
            )}
            {editState === "EDIT" && (
              <Button
                disabled={!hasCreated}
                ml="8px"
                colorScheme="grayBlue"
                leftIcon={<ContributeIcon />}
                onClick={() => {
                  onShowContributeDialog?.()
                }}
              >
                {t("editor.ai-agent.contribute")}
              </Button>
            )}
          </div>
        )}
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
                opacity: 0,
              }}
              animate={{
                y: -16,
                opacity: 1,
              }}
              exit={{
                y: 0,
                opacity: 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <div css={generatingContentContainerStyle}>
                <div css={generatingTextStyle}>
                  {t("editor.ai-agent.button.generating")}
                </div>
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
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault()
              if (isReceiving || blockInput) {
                return
              }
              sendAndClearMessage()
            }
          }}
          onChange={(event) => {
            setTextAreaVal(event.target.value)
          }}
        />
        <Button
          alignSelf="end"
          disabled={isReceiving || blockInput}
          mt="16px"
          colorScheme="techPurple"
          onClick={() => {
            sendAndClearMessage()
          }}
        >
          {t("editor.ai-agent.button.send")}
        </Button>
      </div>
      {blockInput && (
        <div css={blockInputContainerStyle}>
          <AgentBlockInput />
          <div css={blockInputTextStyle}>
            {editState === "RUN"
              ? t("editor.ai-agent.tips.not-start-run")
              : t("editor.ai-agent.tips.not-start")}
          </div>
        </div>
      )}
    </div>
  )
}
