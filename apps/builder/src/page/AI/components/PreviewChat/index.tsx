import IconHotSpot from "@illa-public/icon-hot-spot"
import { isPremiumModel } from "@illa-public/market-agent"
import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { AI_AGENT_TYPE, KnowledgeFile } from "@illa-public/public-types"
import { getCurrentUser } from "@illa-public/user-data"
import { AnimatePresence, motion } from "framer-motion"
import {
  ChangeEvent,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { v4 } from "uuid"
import {
  Button,
  ContributeIcon,
  DependencyIcon,
  PlayFillIcon,
  ResetIcon,
  useMessage,
} from "@illa-design/react"
import { ILLA_WEBSOCKET_STATUS } from "@/api/ws/interface"
import AgentBlockInput from "@/assets/agent/agent-block-input.svg?react"
import GridFillIcon from "@/assets/agent/gridFill.svg?react"
import MenuIcon from "@/assets/agent/menuIcon.svg?react"
import StopIcon from "@/assets/agent/stop.svg?react"
import AIAgentMessage from "@/page/AI/components/AIAgentMessage"
import { GenerationMessage } from "@/page/AI/components/GenerationMessage"
import {
  ChatMessage,
  PreviewChatProps,
  SenderType,
} from "@/page/AI/components/PreviewChat/interface"
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
  menuIconStyle,
  mobileInputContainerStyle,
  mobileInputElementStyle,
  mobileInputStyle,
  operationStyle,
  previewChatContainerStyle,
  previewTitleContainerStyle,
  previewTitleTextStyle,
  sendButtonStyle,
  stopIconStyle,
} from "@/page/AI/components/PreviewChat/style"
import UserMessage from "@/page/AI/components/UserMessage"
import { getAgentWSStatus } from "@/redux/config/configSelector"
import { handleParseFile } from "@/utils/file"
import {
  MAX_FILE_SIZE,
  MAX_MESSAGE_FILES_LENGTH,
} from "../KnowledgeUpload/contants"
import UploadButton from "./UploadButton"
import UploadKnowledgeFiles from "./UploadKnowledgeFiles"

