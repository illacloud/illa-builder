import { Avatar } from "@illa-public/avatar"
import { CodeEditor } from "@illa-public/code-editor"
import { ShareAgentMobile, ShareAgentTab } from "@illa-public/invite-modal"
import {
  AI_AGENT_MODEL,
  AI_AGENT_TYPE,
  Agent,
  MarketAIAgent,
} from "@illa-public/market-agent/MarketAgentCard/interface"
import { RecordEditor } from "@illa-public/record-editor"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import {
  USER_ROLE,
  getCurrentTeamInfo,
  getCurrentUser,
  teamActions,
} from "@illa-public/user-data"
import { canManage, canUseUpgradeFeature } from "@illa-public/user-role-utils"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
} from "@illa-public/user-role-utils/interface"
import { formatNumForAgent } from "@illa-public/utils"
import { motion } from "framer-motion"
import { FC, useState } from "react"
import { Controller, useForm, useFormState } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useAsyncValue } from "react-router-dom"
import { v4 } from "uuid"
import {
  Button,
  DependencyIcon,
  ForkIcon,
  LoadingIcon,
  PlayFillIcon,
  PreviousIcon,
  ResetIcon,
  Select,
  StarFillIcon,
  StarOutlineIcon,
  getColor,
  useMessage,
} from "@illa-design/react"
import { TextSignal } from "@/api/ws/textSignal"
import { ReactComponent as OpenAIIcon } from "@/assets/agent/modal-openai.svg"
import { labelStyle, labelTextStyle } from "@/page/AI/AIAgent/style"
import { buttonContainerStyle } from "@/page/AI/AIAgentRun/AIAgentRunPC/style"
import AIAgentBlock from "@/page/AI/components/AIAgentBlock"
import { PreviewChat } from "@/page/AI/components/PreviewChat"
import { ChatSendRequestPayload } from "@/page/AI/components/PreviewChat/interface"
import { useAgentConnect } from "@/page/AI/components/ws/useAgentConnect"
import { CollaboratorsInfo } from "@/redux/currentApp/collaborators/collaboratorsState"
import { forkAIAgentToTeam, starAIAgent, unstarAIAgent } from "@/services/agent"
import { copyToClipboard } from "@/utils/copyToClipboard"
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
  menuContainerStyle,
  previewChatContainer,
  shareContainerStyle,
  tabContainerStyle,
  tabStyle,
  tabsContainerStyle,
} from "./style"

