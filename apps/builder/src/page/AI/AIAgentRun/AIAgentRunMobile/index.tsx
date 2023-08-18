import { Avatar } from "@illa-public/avatar"
import { CodeEditor } from "@illa-public/code-editor"
import { RecordEditor } from "@illa-public/record-editor"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import { getCurrentTeamInfo } from "@illa-public/user-data"
import { canManage, canUseUpgradeFeature } from "@illa-public/user-role-utils"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
} from "@illa-public/user-role-utils/interface"
import { motion } from "framer-motion"
import { FC, useMemo, useState } from "react"
import { Controller, useForm, useFormState } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useAsyncValue } from "react-router-dom"
import { v4 } from "uuid"
import {
  Button,
  DependencyIcon,
  ResetIcon,
  Select,
  getColor,
  useMessage,
} from "@illa-design/react"
import { TextSignal } from "@/api/ws/textSignal"
import { ReactComponent as OpenAIIcon } from "@/assets/agent/modal-openai.svg"
import { labelStyle, labelTextStyle } from "@/page/AI/AIAgent/style"
import { buttonContainerStyle } from "@/page/AI/AIAgentRun/AIAgentRunPC/style"
import AIAgentBlock from "@/page/AI/components/AIAgentBlock"
import { PreviewChat } from "@/page/AI/components/PreviewChat"
import { useAgentConnect } from "@/page/AI/components/ws/useAgentConnect"
import {
  AI_AGENT_MODEL,
  AI_AGENT_TYPE,
  Agent,
  ChatSendRequestPayload,
  MarketAiAgent,
} from "@/redux/aiAgent/aiAgentState"
import { CollaboratorsInfo } from "@/redux/currentApp/collaborators/collaboratorsState"
import { ChatContext } from "../../components/ChatContext"
import {
  agentContentContainerStyle,
  agentControlContainerStyle,
  agentIconStyle,
  agentMarketContainerStyle,
  agentMarketResultStyle,
  agentNameStyle,
  agentTeamNameStyle,
  aiAgentContainerStyle,
  configContainerStyle,
  dividerStyle,
  headerContainerStyle,
  headerInfoStyle,
  lineStyle,
  previewChatContainer,
  shareContainerStyle,
  tabContainerStyle,
  tabStyle,
  tabsContainerStyle,
} from "./style"

