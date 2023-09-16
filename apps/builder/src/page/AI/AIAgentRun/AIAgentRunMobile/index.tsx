import { Avatar } from "@illa-public/avatar"
import { CodeEditor } from "@illa-public/code-editor"
import { ShareAgentMobile, ShareAgentTab } from "@illa-public/invite-modal"
import {
  AI_AGENT_TYPE,
  Agent,
  MarketAIAgent,
  getAIAgentMarketplaceInfo,
  getLLM,
  isPremiumModel,
} from "@illa-public/market-agent"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackProvider,
} from "@illa-public/mixpanel-utils"
import { RecordEditor } from "@illa-public/record-editor"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import {
  USER_ROLE,
  getCurrentTeamInfo,
  getCurrentUser,
  getPlanUtils,
  teamActions,
} from "@illa-public/user-data"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  canManage,
  canManageInvite,
  canUseUpgradeFeature,
  openShareAgentModal,
  showShareAgentModal,
} from "@illa-public/user-role-utils"
import { formatNumForAgent } from "@illa-public/utils"
import { motion } from "framer-motion"
import { FC, useState } from "react"
import { Controller, useForm, useFormState } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
  useAsyncValue,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom"
import { v4 } from "uuid"
import {
  Button,
  DependencyIcon,
  ForkIcon,
  LoadingIcon,
  PlayFillIcon,
  PreviousIcon,
  RadioGroup,
  ResetIcon,
  StarFillIcon,
  StarOutlineIcon,
  getColor,
  useMessage,
} from "@illa-design/react"
import { TextSignal } from "@/api/ws/textSignal"
import AIAgentBlock from "@/page/AI/components/AIAgentBlock"
import { PreviewChat } from "@/page/AI/components/PreviewChat"
import { ChatSendRequestPayload } from "@/page/AI/components/PreviewChat/interface"
import { useAgentConnect } from "@/page/AI/components/ws/useAgentConnect"
import { CollaboratorsInfo } from "@/redux/currentApp/collaborators/collaboratorsState"
import { forkAIAgentToTeam, starAIAgent, unstarAIAgent } from "@/services/agent"
import { copyToClipboard } from "@/utils/copyToClipboard"
import { track } from "@/utils/mixpanelHelper"
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
  buttonContainerStyle,
  configContainerStyle,
  dividerStyle,
  headerContainerStyle,
  headerInfoStyle,
  labelLogoStyle,
  labelStyle,
  lineStyle,
  menuContainerStyle,
  previewChatContainer,
  readOnlyTextStyle,
  shareContainerStyle,
  tabContainerStyle,
  tabStyle,
  tabsContainerStyle,
} from "./style"

