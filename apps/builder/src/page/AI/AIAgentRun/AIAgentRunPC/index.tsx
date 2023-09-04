import { Avatar } from "@illa-public/avatar"
import { CodeEditor } from "@illa-public/code-editor"
import { UpgradeIcon } from "@illa-public/icon"
import { ShareAgentPC, ShareAgentTab } from "@illa-public/invite-modal"
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
import {
  canManage,
  canManageInvite,
  canUseUpgradeFeature,
} from "@illa-public/user-role-utils"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
} from "@illa-public/user-role-utils/interface"
import { formatNumForAgent, isCloudVersion } from "@illa-public/utils"
import { FC, useState } from "react"
import { Controller, useForm, useFormState } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useAsyncValue, useNavigate } from "react-router-dom"
import { v4 } from "uuid"
import {
  Button,
  DependencyIcon,
  ForkIcon,
  PlayFillIcon,
  PreviousIcon,
  RadioGroup,
  ResetIcon,
  Select,
  StarFillIcon,
  StarOutlineIcon,
  getColor,
  useMessage,
} from "@illa-design/react"
import { TextSignal } from "@/api/ws/textSignal"
import { ReactComponent as OpenAIIcon } from "@/assets/agent/modal-openai.svg"
import {
  labelStyle,
  labelTextStyle,
  premiumContainerStyle,
} from "@/page/AI/AIAgent/style"
import AIAgentBlock from "@/page/AI/components/AIAgentBlock"
import { PreviewChat } from "@/page/AI/components/PreviewChat"
import { ChatSendRequestPayload } from "@/page/AI/components/PreviewChat/interface"
import { useAgentConnect } from "@/page/AI/components/ws/useAgentConnect"
import { CollaboratorsInfo } from "@/redux/currentApp/collaborators/collaboratorsState"
import { forkAIAgentToTeam, starAIAgent, unstarAIAgent } from "@/services/agent"
import { copyToClipboard } from "@/utils/copyToClipboard"
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
  backMenuStyle,
  backTextStyle,
  buttonContainerStyle,
  leftPanelContainerStyle,
  rightPanelContainerStyle,
} from "./style"