export const AIAgentRunMobile: FC = () => {
  const { agent, marketplaceInfo } = useAsyncValue() as {
    agent: Agent
    marketplaceInfo: MarketAIAgent | undefined
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
  const [starState, setStarState] = useState(
    marketplaceInfo?.marketplace?.isStarredByCurrentUser ?? false,
  )
  const [forkLoading, setForkLoading] = useState(false)
  // data state
  const [inRoomUsers, setInRoomUsers] = useState<CollaboratorsInfo[]>([])
  const [isReceiving, setIsReceiving] = useState(false)
  const currentUserInfo = useSelector(getCurrentUser)

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

  const teamInfo = useSelector(getCurrentTeamInfo)!!
  const dispatch = useDispatch()

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
            actionID: getValues("aiAgentID"),
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

  const dialog = (
    <Controller
      control={control}
      name="publishedToMarketplace"
      render={({ field }) => (
        <>
          {shareDialogVisible && (
            <ShareAgentMobile
              title={t(
                "user_management.modal.social_media.default_text.agent",
                {
                  agentName: agent.name,
                },
              )}
              redirectURL={`${import.meta.env.ILLA_BUILDER_URL}/${
                marketplaceInfo?.marketplace.contributorTeam.teamIdentify
              }/ai-agent/${agent.aiAgentID}/run`}
              onClose={() => {
                setShareDialogVisible(false)
              }}
              canInvite={canManage(
                currentTeamInfo.myRole,
                ATTRIBUTE_GROUP.AGENT,
                ACTION_MANAGE.CREATE_AGENT,
              )}
              defaultTab={ShareAgentTab.SHARE_WITH_TEAM}
              defaultInviteUserRole={USER_ROLE.VIEWER}
              teamID={teamInfo.id}
              currentUserRole={teamInfo.myRole}
              defaultBalance={teamInfo.currentTeamLicense.balance}
              defaultAllowInviteLink={teamInfo.permission.inviteLinkEnabled}
              onInviteLinkStateChange={(enableInviteLink) => {
                dispatch(
                  teamActions.updateTeamMemberPermissionReducer({
                    teamID: teamInfo.id,
                    newPermission: {
                      ...teamInfo.permission,
                      inviteLinkEnabled: enableInviteLink,
                    },
                  }),
                )
              }}
              agentID={agent.aiAgentID}
              defaultAgentContributed={field.value}
              onAgentContributed={(isAgentContributed) => {
                field.onChange(isAgentContributed)
              }}
              onCopyInviteLink={(link: string) => {
                copyToClipboard(
                  t("user_management.modal.custom_copy_text_agent_invite", {
                    userName: currentUserInfo.nickname,
                    teamName: teamInfo.name,
                    inviteLink: link,
                  }),
                )
              }}
              onCopyAgentMarketLink={(link: string) => {
                copyToClipboard(
                  t("user_management.modal.contribute.default_text.agent", {
                    agentName: agent.name,
                    agentLink: link,
                  }),
                )
              }}
              userRoleForThisAgent={
                currentTeamInfo.id === agent.teamID
                  ? currentTeamInfo.myRole
                  : USER_ROLE.CUSTOM
              }
              ownerTeamID={agent.teamID}
              onBalanceChange={(balance) => {
                dispatch(
                  teamActions.updateTeamMemberSubscribeReducer({
                    teamID: teamInfo.id,
                    subscribeInfo: {
                      ...teamInfo.currentTeamLicense,
                      balance: balance,
                    },
                  }),
                )
              }}
            />
          )}
        </>
      )}
    />
  )

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
          setCurrentSelectTab("run")
          isRunning
            ? await reconnect(data.aiAgentID, data.agentType)
            : await connect(data.aiAgentID, data.agentType)
        })}
      >
        <div css={buttonContainerStyle}>
          <Button
            flex="1"
            disabled={!isValid}
            size="large"
            loading={isConnecting}
            ml="8px"
            colorScheme={getColor("grayBlue", "02")}
            leftIcon={isRunning ? <ResetIcon /> : <PlayFillIcon />}
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
            isRunning={isRunning}
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
          <Controller
            name="publishedToMarketplace"
            control={control}
            render={({ field }) => {
              return (
                <div css={menuContainerStyle}>
                  <div
                    css={shareContainerStyle}
                    onClick={() => {
                      window.history.back()
                    }}
                  >
                    <PreviousIcon fs="24px" />
                  </div>
                  <div
                    style={{
                      flexGrow: 1,
                    }}
                  />
                  {field.value &&
                    canManage(
                      currentTeamInfo.myRole,
                      ATTRIBUTE_GROUP.AGENT,
                      ACTION_MANAGE.CREATE_AGENT,
                    ) && (
                      <div
                        css={shareContainerStyle}
                        onClick={async () => {
                          setForkLoading(true)
                          try {
                            await forkAIAgentToTeam(agent.aiAgentID)
                            message.success({
                              content: t("dashboard.message.mobile-fork-suc"),
                            })
                          } catch (e) {
                            message.error({
                              content: t("dashboard.message.fork-failed"),
                            })
                          } finally {
                            setForkLoading(false)
                          }
                        }}
                      >
                        {forkLoading ? (
                          <LoadingIcon spin={true} fs="24px" />
                        ) : (
                          <ForkIcon fs="24px" />
                        )}
                      </div>
                    )}
                  {field.value && (
                    <div
                      css={shareContainerStyle}
                      onClick={async () => {
                        const currentState = starState
                        setStarState(!starState)
                        try {
                          if (starState) {
                            await unstarAIAgent(agent.aiAgentID)
                          } else {
                            await starAIAgent(agent.aiAgentID)
                          }
                        } catch (e) {
                          setStarState(currentState)
                          message.error({
                            content: t("dashboard.message.star-failed"),
                          })
                        }
                      }}
                    >
                      {starState ? (
                        <StarFillIcon c="#FFBB38" fs="24px" />
                      ) : (
                        <StarOutlineIcon fs="24px" />
                      )}
                    </div>
                  )}
                  <div
                    css={shareContainerStyle}
                    onClick={() => {
                      setShareDialogVisible(true)
                    }}
                  >
                    <DependencyIcon fs="24px" />
                  </div>
                </div>
              )
            }}
          />
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
                    {(marketplaceInfo?.marketplace.numStars ?? 0) > 0 && (
                      <span>
                        {t("marketplace.star", {
                          operationNum: formatNumForAgent(
                            marketplaceInfo?.marketplace.numStars ?? 0,
                          ),
                        })}{" "}
                      </span>
                    )}
                    {(marketplaceInfo?.marketplace.numStars ?? 0) > 0 &&
                      (marketplaceInfo?.marketplace.numForks ?? 0) > 0 &&
                      "·"}
                    {(marketplaceInfo?.marketplace.numForks ?? 0) > 0 && (
                      <span>
                        {" "}
                        {t("marketplace.fork", {
                          operationNum: formatNumForAgent(
                            marketplaceInfo?.marketplace.numForks ?? 0,
                          ),
                        })}
                      </span>
                    )}
                  </div>
                )}
              </div>
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
        {dialog}
      </div>
    </ChatContext.Provider>
  )
}

export default AIAgentRunMobile

AIAgentRunMobile.displayName = "AIAgentRunMobile"
