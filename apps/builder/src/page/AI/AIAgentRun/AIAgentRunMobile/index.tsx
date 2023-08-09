import { motion } from "framer-motion"
import { FC, useCallback, useState } from "react"
import { Controller, useForm, useFormState } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useLoaderData } from "react-router-dom"
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
import { Avatar } from "@/illa-public-component/Avatar"
import { CodeEditor } from "@/illa-public-component/CodeMirror"
import { RecordEditor } from "@/illa-public-market-component/RecordEditor"
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
  SenderType,
} from "@/redux/aiAgent/aiAgentState"
import { CollaboratorsInfo } from "@/redux/currentApp/collaborators/collaboratorsState"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
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
  const { agent, marketplaceInfo } = useLoaderData() as {
    agent: Agent
    marketplaceInfo: MarketAiAgent | undefined
  }

  const { control, handleSubmit, getValues } = useForm<Agent>({
    mode: "onSubmit",
    defaultValues: agent,
  })

  const { isDirty, isValid } = useFormState({
    control,
  })

  const message = useMessage()

  // page state
  const [isRunning, setIsRunning] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  // data state
  const [inRoomUsers, setInRoomUsers] = useState<CollaboratorsInfo[]>([])
  const [isReceiving, setIsReceiving] = useState(false)

  const { t } = useTranslation()

  const [currentSelectTab, setCurrentSelectTab] = useState<"config" | "run">(
    "config",
  )

  const updateLocalIcon = useCallback(
    (icon: string, aiAgentID?: string) => {
      const updateRoomUsers = [...inRoomUsers]
      let index = -1
      if (aiAgentID === undefined || aiAgentID === "") {
        index = inRoomUsers.findIndex(
          (user) => user.role === SenderType.ANONYMOUS_AGENT,
        )
      } else {
        index = inRoomUsers.findIndex((user) => user.id === aiAgentID)
      }
      if (index != -1) {
        updateRoomUsers[index].avatar = icon
        setInRoomUsers(updateRoomUsers)
      }
    },
    [inRoomUsers],
  )

  const updateLocalName = useCallback(
    (name: string, aiAgentID?: string) => {
      const updateRoomUsers = [...inRoomUsers]
      let index = -1
      if (aiAgentID === undefined || aiAgentID === "") {
        index = inRoomUsers.findIndex(
          (user) => user.role === SenderType.ANONYMOUS_AGENT,
        )
      } else {
        index = inRoomUsers.findIndex((user) => user.id === aiAgentID)
      }
      if (index != -1) {
        updateRoomUsers[index].nickname = name
        setInRoomUsers(updateRoomUsers)
      }
    },
    [inRoomUsers],
  )

  const { sendMessage, generationMessage, chatMessages, reconnect, connect } =
    useAgentConnect({
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
            modelConfig: getValues("modelConfig"),
            model: getValues("model"),
            agentType: getValues("agentType"),
          } as ChatSendRequestPayload,
          TextSignal.RUN,
          getValues("agentType"),
          false,
        )
      },
      onUpdateRoomUsers(roomUsers: CollaboratorsInfo[]): void {
        setInRoomUsers(roomUsers)
        updateLocalIcon(getValues("icon"))
        updateLocalName(getValues("name"))
      },
    })

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
                  fillOnly={true}
                  withoutCodeMirror
                  records={field.value}
                  valueInputType={VALIDATION_TYPES.ARRAY}
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
                  variables: [],
                  modelConfig: getValues("modelConfig"),
                  model: getValues("model"),
                  agentType: getValues("agentType"),
                } as ChatSendRequestPayload,
                TextSignal.RUN,
                agentType,
                true,
                message,
              )
            }}
            onCancelReceiving={() => {
              sendMessage(
                {} as ChatSendRequestPayload,
                TextSignal.STOP_ALL,
                field.value,
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
      <form
        onSubmit={handleSubmit(async (data) => {
          isRunning
            ? await reconnect(data.aiAgentID, data.agentType)
            : await connect(data.aiAgentID, data.agentType)
        })}
      >
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
              <div css={shareContainerStyle}>
                <DependencyIcon fs="48px" />
              </div>
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
        </div>
      </form>
    </ChatContext.Provider>
  )
}

export default AIAgentRunMobile

AIAgentRunMobile.displayName = "AIAgentRunMobile"