export const AIAgentRunMobile: FC = () => {
  const { agent, marketplaceInfo } = useAsyncValue() as {
    agent: Agent
    marketplaceInfo: MarketAiAgent | undefined
  }

  const { control, handleSubmit, getValues, reset } = useForm<Agent>({
    mode: "onSubmit",
    defaultValues: agent,
  })

  const currentTeamInfo = useSelector(getCurrentTeamInfo)!!

  const { isDirty, isValid } = useFormState({
    control,
  })

  const message = useMessage()
  const upgradeModal = useUpgradeModal()

  // page state
  const [isRunning, setIsRunning] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [shareDialogVisible, setShareDialogVisible] = useState(false)
  // data state
  const [inRoomUsers, setInRoomUsers] = useState<CollaboratorsInfo[]>([])
  const [isReceiving, setIsReceiving] = useState(false)

  const { t } = useTranslation()

  const [currentSelectTab, setCurrentSelectTab] = useState<"config" | "run">(
    "config",
  )

  // premium dialog
  const canUseBillingFeature = canUseUpgradeFeature(
    currentTeamInfo?.myRole,
    currentTeamInfo?.totalTeamLicense?.teamLicensePurchased,
    currentTeamInfo?.totalTeamLicense?.teamLicenseAllPaid,
  )

  const { sendMessage, generationMessage, chatMessages, reconnect, connect } =
    useAgentConnect({
      onSendClean: () => {
        sendMessage(
          {} as ChatSendRequestPayload,
          TextSignal.CLEAN,
          getValues("agentType"),
          "clean",
          false,
        )
      },
      onStartRunning: () => {
        setCurrentSelectTab("run")
      },
      onConnecting: (isConnecting) => {
        setIsConnecting(isConnecting)
      },
      onReceiving: (isReceiving) => {
        setIsReceiving(isReceiving)
      },
      onRunning: (isRunning: boolean) => {
        setIsRunning(isRunning)
      },
      onSendPrompt(): void {
        sendMessage(
          {
            threadID: v4(),
            prompt: getValues("prompt"),
            variables: getValues("variables"),
            actionID: getValues("aiAgentID"),
            modelConfig: getValues("modelConfig"),
            model: getValues("model"),
            agentType: getValues("agentType"),
          } as ChatSendRequestPayload,
          TextSignal.RUN,
          getValues("agentType"),
          "chat",
          false,
        )
      },
      onUpdateRoomUsers(roomUsers: CollaboratorsInfo[]): void {
        setInRoomUsers(roomUsers)
      },
    })

  const dialog = useMemo(() => {
    return (
      <Controller
        control={control}
        name="publishedToMarketplace"
        render={({ field }) => {
          if (!shareDialogVisible) {
            return <></>
          }
          if (field.value) {
            if (
              canManage(
                currentTeamInfo.myRole,
                ATTRIBUTE_GROUP.AGENT,
                ACTION_MANAGE.FORK_AGENT,
              )
            ) {
              return <></>
            } else {
              return <></>
            }
          } else {
            if (
              canManage(
                currentTeamInfo.myRole,
                ATTRIBUTE_GROUP.AGENT,
                ACTION_MANAGE.FORK_AGENT,
              )
            ) {
              return <></>
            } else {
              return <></>
            }
          }
        }}
      />
    )
  }, [control, currentTeamInfo.myRole, shareDialogVisible])

  const configTab = (
    <div css={configContainerStyle}>
      <div css={agentControlContainerStyle}>
        <Controller
          name="prompt"
          control={control}
          rules={{
            required: true,
          }}
          shouldUnregister={false}
          render={({ field: promptField }) => (
            <Controller
              name="variables"
              control={control}
              render={({ field: variables }) => (
                <AIAgentBlock title={"Prompt"}>
                  <CodeEditor
                    {...promptField}
                    minHeight="200px"
                    editable={false}
                    completionOptions={variables.value}
                  />
                </AIAgentBlock>
              )}
            />
          )}
        />
        <Controller
          name="variables"
          control={control}
          rules={{
            validate: (value) =>
              value.every((param) => param.key !== "" && param.value !== "") ||
              (value.length === 1 &&
                value[0].key === "" &&
                value[0].value === ""),
          }}
          shouldUnregister={false}
          render={({ field }) =>
            field.value.length > 0 ? (
              <AIAgentBlock title={t("editor.ai-agent.label.variable")}>
                <RecordEditor
                  fillOnly
                  records={field.value}
                  onChangeKey={(index, key) => {
                    const newVariables = [...field.value]
                    newVariables[index].key = key
                    field.onChange(newVariables)
                  }}
                  onChangeValue={(index, _, value) => {
                    const newVariables = [...field.value]
                    newVariables[index].value = value
                    field.onChange(newVariables)
                  }}
                  onAdd={() => {}}
                  onDelete={() => {}}
                  label={""}
                />
              </AIAgentBlock>
            ) : (
              <></>
            )
          }
        />
        <Controller
          name="model"
          control={control}
          render={({ field }) => (
            <AIAgentBlock title={t("editor.ai-agent.label.model")} required>
              <Select
                {...field}
                colorScheme={"techPurple"}
                readOnly={true}
                options={[
                  {
                    label: (
                      <div css={labelStyle}>
                        <OpenAIIcon />
                        <span css={labelTextStyle}>GPT-3.5</span>
                      </div>
                    ),
                    value: AI_AGENT_MODEL.GPT_3_5_TURBO,
                  },
                  {
                    label: (
                      <div css={labelStyle}>
                        <OpenAIIcon />
                        <span css={labelTextStyle}>GPT-3.5-16k</span>
                      </div>
                    ),
                    value: AI_AGENT_MODEL.GPT_3_5_TURBO_16K,
                  },
                  {
                    label: (
                      <div css={labelStyle}>
                        <OpenAIIcon />
                        <span css={labelTextStyle}>GPT-4</span>
                      </div>
                    ),
                    value: AI_AGENT_MODEL.GPT_4,
                  },
                ]}
              />
            </AIAgentBlock>
          )}
        />
      </div>
      <form
        onSubmit={handleSubmit(async (data) => {
          if (
            data.model !== AI_AGENT_MODEL.GPT_3_5_TURBO &&
            !canUseBillingFeature
          ) {
            upgradeModal({
              modalType: "agent",
            })
            return
          }
          reset(data)
          isRunning
            ? await reconnect(data.aiAgentID, data.agentType)
            : await connect(data.aiAgentID, data.agentType)
        })}
      >
        <div css={buttonContainerStyle}>
          <Button
            flex="1"
            disabled={!isValid}
            loading={isConnecting}
            ml="8px"
            colorScheme={getColor("grayBlue", "02")}
            leftIcon={<ResetIcon />}
          >
            {!isRunning
              ? t("editor.ai-agent.start")
              : t("editor.ai-agent.restart")}
          </Button>
        </div>
      </form>
    </div>
  )

  const previewChatTab = (
    <Controller
      name="agentType"
      control={control}
      shouldUnregister={false}
      render={({ field }) => (
        <div css={previewChatContainer}>
          <PreviewChat
            hasCreated={true}
            isMobile={true}
            editState="RUN"
            agentType={field.value}
            chatMessages={chatMessages}
            generationMessage={generationMessage}
            isReceiving={isReceiving}
            blockInput={!isRunning || isDirty}
            onSendMessage={(message, agentType: AI_AGENT_TYPE) => {
              sendMessage(
                {
                  threadID: message.threadID,
                  prompt: message.message,
                  actionID: getValues("aiAgentID"),
                  variables: [],
                  modelConfig: getValues("modelConfig"),
                  model: getValues("model"),
                  agentType: getValues("agentType"),
                } as ChatSendRequestPayload,
                TextSignal.RUN,
                agentType,
                "chat",
                true,
                message,
              )
            }}
            onCancelReceiving={() => {
              sendMessage(
                {} as ChatSendRequestPayload,
                TextSignal.STOP_ALL,
                field.value,
                "stop_all",
                false,
              )
              setIsReceiving(false)
            }}
          />
        </div>
      )}
    />
  )

  return (
    <ChatContext.Provider value={{ inRoomUsers }}>
      <div css={aiAgentContainerStyle}>
        <div css={headerContainerStyle}>
          <div css={headerInfoStyle}>
            <Controller
              name="icon"
              control={control}
              render={({ field }) => (
                <Avatar css={agentIconStyle} avatarUrl={field.value} />
              )}
            />
            <div css={agentContentContainerStyle}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <div css={agentNameStyle}>{field.value}</div>
                )}
              />
              <div css={agentMarketContainerStyle}>
                <div css={agentTeamNameStyle}>{agent.teamName}</div>
                {agent.publishedToMarketplace && (
                  <div css={agentMarketResultStyle}>
                    {t("marketplace.star", {
                      operationNum: marketplaceInfo?.marketplace.numStars,
                    })}{" "}
                    ·{" "}
                    {t("marketplace.fork", {
                      operationNum: marketplaceInfo?.marketplace.numForks,
                    })}
                  </div>
                )}
              </div>
            </div>
            <Controller
              name="publishedToMarketplace"
              control={control}
              render={({ field }) => {
                if (
                  !field.value &&
                  !canManage(
                    currentTeamInfo.myRole,
                    ATTRIBUTE_GROUP.AGENT,
                    ACTION_MANAGE.FORK_AGENT,
                  )
                ) {
                  return <></>
                }
                return (
                  <div
                    css={shareContainerStyle}
                    onClick={() => {
                      setShareDialogVisible(true)
                    }}
                  >
                    <DependencyIcon fs="48px" />
                  </div>
                )
              }}
            />
          </div>
          <Controller
            name="agentType"
            control={control}
            render={({ field }) => (
              <div css={tabsContainerStyle}>
                <div
                  css={tabContainerStyle}
                  onClick={() => {
                    setCurrentSelectTab("config")
                  }}
                >
                  <div css={tabStyle}>{t("editor.ai-agent.tab.prompt")}</div>
                  {currentSelectTab === "config" && (
                    <motion.div css={lineStyle} layoutId="underline" />
                  )}
                </div>
                <div css={dividerStyle} />
                <div
                  css={tabContainerStyle}
                  onClick={() => {
                    if (!isRunning || isDirty) {
                      message.info({
                        content: t("editor.ai-agent.message.click-start"),
                      })
                      return
                    }
                    setCurrentSelectTab("run")
                  }}
                >
                  <div css={tabStyle}>
                    {field.value === AI_AGENT_TYPE.CHAT
                      ? t("editor.ai-agent.tab.chat")
                      : t("editor.ai-agent.tab.text")}
                  </div>
                  {currentSelectTab === "run" && (
                    <motion.div css={lineStyle} layoutId="underline" />
                  )}
                </div>
              </div>
            )}
          />
        </div>
        {currentSelectTab === "run" && previewChatTab}
        {currentSelectTab === "config" && configTab}
        {dialog}
      </div>
    </ChatContext.Provider>
  )
}

export default AIAgentRunMobile

AIAgentRunMobile.displayName = "AIAgentRunMobile"
