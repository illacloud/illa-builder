import { FC, useCallback, useMemo, useState } from "react"
import { Controller, useForm, useFormState } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useLoaderData } from "react-router-dom"
import { v4 } from "uuid"
import {
  Button,
  DependencyIcon,
  ForkIcon,
  RadioGroup,
  ResetIcon,
  Select,
  StarFillIcon,
  StarOutlineIcon,
  getColor,
} from "@illa-design/react"
import { TextSignal } from "@/api/ws/textSignal"
import { ReactComponent as OpenAIIcon } from "@/assets/agent/modal-openai.svg"
import { Avatar } from "@/illa-public-component/Avatar"
import { CodeEditor } from "@/illa-public-component/CodeMirror"
import { canManage } from "@/illa-public-component/UserRoleUtils"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
} from "@/illa-public-component/UserRoleUtils/interface"
import { RecordEditor } from "@/illa-public-market-component/RecordEditor"
import ShareToSocialMedia from "@/illa-public-market-component/ShareToSocialMedia"
import { labelStyle, labelTextStyle } from "@/page/AI/AIAgent/style"
import AIAgentBlock from "@/page/AI/components/AIAgentBlock"
import { PreviewChat } from "@/page/AI/components/PreviewChat"
import { useAgentConnect } from "@/page/AI/components/ws/useAgentConnect"
import AgentShareModal from "@/page/Dashboard/DashboardAiAgent/TeamAgentCard/ShareModal"
import {
  AI_AGENT_MODEL,
  AI_AGENT_TYPE,
  Agent,
  ChatSendRequestPayload,
  MarketAiAgent,
  SenderType,
} from "@/redux/aiAgent/aiAgentState"
import { CollaboratorsInfo } from "@/redux/currentApp/collaborators/collaboratorsState"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { ChatContext } from "../../components/ChatContext"
import {
  agentAvatarStyle,
  agentControlContainerStyle,
  agentDescStyle,
  agentMenuContainerStyle,
  agentNicknameStyle,
  agentTeamAvatarStyle,
  agentTeamInfoContainerStyle,
  agentTeamNameStyle,
  agentTitleContainerStyle,
  agentTopContainerStyle,
  aiAgentContainerStyle,
  buttonContainerStyle,
  leftPanelContainerStyle,
  rightPanelContainerStyle,
} from "./style"