export const PreviewChat: FC<PreviewChatProps> = (props) => {
  const {
    showShareDialog,
    showContributeDialog,
    hasCreated,
    isMobile,
    isRunning,
    agentType,
    chatMessages,
    generationMessage,
    onSendMessage,
    isReceiving,
    blockInput,
    editState,
    model,
    showEditPanel,
    isConnecting,
    setShowEditPanel,
    onCancelReceiving,
    onShowShareDialog,
    onShowContributeDialog,
    onClickCreateApp,
    onClickStartRunning,
  } = props

  const currentUserInfo = useSelector(getCurrentUser)
  const message = useMessage()

  const wsStatus = useSelector(getAgentWSStatus)

  const chatRef = useRef<HTMLDivElement>(null)

  const [textAreaVal, setTextAreaVal] = useState("")
  const [knowledgeFiles, setKnowledgeFiles] = useState<KnowledgeFile[]>([])
  const [parseKnowledgeLoading, setParseKnowledgeLoading] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const canShowKnowledgeFiles = isPremiumModel(model)

  const { t } = useTranslation()

  const { track } = useContext(MixpanelTrackContext)

  const messagesList = useMemo(() => {
    return chatMessages.map((message, i) => {
      if (
        message.sender.senderType === SenderType.USER &&
        message.sender.senderID === currentUserInfo.userID
      ) {
        return (
          <UserMessage
            key={message.threadID}
            message={message}
            isMobile={isMobile}
          />
        )
      }
      return (
        <AIAgentMessage
          key={message.threadID}
          message={message}
          isMobile={isMobile}
          canShowLongCopy={i === chatMessages.length - 1 && !isReceiving}
        />
      )
    })
  }, [chatMessages, currentUserInfo.userID, isMobile, isReceiving])

  const handleDeleteFile = (fileName: string) => {
    const files = knowledgeFiles.filter((file) => file.name !== fileName)
    setKnowledgeFiles(files)
  }

  const handleUploadFile = () => {
    if (knowledgeFiles.length >= MAX_MESSAGE_FILES_LENGTH) {
      message.warning({
        content: t("dashboard.message.support_for_up_to_10"),
      })
      return
    }
    inputRef.current?.click()
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    let inputFiles = Array.from(e.target.files || [])
    inputRef.current && (inputRef.current.value = "")
    if (!inputFiles.length) return
    if (inputFiles.length + knowledgeFiles.length > MAX_MESSAGE_FILES_LENGTH) {
      message.warning({
        content: t("dashboard.message.support_for_up_to_10"),
      })
      return
    }
    setParseKnowledgeLoading(true)
    const currentFiles = [...knowledgeFiles]
    try {
      for (let file of inputFiles) {
        if (!file) break
        if (file.size > MAX_FILE_SIZE) {
          message.warning({
            content: t("dashboard.message.please_use_a_file_wi"),
          })
          return
        }
        const index = currentFiles.findIndex(
          (item) => item.name === file.name && item.type === file.type,
        )
        const fileName =
          index !== -1
            ? `${file.name.split(".")[0]}(${v4().slice(0, 3)})`
            : file.name

        currentFiles.push({
          name: fileName,
          type: file.type,
        })
        setKnowledgeFiles(currentFiles)
        const value = await handleParseFile(file, true)
        if (value === "") {
          message.warning({
            content: t("dashboard.message.no_usable_text_conte"),
          })
          handleDeleteFile(fileName)
          return
        }
        const afterParseFilesIndex = currentFiles.findIndex(
          (item) => item.name === file.name && item.type === file.type,
        )
        if (afterParseFilesIndex !== -1) {
          const needUpdateFile = currentFiles[afterParseFilesIndex]
          if (!needUpdateFile.value) {
            currentFiles.splice(afterParseFilesIndex, 1, {
              ...needUpdateFile,
              ...file,
              value,
            })
          }
        } else {
          currentFiles.push({
            name: fileName,
            type: file.type,
            value,
          })
        }
        setKnowledgeFiles(currentFiles)
      }
    } catch (e) {
      message.error({
        content: t("dashboard.message.bad_file"),
      })
    } finally {
      setParseKnowledgeLoading(false)
    }
  }

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
    })
  }, [chatMessages, generationMessage])

  const sendAndClearMessage = useCallback(() => {
    if (
      (textAreaVal !== "" || knowledgeFiles.length > 0) &&
      !parseKnowledgeLoading
    ) {
      onSendMessage(
        {
          threadID: v4(),
          message: textAreaVal,
          sender: {
            senderID: currentUserInfo.userID,
            senderType: SenderType.USER,
          },
          knowledgeFiles: knowledgeFiles,
        } as ChatMessage,
        agentType,
      )
      setTextAreaVal("")
      setKnowledgeFiles([])
    }
  }, [
    agentType,
    currentUserInfo.userID,
    knowledgeFiles,
    onSendMessage,
    parseKnowledgeLoading,
    textAreaVal,
  ])

  const generationBlock = useMemo(() => {
    return (
      generationMessage && <GenerationMessage message={generationMessage} />
    )
  }, [generationMessage])

  useEffect(() => {
    editState === "EDIT" &&
      showShareDialog &&
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        {
          element: "invite_entry",
        },
        "both",
      )
  }, [editState, showShareDialog, track])

  return (
    <div css={previewChatContainerStyle}>
      {!isMobile && (
        <div css={previewTitleContainerStyle}>
          {editState === "RUN" && !showEditPanel && (
            <IconHotSpot
              onClick={() => setShowEditPanel?.(!showEditPanel)}
              css={menuIconStyle}
            >
              <MenuIcon />
            </IconHotSpot>
          )}
          <div css={previewTitleTextStyle}>
            {agentType === AI_AGENT_TYPE.CHAT
              ? t("editor.ai-agent.title-preview.chat")
              : t("editor.ai-agent.title-preview.text-generation")}
          </div>
          {editState === "EDIT" && showShareDialog && (
            <Button
              disabled={!hasCreated}
              ml="8px"
              colorScheme="grayBlue"
              leftIcon={<DependencyIcon />}
              onClick={() => {
                track?.(
                  ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                  {
                    element: "invite_entry",
                  },
                  "both",
                )
                onShowShareDialog?.()
              }}
            >
              {t("share")}
            </Button>
          )}
          {editState === "EDIT" && showContributeDialog && (
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
          {editState === "EDIT" && (
            <Button
              ml="8px"
              colorScheme="grayBlue"
              leftIcon={<GridFillIcon />}
              onClick={() => {
                onClickCreateApp?.()
              }}
            >
              {t("marketplace.agent.create_app")}
            </Button>
          )}
          {editState === "RUN" && !showEditPanel && (
            <Button
              colorScheme="grayBlue"
              loading={isConnecting}
              leftIcon={isRunning ? <ResetIcon /> : <PlayFillIcon />}
              onClick={onClickStartRunning}
            >
              {!isRunning
                ? t("editor.ai-agent.start")
                : t("editor.ai-agent.restart")}
            </Button>
          )}
        </div>
      )}
      <div ref={chatRef} css={chatContainerStyle}>
        {agentType === AI_AGENT_TYPE.CHAT ? messagesList : generationBlock}
      </div>
      <div css={inputTextContainerStyle}>
        <AnimatePresence>
          {isReceiving &&
            wsStatus !== ILLA_WEBSOCKET_STATUS.CLOSED &&
            wsStatus !== ILLA_WEBSOCKET_STATUS.FAILED && (
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
          {isRunning &&
            (wsStatus === ILLA_WEBSOCKET_STATUS.CLOSED ||
              wsStatus === ILLA_WEBSOCKET_STATUS.FAILED) && (
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
                    {t("editor.ai-agent.message.reconnect")}
                  </div>
                </div>
              </motion.div>
            )}
        </AnimatePresence>
        {blockInput ? (
          <div css={blockInputContainerStyle}>
            <AgentBlockInput />
            <div css={blockInputTextStyle}>
              {editState === "RUN"
                ? t("editor.ai-agent.tips.not-start-run")
                : t("editor.ai-agent.tips.not-start")}
            </div>
          </div>
        ) : isMobile ? (
          <div css={mobileInputContainerStyle}>
            <div css={mobileInputStyle}>
              <input
                css={mobileInputElementStyle}
                value={textAreaVal}
                placeholder={t("editor.ai-agent.placeholder.send")}
                onKeyDown={(event) => {
                  if (event.keyCode === 13 && !event.shiftKey) {
                    event.preventDefault()
                    if (isReceiving || blockInput) {
                      return
                    }
                    sendAndClearMessage()
                  }
                }}
                onChange={(v) => {
                  setTextAreaVal(v.target.value)
                }}
              />
              {canShowKnowledgeFiles && (
                <UploadButton
                  handleClick={handleUploadFile}
                  parseKnowledgeLoading={parseKnowledgeLoading}
                  handleFileChange={handleFileChange}
                  ref={inputRef}
                />
              )}
              <Button
                disabled={isReceiving || blockInput}
                ml="8px"
                colorScheme="techPurple"
                onClick={() => {
                  sendAndClearMessage()
                }}
              >
                {t("editor.ai-agent.button.send")}
              </Button>
            </div>
            {canShowKnowledgeFiles && (
              <UploadKnowledgeFiles
                knowledgeFiles={knowledgeFiles}
                handleDeleteFile={handleDeleteFile}
              />
            )}
          </div>
        ) : (
          <>
            <textarea
              value={textAreaVal}
              css={inputStyle}
              placeholder={t("editor.ai-agent.placeholder.send")}
              onKeyDown={(event) => {
                if (event.keyCode === 13 && !event.shiftKey) {
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
            <div css={operationStyle(canShowKnowledgeFiles)}>
              {canShowKnowledgeFiles && (
                <UploadKnowledgeFiles
                  knowledgeFiles={knowledgeFiles}
                  handleDeleteFile={handleDeleteFile}
                />
              )}
              <div css={sendButtonStyle}>
                {canShowKnowledgeFiles && (
                  <UploadButton
                    handleClick={handleUploadFile}
                    parseKnowledgeLoading={parseKnowledgeLoading}
                    handleFileChange={handleFileChange}
                    ref={inputRef}
                  />
                )}
                <Button
                  disabled={isReceiving || blockInput}
                  colorScheme="techPurple"
                  onClick={() => {
                    sendAndClearMessage()
                  }}
                >
                  {t("editor.ai-agent.button.send")}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