export const AIAgentRunMobile: FC = () => {
  const { agent, marketplace } = useAsyncValue() as {
    agent: Agent
    marketplace: MarketAIAgent | undefined
  }
  const navigate = useNavigate()

  const [currentMarketplaceInfo, setCurrentMarketplaceInfo] = useState<
    MarketAIAgent | undefined
  >(marketplace)

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
    currentMarketplaceInfo?.marketplace?.isStarredByCurrentUser ?? false,
  )
  const [forkLoading, setForkLoading] = useState(false)
  // data state
  const [inRoomUsers, setInRoomUsers] = useState<CollaboratorsInfo[]>([])
  const [isReceiving, setIsReceiving] = useState(false)
  const currentUserInfo = useSelector(getCurrentUser)
  const [starNum, setStarNum] = useState(
    currentMarketplaceInfo?.marketplace.numStars ?? 0,
  )

  const { ownerTeamIdentifier } = useParams()
  const [searchParams] = useSearchParams()

  const { t } = useTranslation()

  const [currentSelectTab, setCurrentSelectTab] = useState<"config" | "run">(
    "config",
  )

  // premium dialog
  const canUseBillingFeature = canUseUpgradeFeature(
    currentTeamInfo?.myRole,
    getPlanUtils(currentTeamInfo),
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
        <MixpanelTrackProvider
          basicTrack={track}
          pageName={ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_RUN}
        >
          {shareDialogVisible && (
            <ShareAgentMobile
              canUseBillingFeature={canUseUpgradeFeature(
                teamInfo.myRole,
                getPlanUtils(teamInfo),
                teamInfo.totalTeamLicense.teamLicensePurchased,
                teamInfo.totalTeamLicense.teamLicenseAllPaid,
              )}
              title={t(
                "user_management.modal.social_media.default_text.agent",
                {
                  agentName: agent.name,
                },
              )}
              redirectURL={`${
                import.meta.env.ILLA_BUILDER_URL
              }/${ownerTeamIdentifier}/ai-agent/${
                agent.aiAgentID
              }/run?myTeamIdentifier=${searchParams.get("myTeamIdentifier")}`}
              onClose={() => {
                setShareDialogVisible(false)
              }}
              canInvite={canManageInvite(
                teamInfo.myRole,
                teamInfo.permission.allowEditorManageTeamMember,
                teamInfo.permission.allowViewerManageTeamMember,
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
              onAgentContributed={async (isAgentContributed) => {
                if (isAgentContributed) {
                  const resp = await getAIAgentMarketplaceInfo(agent.aiAgentID)
                  setCurrentMarketplaceInfo(resp.data)
                }
                field.onChange(isAgentContributed)
              }}
              onCopyInviteLink={(link: string) => {
                track(
                  ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                  ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_RUN,
                  {
                    element: "share_modal_copy_team",
                    parameter5: agent.aiAgentID,
                  },
                )
                copyToClipboard(
                  t("user_management.modal.custom_copy_text_agent_invite", {
                    userName: currentUserInfo.nickname,
                    teamName: teamInfo.name,
                    inviteLink: link,
                  }),
                )
              }}
              onCopyAgentMarketLink={(link: string) => {
                track(
                  ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                  ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_RUN,
                  {
                    element: "share_modal_link",
                    parameter5: agent.aiAgentID,
                  },
                )
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
                  : USER_ROLE.GUEST
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
              teamPlan={getPlanUtils(currentTeamInfo)}
              onShare={(platform) => {
                track(
                  ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                  ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_RUN,
                  {
                    element: "share_modal_social_media",
                    parameter4: platform,
                    parameter5: agent.aiAgentID,
                  },
                )
              }}
            />
          )}
        </MixpanelTrackProvider>
      )}
    />
  )

  const configTab = (
    <div css={configContainerStyle}>
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
                value={field.value}
                colorScheme={getColor("grayBlue", "02")}
                type="button"
                w="100%"
                disp="flex"
                forceEqualWidth={true}
                options={[
                  {
                    value: AI_AGENT_TYPE.CHAT,
                    label: t("editor.ai-agent.option.mode.chat"),
                  },
                  {
                    value: AI_AGENT_TYPE.TEXT_GENERATION,
                    label: t("editor.ai-agent.option.mode.text"),
                  },
                ]}
                onChange={(value) => {
                  if (isReceiving || isConnecting) {
                    message.info({
                      content: t("editor.ai-agent.message.generating"),
                    })
                    return
                  }
                  track(
                    ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                    ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_RUN,
                    {
                      element: "mode_radio_button",
                      parameter1: value,
                      parameter5: agent.aiAgentID,
                    },
                  )
                  field.onChange(value)
                }}
              />
            </AIAgentBlock>
          )}
        />
        <Controller
          name="prompt"
          control={control}
          shouldUnregister={false}
          render={({ field: promptField }) => (
            <Controller
              name="variables"
              control={control}
              render={({ field: variables }) => (
                <AIAgentBlock title={"Prompt"}>
                  <CodeEditor
                    {...promptField}
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
            <AIAgentBlock title={t("editor.ai-agent.label.model")}>
              <div css={labelStyle}>
                <span css={labelLogoStyle}>{getLLM(field.value)?.logo}</span>
                <span css={readOnlyTextStyle}>{getLLM(field.value)?.name}</span>
              </div>
            </AIAgentBlock>
          )}
        />
        <Controller
          name={"modelConfig.maxTokens"}
          control={control}
          shouldUnregister={false}
          render={({ field }) => (
            <AIAgentBlock
              title={"Max Token"}
              tips={t("editor.ai-agent.tips.max-token")}
            >
              <div css={readOnlyTextStyle}>{field.value}</div>
            </AIAgentBlock>
          )}
        />
        <Controller
          name="modelConfig.temperature"
          control={control}
          shouldUnregister={false}
          render={({ field }) => (
            <AIAgentBlock
              title={"Temperature"}
              tips={t("editor.ai-agent.tips.temperature")}
            >
              <div css={readOnlyTextStyle}>{field.value}</div>
            </AIAgentBlock>
          )}
        />
      </div>
      <form
        onSubmit={handleSubmit(async (data) => {
          if (isPremiumModel(data.model) && !canUseBillingFeature) {
            upgradeModal({
              modalType: "agent",
            })
            return
          }
          reset(data)
          setCurrentSelectTab("run")
          track(
            ILLA_MIXPANEL_EVENT_TYPE.CLICK,
            ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_RUN,
            {
              element: isRunning ? "restart" : "start",
              parameter1: data.agentType === 1 ? "chat" : "text",
              parameter5: agent.aiAgentID,
            },
          )
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
            editState="RUN"
            showShareDialog={false}
            showContributeDialog={false}
            isRunning={isRunning}
            hasCreated={true}
            isMobile={true}
            agentType={field.value}
            chatMessages={chatMessages}
            generationMessage={generationMessage}
            isReceiving={isReceiving}
            blockInput={!isRunning || isDirty}
            onSendMessage={(message, agentType: AI_AGENT_TYPE) => {
              track(
                ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_RUN,
                {
                  element: "send",
                  parameter5: agent.aiAgentID,
                },
              )
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
                      navigate(-1)
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
                      ATTRIBUTE_GROUP.AI_AGENT,
                      getPlanUtils(currentTeamInfo),
                      ACTION_MANAGE.FORK_AI_AGENT,
                    ) && (
                      <div
                        css={shareContainerStyle}
                        onClick={async () => {
                          track(
                            ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                            ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_RUN,
                            {
                              element: "fork",
                              parameter5: agent.aiAgentID,
                            },
                          )
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
                        track(
                          ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                          ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_RUN,
                          {
                            element: "star",
                            parameter5: agent.aiAgentID,
                          },
                        )
                        const currentState = starState
                        setStarState(!starState)
                        try {
                          if (starState) {
                            await unstarAIAgent(agent.aiAgentID)
                            if (starNum > 0) {
                              setStarNum(starNum - 1)
                            }
                          } else {
                            await starAIAgent(agent.aiAgentID)
                            setStarNum(starNum + 1)
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
                  {showShareAgentModal(
                    teamInfo,
                    agent.teamID === teamInfo.id
                      ? teamInfo.myRole
                      : USER_ROLE.GUEST,
                    field.value,
                  ) && (
                    <div
                      css={shareContainerStyle}
                      onClick={() => {
                        track(
                          ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                          ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_RUN,
                          {
                            element: "share",
                            parameter5: agent.aiAgentID,
                          },
                        )
                        if (
                          !openShareAgentModal(
                            teamInfo,
                            currentTeamInfo.id === agent.teamID
                              ? currentTeamInfo.myRole
                              : USER_ROLE.GUEST,
                            field.value,
                          )
                        ) {
                          upgradeModal({
                            modalType: "upgrade",
                          })
                          return
                        }
                        setShareDialogVisible(true)
                        track(
                          ILLA_MIXPANEL_EVENT_TYPE.SHOW,
                          ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_RUN,
                          {
                            element: "share_modal",
                            parameter5: agent.aiAgentID,
                          },
                        )
                      }}
                    >
                      <DependencyIcon fs="24px" />
                    </div>
                  )}
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
                    {starNum > 0 && (
                      <span>
                        {t("marketplace.star")}
                        {formatNumForAgent(starNum)}
                      </span>
                    )}
                    {starNum > 0 &&
                      (currentMarketplaceInfo?.marketplace.numForks ?? 0) >
                        0 && <span>&nbsp;·&nbsp;</span>}

                    {(currentMarketplaceInfo?.marketplace.numForks ?? 0) >
                      0 && (
                      <span>
                        {t("marketplace.fork")}
                        {formatNumForAgent(
                          currentMarketplaceInfo?.marketplace.numForks ?? 0,
                        )}
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