export const AIAgentRunPC: FC = () => {
  const { agent, marketplaceInfo } = useAsyncValue() as {
    agent: Agent
    marketplaceInfo: MarketAIAgent | undefined
  }

  const navigate = useNavigate()

  const { control, handleSubmit, getValues, reset } = useForm<Agent>({
    mode: "onSubmit",
    defaultValues: agent,
  })

  const { isDirty, isValid } = useFormState({
    control,
  })

  const currentTeamInfo = useSelector(getCurrentTeamInfo)!!
  const currentUserInfo = useSelector(getCurrentUser)

  const canInvite = canManageInvite(
    currentTeamInfo.myRole,
    currentTeamInfo.permission.allowEditorManageTeamMember,
    currentTeamInfo.permission.allowViewerManageTeamMember,
  )

  const message = useMessage()

  // page state
  const [isRunning, setIsRunning] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [shareDialogVisible, setShareDialogVisible] = useState(false)
  const [starLoading, setStarLoading] = useState(false)
  const [forkLoading, setForkLoading] = useState(false)
  const [starState, setStarState] = useState(
    marketplaceInfo?.marketplace?.isStarredByCurrentUser ?? false,
  )

  // data state
  const [inRoomUsers, setInRoomUsers] = useState<CollaboratorsInfo[]>([])
  const [isReceiving, setIsReceiving] = useState(false)
  const upgradeModal = useUpgradeModal()

  // premium dialog
  const canUseBillingFeature = canUseUpgradeFeature(
    currentTeamInfo?.myRole,
    currentTeamInfo?.totalTeamLicense?.teamLicensePurchased,
    currentTeamInfo?.totalTeamLicense?.teamLicenseAllPaid,
  )

  const teamInfo = useSelector(getCurrentTeamInfo)!!

  const { t } = useTranslation()

  const dispatch = useDispatch()

  const dialog = (
    <Controller
      control={control}
      name="publishedToMarketplace"
      render={({ field }) => (
        <>
          {shareDialogVisible && (
            <ShareAgentPC
              title={t(
                "user_management.modal.social_media.default_text.agent",
                {
                  agentName: agent.name,
                },
              )}
              redirectURL={`${import.meta.env.ILLA_BUILDER_URL}/${
                teamInfo.identifier
              }/ai-agent/${agent.aiAgentID}/run`}
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
            />
          )}
        </>
      )}
    />
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

  const menu = (
    <Controller
      control={control}
      name="publishedToMarketplace"
      render={({ field }) => (
        <div css={agentMenuContainerStyle}>
          {(canInvite || field.value) && (
            <Button
              colorScheme="grayBlue"
              leftIcon={<DependencyIcon />}
              onClick={() => {
                if (isCloudVersion && !canUseBillingFeature && !field.value) {
                  upgradeModal({
                    modalType: "upgrade",
                  })
                  return
                }
                setShareDialogVisible(true)
              }}
            >
              {t("share")}
            </Button>
          )}
          {field.value && (
            <Button
              ml="8px"
              colorScheme="grayBlue"
              onClick={async () => {
                setStarLoading(true)
                try {
                  if (starState) {
                    await unstarAIAgent(agent.aiAgentID)
                  } else {
                    await starAIAgent(agent.aiAgentID)
                  }
                  setStarState(!starState)
                } catch (e) {
                  message.error({
                    content: t("dashboard.message.star-failed"),
                  })
                } finally {
                  setStarLoading(false)
                }
              }}
              loading={starLoading}
              leftIcon={
                starState ? <StarFillIcon c="#FFBB38" /> : <StarOutlineIcon />
              }
            >
              <span>{t("marketplace.star")}</span>
              {(marketplaceInfo?.marketplace.numStars ?? 0) > 0 && (
                <span>
                  {" "}
                  {formatNumForAgent(
                    marketplaceInfo?.marketplace.numStars ?? 0,
                  )}
                </span>
              )}
            </Button>
          )}
          {canManage(
            currentTeamInfo.myRole,
            ATTRIBUTE_GROUP.AGENT,
            ACTION_MANAGE.CREATE_AGENT,
          ) &&
            field.value && (
              <Button
                ml="8px"
                colorScheme="grayBlue"
                loading={forkLoading}
                leftIcon={<ForkIcon />}
                onClick={async () => {
                  setForkLoading(true)
                  try {
                    const newAgent = await forkAIAgentToTeam(agent.aiAgentID)
                    navigate(
                      `/${teamInfo.identifier}/ai-agent/${newAgent.data.aiAgentID}`,
                    )
                  } catch (e) {
                    message.error({
                      content: t("dashboard.message.fork-failed"),
                    })
                  } finally {
                    setForkLoading(false)
                  }
                }}
              >
                <span>{t("marketplace.fork")}</span>
                {(marketplaceInfo?.marketplace.numForks ?? 0) > 0 && (
                  <span>
                    {" "}
                    {formatNumForAgent(
                      marketplaceInfo?.marketplace.numForks ?? 0,
                    )}
                  </span>
                )}
              </Button>
            )}
        </div>
      )}
    />
  )

  return (
    <ChatContext.Provider value={{ inRoomUsers }}>
      <div css={aiAgentContainerStyle}>
        <div css={leftPanelContainerStyle}>
          <div css={agentTopContainerStyle}>
            <div
              css={backMenuStyle}
              onClick={() => {
                navigate(-1)
              }}
            >
              <PreviousIcon fs="16px" />
              <div css={backTextStyle}>{t("back")}</div>
            </div>
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
                  <Avatar css={agentTeamAvatarStyle} avatarUrl={field.value} />
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
                    value={field.value}
                    colorScheme={getColor("grayBlue", "02")}
                    w="100%"
                    type="button"
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
                      field.onChange(value)
                    }}
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
                            {!canUseBillingFeature && (
                              <div css={premiumContainerStyle}>
                                <UpgradeIcon />
                                <div style={{ marginLeft: 4 }}>Premium</div>
                              </div>
                            )}
                          </div>
                        ),
                        value: AI_AGENT_MODEL.GPT_3_5_TURBO_16K,
                      },
                      {
                        label: (
                          <div css={labelStyle}>
                            <OpenAIIcon />
                            <span css={labelTextStyle}>GPT-4</span>
                            {!canUseBillingFeature && (
                              <div css={premiumContainerStyle}>
                                <UpgradeIcon />
                                <div style={{ marginLeft: 4 }}>Premium</div>
                              </div>
                            )}
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
                size="large"
                flex="1"
                disabled={!isValid}
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
        <Controller
          name="agentType"
          control={control}
          shouldUnregister={false}
          render={({ field }) => (
            <div css={rightPanelContainerStyle}>
              <PreviewChat
                isRunning={isRunning}
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
                      actionID: getValues("aiAgentID"),
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
      </div>
      {dialog}
    </ChatContext.Provider>
  )
}

export default AIAgentRunPC

AIAgentRunPC.displayName = "AIAgentRunPC"