export const AIAgentRunPC: FC = () => {
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

  const currentTeamInfo = useSelector(getCurrentTeamInfo)!!

  // page state
  const [isRunning, setIsRunning] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [shareDialogVisible, setShareDialogVisible] = useState(false)
  // data state
  const [inRoomUsers, setInRoomUsers] = useState<CollaboratorsInfo[]>([])
  const [isReceiving, setIsReceiving] = useState(false)

  const { t } = useTranslation()

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
              return (
                <AgentShareModal
                  aiAgentID={agent.aiAgentID}
                  aiAgentName={agent.name}
                  publishedToMarketplace={field.value}
                  onContributed={(contributed) => {
                    field.onChange(contributed)
                  }}
                  visible={shareDialogVisible}
                  onCancel={() => {
                    setShareDialogVisible(false)
                  }}
                />
              )
            } else {
              return (
                <ShareToSocialMedia
                  agentID={agent.aiAgentID}
                  agentName={agent.name}
                  visible={shareDialogVisible}
                  onCancel={() => {
                    setShareDialogVisible(false)
                  }}
                />
              )
            }
          } else {
            if (
              canManage(
                currentTeamInfo.myRole,
                ATTRIBUTE_GROUP.AGENT,
                ACTION_MANAGE.FORK_AGENT,
              )
            ) {
              return (
                <AgentShareModal
                  aiAgentID={agent.aiAgentID}
                  aiAgentName={agent.name}
                  publishedToMarketplace={field.value}
                  visible={shareDialogVisible}
                  onCancel={() => {
                    setShareDialogVisible(false)
                  }}
                />
              )
            } else {
              return <></>
            }
          }
        }}
      />
    )
  }, [
    agent.aiAgentID,
    agent.name,
    control,
    currentTeamInfo.myRole,
    shareDialogVisible,
  ])

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
      onStartRunning: () => {},
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

  const menu = useMemo(() => {
    if (agent.publishedToMarketplace) {
      return (
        <div css={agentMenuContainerStyle}>
          <Button
            colorScheme="grayBlue"
            leftIcon={<DependencyIcon />}
            onClick={() => {
              setShareDialogVisible(true)
            }}
          >
            {t("share")}
          </Button>
          <Button
            ml="8px"
            colorScheme="grayBlue"
            leftIcon={
              marketplaceInfo?.marketplace.isStarredByCurrentUser ? (
                <StarFillIcon c="#FFBB38" />
              ) : (
                <StarOutlineIcon />
              )
            }
          >
            {t("marketplace.star", {
              operationNum: marketplaceInfo?.marketplace.numStars,
            })}
          </Button>
          {canManage(
            currentTeamInfo.myRole,
            ATTRIBUTE_GROUP.AGENT,
            ACTION_MANAGE.FORK_AGENT,
          ) && (
            <Button ml="8px" colorScheme="grayBlue" leftIcon={<ForkIcon />}>
              {t("marketplace.fork", {
                operationNum: marketplaceInfo?.marketplace.numForks,
              })}
            </Button>
          )}
        </div>
      )
    } else {
      return (
        canManage(
          currentTeamInfo.myRole,
          ATTRIBUTE_GROUP.AGENT,
          ACTION_MANAGE.FORK_AGENT,
        ) && (
          <div css={agentMenuContainerStyle}>
            <Button
              colorScheme="grayBlue"
              leftIcon={<DependencyIcon />}
              onClick={() => {
                setShareDialogVisible(true)
              }}
            >
              {t("share")}
            </Button>
          </div>
        )
      )
    }
  }, [
    agent.publishedToMarketplace,
    currentTeamInfo.myRole,
    marketplaceInfo?.marketplace.isStarredByCurrentUser,
    marketplaceInfo?.marketplace.numForks,
    marketplaceInfo?.marketplace.numStars,
    t,
  ])

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
          <div css={leftPanelContainerStyle}>
            <div css={agentTopContainerStyle}>
              <div css={agentTitleContainerStyle}>
                <Controller
                  control={control}
                  name="icon"
                  render={({ field }) => (
                    <Avatar css={agentAvatarStyle} avatarUrl={field.value} />
                  )}
                />
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <div css={agentNicknameStyle}>{field.value}</div>
                  )}
                />
              </div>
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <div css={agentDescStyle}>{field.value}</div>
                )}
              />
              <div css={agentTeamInfoContainerStyle}>
                <Controller
                  control={control}
                  name="teamIcon"
                  render={({ field }) => (
                    <Avatar
                      css={agentTeamAvatarStyle}
                      avatarUrl={field.value}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="teamName"
                  render={({ field }) => (
                    <div css={agentTeamNameStyle}>{field.value}</div>
                  )}
                />
              </div>
              {menu}
            </div>
            <div css={agentControlContainerStyle}>
              <Controller
                name="agentType"
                control={control}
                shouldUnregister={false}
                render={({ field }) => (
                  <AIAgentBlock
                    title={t("editor.ai-agent.label.mode")}
                    tips={t("editor.ai-agent.tips.mode")}
                  >
                    <RadioGroup
                      {...field}
                      colorScheme={"techPurple"}
                      w="100%"
                      type="button"
                      forceEqualWidth={true}
                      options={[
                        {
                          value: AI_AGENT_TYPE.CHAT,
                          label: "Chat",
                        },
                        {
                          value: AI_AGENT_TYPE.TEXT_GENERATION,
                          label: "Text Generation",
                        },
                      ]}
                    />
                  </AIAgentBlock>
                )}
              />
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
                    value.every(
                      (param) => param.key !== "" && param.value !== "",
                    ) ||
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
                  <AIAgentBlock title={t("editor.ai-agent.label.model")}>
                    <Select
                      {...field}
                      readOnly={true}
                      colorScheme={"techPurple"}
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
          <Controller
            name="agentType"
            control={control}
            shouldUnregister={false}
            render={({ field }) => (
              <div css={rightPanelContainerStyle}>
                <PreviewChat
                  hasCreated={true}
                  isMobile={false}
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
        </div>
        {dialog}
      </form>
    </ChatContext.Provider>
  )
}

export default AIAgentRunPC

AIAgentRunPC.displayName = "AIAgentRunPC"
