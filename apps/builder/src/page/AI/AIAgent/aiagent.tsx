import { CodeEditor } from "@illa-public/code-editor"
import { AvatarUpload } from "@illa-public/cropper"
import { UpgradeIcon } from "@illa-public/icon"
import {
  ContributeAgentPC,
  HASHTAG_REQUEST_TYPE,
  ShareAgentPC,
  ShareAgentTab,
} from "@illa-public/invite-modal"
import {
  AI_AGENT_MODEL,
  AI_AGENT_TYPE,
  Agent,
  freeModelList,
  getLLM,
  isPremiumModel,
  premiumModelList,
} from "@illa-public/market-agent"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackProvider,
} from "@illa-public/mixpanel-utils"
import { RecordEditor } from "@illa-public/record-editor"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import {
  MemberInfo,
  USER_ROLE,
  USER_STATUS,
  getCurrentTeamInfo,
  getCurrentUser,
  getPlanUtils,
  teamActions,
} from "@illa-public/user-data"
import {
  canManageInvite,
  canUseUpgradeFeature,
  openShareAgentModal,
  openShareAgentModalOnlyForShare,
  showShareAgentModal,
  showShareAgentModalOnlyForShare,
} from "@illa-public/user-role-utils"
import {
  getAgentPublicLink,
  getAuthToken,
  getILLABuilderURL,
  getILLACloudURL,
  sendTagEvent,
} from "@illa-public/utils"
import { isEqual } from "lodash"
import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { Controller, useForm, useFormState, useWatch } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useAsyncValue, useParams } from "react-router-dom"
import { v4 } from "uuid"
import {
  Button,
  Divider,
  DocsIcon,
  DownIcon,
  Image,
  Input,
  InputNumber,
  Link,
  PlayFillIcon,
  PlusIcon,
  PreviousIcon,
  RadioGroup,
  ResetIcon,
  Select,
  Slider,
  TextArea,
  UpIcon,
  getColor,
  useMessage,
} from "@illa-design/react"
import { TextSignal } from "@/api/ws/textSignal"
import { ReactComponent as AIIcon } from "@/assets/agent/ai.svg"
import { AIAgentBlock } from "@/page/AI/components/AIAgentBlock"
import AILoading from "@/page/AI/components/AILoading"
import { PreviewChat } from "@/page/AI/components/PreviewChat"
import { useAgentConnect } from "@/page/AI/components/ws/useAgentConnect"
import { aiAgentActions } from "@/redux/aiAgent/dashboardTeamAIAgentSlice"
import { CollaboratorsInfo } from "@/redux/currentApp/collaborators/collaboratorsState"
import {
  createAgent,
  generateDescription,
  generateIcon,
  putAgentDetail,
  uploadAgentIcon,
} from "@/services/agent"
import { copyToClipboard } from "@/utils/copyToClipboard"
import { track } from "@/utils/mixpanelHelper"
import { ChatContext } from "../components/ChatContext"
import { ErrorText } from "../components/ErrorText"
import {
  ChatSendRequestPayload,
  SenderType,
} from "../components/PreviewChat/interface"
import { SCROLL_ID } from "./interface"
import {
  advancedSettingHeaderStyle,
  advancedSettingStyle,
  aiAgentContainerStyle,
  backTextStyle,
  buttonContainerStyle,
  codeEditorErrorStyle,
  descContainerStyle,
  descTextStyle,
  docTextContainerStyle,
  docTextStyle,
  labelLogoStyle,
  labelStyle,
  labelTextStyle,
  leftLoadingCoverStyle,
  leftPanelContainerStyle,
  leftPanelContentContainerStyle,
  leftPanelCoverContainer,
  leftPanelHeaderStyle,
  leftPanelTitleTextStyle,
  premiumContainerStyle,
  rightPanelContainerStyle,
  temperatureContainerStyle,
  temperatureStyle,
  uploadContainerStyle,
  uploadContentContainerStyle,
  uploadTextStyle,
} from "./style"
import { agentData2JSONReport } from "./utils"

export const AIAgent: FC = () => {
  const data = useAsyncValue() as {
    agent: Agent
  }

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    clearErrors,
    setError,
    trigger,
  } = useForm<Agent>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      ...data.agent,
      variables:
        data.agent.variables.length === 0
          ? [{ key: "", value: "" }]
          : data.agent.variables,
    },
  })

  const { agentID, teamIdentifier } = useParams()

  const { isSubmitting, isDirty, errors } = useFormState({
    control,
  })

  const { t } = useTranslation()

  const currentTeamInfo = useSelector(getCurrentTeamInfo)!!

  const message = useMessage()
  const upgradeModal = useUpgradeModal()

  const currentUserInfo = useSelector(getCurrentUser)

  const dispatch = useDispatch()

  // page state
  const [generateDescLoading, setGenerateDescLoading] = useState(false)
  const [generateIconLoading, setGenerateIconLoading] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [shareDialogVisible, setShareDialogVisible] = useState(false)
  const [contributedDialogVisible, setContributedDialogVisible] =
    useState(false)
  const [defaultShareTag, setDefaultShareTag] = useState<ShareAgentTab>(
    ShareAgentTab.SHARE_WITH_TEAM,
  )
  const [expanded, setExpanded] = useState(false)

  // data state
  const [inRoomUsers, setInRoomUsers] = useState<CollaboratorsInfo[]>([])
  const [isReceiving, setIsReceiving] = useState(false)
  const [lastRunAgent, setLastRunAgent] = useState<Agent | undefined>()

  // premium dialog
  const canUseBillingFeature = canUseUpgradeFeature(
    currentTeamInfo?.myRole,
    getPlanUtils(currentTeamInfo),
    currentTeamInfo?.totalTeamLicense?.teamLicensePurchased,
    currentTeamInfo?.totalTeamLicense?.teamLicenseAllPaid,
  )

  const updateLocalIcon = useCallback(
    (icon: string, newRoomUsers: CollaboratorsInfo[]) => {
      const updateRoomUsers = [...newRoomUsers]
      let index = -1
      if (getValues("aiAgentID")) {
        index = updateRoomUsers.findIndex(
          (user) => user.id === getValues("aiAgentID"),
        )
      } else {
        index = updateRoomUsers.findIndex(
          (user) => user.roomRole === SenderType.ANONYMOUS_AGENT,
        )
      }
      if (index != -1) {
        updateRoomUsers[index].avatar = icon
      }
      return updateRoomUsers
    },
    [getValues],
  )

  const updateLocalName = useCallback(
    (name: string, newRoomUsers: CollaboratorsInfo[]) => {
      const updateRoomUsers = [...newRoomUsers]
      let index = -1
      if (getValues("aiAgentID")) {
        index = updateRoomUsers.findIndex(
          (user) => user.id === getValues("aiAgentID"),
        )
      } else {
        index = updateRoomUsers.findIndex(
          (user) => user.roomRole === SenderType.ANONYMOUS_AGENT,
        )
      }
      if (index != -1) {
        updateRoomUsers[index].nickname = name
      }
      return updateRoomUsers
    },
    [getValues],
  )

  // watch dirty
  const getRunAgent = useCallback(() => {
    return {
      variables: getValues("variables"),
      modelConfig: {
        maxTokens: getValues("modelConfig.maxTokens"),
        temperature: getValues("modelConfig.temperature"),
      },
      model: getValues("model"),
      prompt: getValues("prompt"),
      agentType: getValues("agentType"),
    } as Agent
  }, [getValues])

  const fieldArray = useWatch({
    control: control,
    name: [
      "variables",
      "modelConfig.maxTokens",
      "modelConfig.temperature",
      "model",
      "prompt",
      "agentType",
    ],
  })

  const blockInputDirty = useMemo(() => {
    if (lastRunAgent === undefined) {
      return true
    }
    return (
      !isEqual(
        lastRunAgent.variables.filter((v) => v.key !== "" && v.value !== ""),
        fieldArray[0].filter((v) => v.key !== "" && v.value !== ""),
      ) ||
      !isEqual(lastRunAgent.modelConfig.maxTokens, fieldArray[1]) ||
      !isEqual(lastRunAgent.modelConfig.temperature, fieldArray[2]) ||
      !isEqual(lastRunAgent.model, fieldArray[3]) ||
      !isEqual(lastRunAgent.prompt, fieldArray[4]) ||
      !isEqual(lastRunAgent.agentType, fieldArray[5])
    )
  }, [lastRunAgent, fieldArray])

  useEffect(() => {
    const unload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ""
      }
    }
    window.addEventListener("beforeunload", unload)
    window.addEventListener("onunload", unload)
    return () => {
      window.removeEventListener("beforeunload", unload)
      window.removeEventListener("onunload", unload)
    }
  }, [isDirty])

  const { sendMessage, generationMessage, chatMessages, reconnect, connect } =
    useAgentConnect({
      onStartRunning: () => {
        setLastRunAgent(getRunAgent())
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
      onSendClean: () => {
        sendMessage(
          {} as ChatSendRequestPayload,
          TextSignal.CLEAN,
          getValues("agentType"),
          "clean",
          false,
        )
      },
      onSendPrompt: () => {
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
      onUpdateRoomUsers: (roomUsers: CollaboratorsInfo[]) => {
        let newRoomUsers = updateLocalIcon(getValues("icon"), roomUsers)
        newRoomUsers = updateLocalName(getValues("name"), roomUsers)
        setInRoomUsers(newRoomUsers)
      },
    })

  const handleClickBack = () => {
    if (document.referrer.includes(import.meta.env.ILLA_CLOUD_URL)) {
      return (location.href = `${getILLACloudURL()}/workspace/${teamIdentifier}/ai-agents`)
    }
    if (
      document.referrer.includes(import.meta.env.ILLA_MARKET_URL) &&
      agentID
    ) {
      return (location.href = `${
        import.meta.env.ILLA_MARKET_URL
      }/ai-agent/${agentID}/detail`)
    }
    return (location.href = getILLACloudURL())
  }

  const handleScrollToElement = (scrollId: string) => {
    const el = document.querySelector(`[data-scroll-id=${scrollId}]`)
    setTimeout(() => {
      el?.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 30)
  }
  const handleSubmitSave = async (data: Agent) => {
    track(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_EDIT,
      {
        element: "save",
        parameter1: agentData2JSONReport(data),
        parameter5: data.aiAgentID || "-1",
      },
    )
    try {
      let updateIconURL = data.icon
      if (data.icon !== undefined && data.icon !== "") {
        const iconURL = new URL(data.icon)
        if (iconURL.protocol !== "http:" && iconURL.protocol !== "https:") {
          updateIconURL = await uploadAgentIcon(data.icon)
        }
      }
      if (data.aiAgentID === undefined || data.aiAgentID === "") {
        const resp = await createAgent({
          ...data,
          icon: updateIconURL,
          variables: data.variables.filter(
            (v) => v.key !== "" && v.value !== "",
          ),
        })
        sendTagEvent("create_agent", currentUserInfo.userID)
        dispatch(
          aiAgentActions.addTeamAIAgentReducer({
            aiAgent: resp.data,
          }),
        )
        reset({
          ...resp.data,
          variables:
            resp.data.variables.length === 0
              ? [{ key: "", value: "" }]
              : resp.data.variables,
        })
      } else {
        const resp = await putAgentDetail(data.aiAgentID, {
          ...data,
          icon: updateIconURL,
          variables: data.variables.filter(
            (v) => v.key !== "" && v.value !== "",
          ),
        })
        dispatch(
          aiAgentActions.modifyTeamAIAgentReducer({
            aiAgentID: resp.data.aiAgentID,
            modifiedProps: resp.data,
          }),
        )
        reset({
          ...resp.data,
          variables:
            resp.data.variables.length === 0
              ? [{ key: "", value: "" }]
              : resp.data.variables,
        })
      }
      message.success({
        content: t("dashboard.message.create-suc"),
      })
    } catch (e) {
      message.error({
        content: t("dashboard.message.create-failed"),
      })
    }
  }

  const handleVerifyOnSave = () => {
    trigger().then(() => {
      if (!!errors.prompt) {
        handleScrollToElement(SCROLL_ID.PROMPT)
      } else if (!!errors.variables) {
        handleScrollToElement(SCROLL_ID.VARIABLES)
      } else if (!!errors.name) {
        handleScrollToElement(SCROLL_ID.NAME)
      } else if (!!errors.description) {
        handleScrollToElement(SCROLL_ID.DESCRIPTION)
      } else if (!!errors.icon) {
        handleScrollToElement(SCROLL_ID.ICON)
      }
    })
  }

  const handleVerifyOnStart = () => {
    clearErrors()
    if (!getValues("prompt")) {
      setError("prompt", {
        type: "required",
        message: t("editor.ai-agent.validation_blank.prompt"),
      })
      handleScrollToElement(SCROLL_ID.PROMPT)
      return false
    } else if (
      !getValues("variables").every(
        (param) =>
          (param.key === "" && param.value === "") ||
          (param.key !== "" && param.value !== ""),
      )
    ) {
      setError("variables", {
        type: "validate",
        message: t("editor.ai-agent.validation_blank.variable_value"),
      })
      handleScrollToElement(SCROLL_ID.VARIABLES)
      return false
    }
    return true
  }

  const handleClickStart = async () => {
    if (!handleVerifyOnStart()) {
      return
    }
    if (isPremiumModel(getValues("model")) && !canUseBillingFeature) {
      upgradeModal({
        modalType: "agent",
      })
      return
    }
    track(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_EDIT,
      {
        element: isRunning ? "restart" : "start",
        parameter1: agentData2JSONReport(getValues()),
        parameter5: getValues("aiAgentID") || "-1",
      },
    )
    isRunning
      ? await reconnect(getValues("aiAgentID"), getValues("agentType"))
      : await connect(getValues("aiAgentID"), getValues("agentType"))
  }

  return (
    <ChatContext.Provider value={{ inRoomUsers }}>
      <div css={aiAgentContainerStyle}>
        <div css={leftPanelContainerStyle}>
          <div css={leftPanelCoverContainer}>
            <div css={leftPanelHeaderStyle}>
              <div css={leftPanelTitleTextStyle} onClick={handleClickBack}>
                <PreviousIcon fs="16px" />
                <span css={backTextStyle}>{t("editor.ai-agent.title")}</span>
              </div>
              <Link
                href="https://docs.illacloud.com/ai-agent"
                target="__blank"
                colorScheme="techPurple"
                hoverable={false}
                css={docTextContainerStyle}
              >
                <span css={docTextStyle}>
                  <DocsIcon size="16" />
                  <span>{t("editor.ai-agent.doc")}</span>
                </span>
              </Link>
            </div>
            <div css={leftPanelContentContainerStyle}>
              <Controller
                name="agentType"
                control={control}
                shouldUnregister={false}
                render={({ field }) => (
                  <AIAgentBlock
                    title={t("editor.ai-agent.label.mode")}
                    tips={t("editor.ai-agent.tips.mode")}
                    required
                  >
                    <RadioGroup
                      colorScheme={getColor("grayBlue", "02")}
                      w="100%"
                      value={field.value}
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
                        track(
                          ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                          ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_EDIT,
                          {
                            element: "mode_radio_button",
                            parameter1: value,
                            parameter5: data.agent.aiAgentID || "-1",
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
                rules={{
                  required: t("editor.ai-agent.validation_blank.prompt"),
                }}
                shouldUnregister={false}
                render={({ field: promptField }) => (
                  <AIAgentBlock
                    title={"Prompt"}
                    required
                    scrollId={SCROLL_ID.PROMPT}
                  >
                    <Controller
                      name="variables"
                      control={control}
                      render={({ field: variables }) => (
                        <div>
                          <CodeEditor
                            {...promptField}
                            css={codeEditorErrorStyle(!!errors.prompt)}
                            placeholder={t(
                              "editor.ai-agent.placeholder.prompt",
                            )}
                            minHeight="200px"
                            completionOptions={variables.value}
                          />
                          {errors.prompt?.message && (
                            <ErrorText errorMessage={errors.prompt?.message} />
                          )}
                        </div>
                      )}
                    />
                  </AIAgentBlock>
                )}
              />

              <Controller
                name="variables"
                control={control}
                rules={{
                  validate: (value) => {
                    const isValidate = value.every(
                      (param) =>
                        (param.key === "" && param.value === "") ||
                        (param.key !== "" && param.value !== ""),
                    )
                    return isValidate
                      ? isValidate
                      : t(
                          "Please ensure that both the key and value are either empty or not empty.",
                        )
                  },
                }}
                shouldUnregister={false}
                render={({ field }) => (
                  <AIAgentBlock
                    title={t("editor.ai-agent.label.variable")}
                    scrollId={SCROLL_ID.VARIABLES}
                  >
                    <RecordEditor
                      records={field.value}
                      onAdd={() => {
                        field.onChange([
                          ...field.value,
                          {
                            key: "",
                            value: "",
                          },
                        ])
                      }}
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
                      onDelete={(index) => {
                        const newVariables = [...field.value]
                        newVariables.splice(index, 1)
                        if (newVariables.length === 0) {
                          newVariables.push({
                            key: "",
                            value: "",
                          })
                        }
                        field.onChange(newVariables)
                      }}
                      label={""}
                    />
                    {errors.variables?.message && (
                      <ErrorText errorMessage={errors.variables?.message} />
                    )}
                  </AIAgentBlock>
                )}
              />

              <Controller
                name="model"
                control={control}
                rules={{
                  required: true,
                }}
                shouldUnregister={false}
                render={({ field }) => (
                  <AIAgentBlock
                    title={t("editor.ai-agent.label.model")}
                    required
                  >
                    <Select
                      {...field}
                      onClick={() => {
                        track(
                          ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                          ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_EDIT,
                          {
                            element: "model",
                            parameter1: field.value,
                            parameter5: data.agent.aiAgentID || "-1",
                          },
                        )
                      }}
                      onChange={(value) => {
                        track(
                          ILLA_MIXPANEL_EVENT_TYPE.CHANGE,
                          ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_EDIT,
                          {
                            element: "model",
                            parameter1: value,
                            parameter5: data.agent.aiAgentID || "-1",
                          },
                        )
                        if (
                          isPremiumModel(value as AI_AGENT_MODEL) &&
                          !canUseBillingFeature
                        ) {
                          upgradeModal({
                            modalType: "agent",
                          })
                          return
                        }
                        field.onChange(value)
                      }}
                      colorScheme={"techPurple"}
                      options={[
                        ...freeModelList.map((model) => {
                          return {
                            label: (
                              <div css={labelStyle}>
                                <span css={labelLogoStyle}>{model.logo}</span>
                                <span css={labelTextStyle}>{model.name}</span>
                              </div>
                            ),
                            value: model.value,
                          }
                        }),
                        ...premiumModelList.map((model) => {
                          return {
                            label: (
                              <div css={labelStyle}>
                                <span css={labelLogoStyle}>{model.logo}</span>
                                <span css={labelTextStyle}>{model.name}</span>
                                {!canUseBillingFeature && (
                                  <div css={premiumContainerStyle}>
                                    <UpgradeIcon />
                                    <div style={{ marginLeft: 4 }}>Premium</div>
                                  </div>
                                )}
                              </div>
                            ),
                            value: model.value,
                          }
                        }),
                      ]}
                    />
                  </AIAgentBlock>
                )}
              />
              <Divider mt="8px" />
              <div
                css={advancedSettingHeaderStyle}
                onClick={() => setExpanded(!expanded)}
              >
                <span>{t("editor.ai-agent.group.advanced_settings")}</span>
                {expanded ? <UpIcon /> : <DownIcon />}
              </div>
              {expanded && (
                <div css={advancedSettingStyle}>
                  <Controller
                    control={control}
                    name={"model"}
                    render={({ field: modelField }) => (
                      <AIAgentBlock
                        title={"Max Token"}
                        tips={t("editor.ai-agent.tips.max-token")}
                        required
                      >
                        <Controller
                          name={"modelConfig.maxTokens"}
                          control={control}
                          rules={{
                            required: t(
                              "editor.ai-agent.validation_blank.max_token",
                            ),
                            validate: (value) => {
                              const isValidate =
                                value > 0 &&
                                value <= (getLLM(modelField.value)?.limit ?? 1)
                              return isValidate
                                ? isValidate
                                : t("editor.ai-agent.value_invalid.max_token")
                            },
                          }}
                          shouldUnregister={false}
                          render={({ field }) => (
                            <InputNumber
                              value={field.value}
                              onChange={(value) => {
                                track(
                                  ILLA_MIXPANEL_EVENT_TYPE.CHANGE,
                                  ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_EDIT,
                                  {
                                    element: "max_token",
                                    parameter1: value,
                                    parameter5: data.agent.aiAgentID || "-1",
                                  },
                                )
                                field.onChange(value)
                              }}
                              colorScheme={"techPurple"}
                              mode="button"
                              min={1}
                              max={getLLM(modelField.value)?.limit ?? 1}
                            />
                          )}
                        />
                      </AIAgentBlock>
                    )}
                  />
                  <Controller
                    control={control}
                    name={"model"}
                    render={({ field: modelField }) => (
                      <Controller
                        name="modelConfig.temperature"
                        control={control}
                        rules={{
                          required: t(
                            "editor.ai-agent.validation_blank.temperature",
                          ),
                          validate: (value) => {
                            const isValidate =
                              value >=
                                (getLLM(modelField.value)
                                  ?.temperatureRange[0] ?? 0.1) &&
                              value <=
                                (getLLM(modelField.value)
                                  ?.temperatureRange[1] ?? 1)
                            return isValidate
                              ? isValidate
                              : t("editor.ai-agent.value_invalid.temperature")
                          },
                        }}
                        shouldUnregister={false}
                        render={({ field }) => (
                          <AIAgentBlock
                            title={"Temperature"}
                            tips={t("editor.ai-agent.tips.temperature")}
                            required
                          >
                            <div css={temperatureContainerStyle}>
                              <Slider
                                {...field}
                                colorScheme={getColor("grayBlue", "02")}
                                step={0.1}
                                min={
                                  getLLM(modelField.value)?.temperatureRange[0]
                                }
                                max={
                                  getLLM(modelField.value)?.temperatureRange[1]
                                }
                                onAfterChange={(v) => {
                                  track(
                                    ILLA_MIXPANEL_EVENT_TYPE.CHANGE,
                                    ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_EDIT,
                                    {
                                      element: "temporature",
                                      parameter1: v,
                                      parameter5: data.agent.aiAgentID || "-1",
                                    },
                                  )
                                }}
                              />
                              <span css={temperatureStyle}>{field.value}</span>
                            </div>
                          </AIAgentBlock>
                        )}
                      />
                    )}
                  />
                </div>
              )}

              <Divider
                mt="8px"
                text={t("editor.ai-agent.group.information")}
                colorScheme="grayBlue"
              />
              <Controller
                name="name"
                control={control}
                rules={{
                  required: t("editor.ai-agent.validation_blank.name"),
                }}
                shouldUnregister={false}
                render={({ field }) => (
                  <AIAgentBlock
                    title={t("editor.ai-agent.label.name")}
                    required
                    scrollId={SCROLL_ID.NAME}
                  >
                    <Input
                      {...field}
                      placeholder={t("editor.ai-agent.placeholder.name")}
                      colorScheme={"techPurple"}
                      error={!!errors.name}
                      maxLength={60}
                      onChange={(value) => {
                        field.onChange(value)
                        setInRoomUsers(updateLocalName(value, inRoomUsers))
                      }}
                    />
                    {errors.name?.message && (
                      <ErrorText errorMessage={errors.name?.message} />
                    )}
                  </AIAgentBlock>
                )}
              />

              <Controller
                name="description"
                control={control}
                rules={{
                  required: t("editor.ai-agent.validation_blank.description"),
                  maxLength: {
                    value: 160,
                    message: t("editor.ai-agent.length_invalid.description"),
                  },
                }}
                shouldUnregister={false}
                render={({ field }) => (
                  <AIAgentBlock
                    title={t("editor.ai-agent.label.desc")}
                    subtitleTips={t("editor.ai-agent.generate-desc.tooltips")}
                    required
                    scrollId={SCROLL_ID.DESCRIPTION}
                    subtitle={
                      <div
                        css={descContainerStyle}
                        onClick={async () => {
                          track(
                            ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                            ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_EDIT,
                            {
                              element: "desc_generate",
                              parameter1: getValues("prompt") ? true : false,
                              parameter5: data.agent.aiAgentID || "-1",
                            },
                          )
                          const currentTime = performance.now()
                          if (!getValues("prompt")) {
                            message.error({
                              content: t("editor.ai-agent.generate-desc.blank"),
                            })
                            return
                          }
                          setGenerateDescLoading(true)
                          try {
                            const desc = await generateDescription(
                              getValues("prompt"),
                            )
                            track(
                              ILLA_MIXPANEL_EVENT_TYPE.REQUEST,
                              ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_EDIT,
                              {
                                element: "desc_generate",
                                consume: performance.now() - currentTime,
                                parameter2: "suc",
                              },
                            )
                            field.onChange(desc.data.payload)
                          } catch (e) {
                            track(
                              ILLA_MIXPANEL_EVENT_TYPE.REQUEST,
                              ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_EDIT,
                              {
                                element: "desc_generate",
                                consume: performance.now() - currentTime,
                                parameter2: "failed",
                              },
                            )
                            message.error({
                              content: t(
                                "editor.ai-agent.generate-desc.failed",
                              ),
                            })
                          } finally {
                            setGenerateDescLoading(false)
                          }
                        }}
                      >
                        {generateDescLoading ? (
                          <AILoading spin={true} size="12px" />
                        ) : (
                          <AIIcon />
                        )}
                        <div css={descTextStyle}>
                          {t("editor.ai-agent.generate-desc.button")}
                        </div>
                      </div>
                    }
                  >
                    <TextArea
                      {...field}
                      minH="120px"
                      showWordLimit={true}
                      error={!!errors.description}
                      maxLength={160}
                      placeholder={t("editor.ai-agent.placeholder.desc")}
                      colorScheme={"techPurple"}
                    />
                    {errors.description?.message && (
                      <ErrorText errorMessage={errors.description?.message} />
                    )}
                  </AIAgentBlock>
                )}
              />
              <Controller
                name="icon"
                control={control}
                rules={{
                  required: t("editor.ai-agent.validation_blank.icon"),
                }}
                shouldUnregister={false}
                render={({ field }) => (
                  <AIAgentBlock
                    title={t("editor.ai-agent.label.icon")}
                    required
                    scrollId={SCROLL_ID.ICON}
                    subtitle={
                      <div
                        css={descContainerStyle}
                        onClick={async () => {
                          track(
                            ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                            ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_EDIT,
                            {
                              element: "icon_generate",
                              parameter1: getValues("prompt") ? true : false,
                              parameter5: data.agent.aiAgentID || "-1",
                            },
                          )
                          const currentTime = performance.now()
                          if (!getValues("name") || !getValues("description")) {
                            message.error({
                              content: t("editor.ai-agent.generate-icon.blank"),
                            })
                            return
                          }
                          setGenerateIconLoading(true)
                          try {
                            const icon = await generateIcon(
                              getValues("name"),
                              getValues("description"),
                            )
                            track(
                              ILLA_MIXPANEL_EVENT_TYPE.REQUEST,
                              ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_EDIT,
                              {
                                element: "icon_generate",
                                consume: performance.now() - currentTime,
                                parameter2: "suc",
                              },
                            )
                            field.onChange(icon.data.payload)
                          } catch (e) {
                            track(
                              ILLA_MIXPANEL_EVENT_TYPE.REQUEST,
                              ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_EDIT,
                              {
                                element: "icon_generate",
                                consume: performance.now() - currentTime,
                                parameter2: "failed",
                              },
                            )
                            message.error({
                              content: t(
                                "editor.ai-agent.generate-desc.failed",
                              ),
                            })
                          } finally {
                            setGenerateIconLoading(false)
                          }
                        }}
                      >
                        {generateIconLoading ? (
                          <AILoading spin={true} size="12px" />
                        ) : (
                          <AIIcon />
                        )}
                        <div css={descTextStyle}>
                          {t("editor.ai-agent.generate-desc.button")}
                        </div>
                      </div>
                    }
                    subtitleTips={t("editor.ai-agent.generate-icon.tooltips")}
                  >
                    <MixpanelTrackProvider
                      basicTrack={track}
                      pageName={ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_EDIT}
                    >
                      <AvatarUpload
                        onOk={async (file) => {
                          let reader = new FileReader()
                          reader.onload = () => {
                            field.onChange(reader.result)
                            setInRoomUsers(
                              updateLocalIcon(
                                reader.result as string,
                                inRoomUsers,
                              ),
                            )
                          }
                          reader.readAsDataURL(file)
                          return true
                        }}
                      >
                        <div
                          onClick={() => {
                            track(
                              ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                              ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_EDIT,
                              {
                                element: "avater",
                              },
                            )
                          }}
                        >
                          {!field.value ? (
                            <div>
                              <div css={uploadContainerStyle}>
                                <div css={uploadContentContainerStyle}>
                                  <PlusIcon c={getColor("grayBlue", "03")} />
                                  <div css={uploadTextStyle}>
                                    {t("editor.ai-agent.placeholder.icon")}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <Image
                              src={field.value}
                              css={uploadContentContainerStyle}
                              width="100px"
                              height="100px"
                            />
                          )}
                        </div>
                      </AvatarUpload>
                    </MixpanelTrackProvider>
                    {errors.icon?.message && (
                      <ErrorText errorMessage={errors.icon?.message} />
                    )}
                  </AIAgentBlock>
                )}
              />
            </div>
            {(isConnecting || isSubmitting) && (
              <div css={leftLoadingCoverStyle} />
            )}
          </div>
          <form onSubmit={handleSubmit(handleSubmitSave)}>
            <div css={buttonContainerStyle}>
              <Button
                id="save-button"
                flex="1"
                colorScheme="grayBlue"
                onClick={handleVerifyOnSave}
                size="large"
                loading={isSubmitting}
              >
                {t("editor.ai-agent.save")}
              </Button>
              <Button
                flex="1"
                size="large"
                type="button"
                loading={isConnecting}
                ml="8px"
                colorScheme={getColor("grayBlue", "02")}
                leftIcon={isRunning ? <ResetIcon /> : <PlayFillIcon />}
                onClick={handleClickStart}
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
            <Controller
              name="aiAgentID"
              control={control}
              render={({ field: idField }) => (
                <Controller
                  render={({ field: contributeField }) => (
                    <div css={rightPanelContainerStyle}>
                      <PreviewChat
                        showShareDialog={showShareAgentModalOnlyForShare(
                          currentTeamInfo,
                        )}
                        showContributeDialog={showShareAgentModal(
                          currentTeamInfo,
                          currentTeamInfo.myRole,
                          contributeField.value,
                        )}
                        isRunning={isRunning}
                        hasCreated={Boolean(idField.value)}
                        isMobile={false}
                        editState="EDIT"
                        agentType={field.value}
                        chatMessages={chatMessages}
                        generationMessage={generationMessage}
                        isReceiving={isReceiving}
                        blockInput={!isRunning || blockInputDirty}
                        onSendMessage={(message, agentType: AI_AGENT_TYPE) => {
                          track(
                            ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                            ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_EDIT,
                            {
                              element: "send",
                              parameter5: getValues("aiAgentID") || "-1",
                            },
                          )
                          sendMessage(
                            {
                              threadID: message.threadID,
                              prompt: encodeURIComponent(message.message),
                              variables: [],
                              actionID: getValues("aiAgentID"),
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
                        onShowShareDialog={() => {
                          if (
                            !openShareAgentModalOnlyForShare(currentTeamInfo)
                          ) {
                            upgradeModal({
                              modalType: "upgrade",
                            })
                            return
                          }
                          setDefaultShareTag(ShareAgentTab.SHARE_WITH_TEAM)
                          setShareDialogVisible(true)
                          track(
                            ILLA_MIXPANEL_EVENT_TYPE.SHOW,
                            ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_EDIT,
                            {
                              element: "share_modal",
                              parameter5: data.agent.aiAgentID,
                            },
                          )
                        }}
                        onShowContributeDialog={() => {
                          if (contributeField.value) {
                            if (
                              !openShareAgentModalOnlyForShare(currentTeamInfo)
                            ) {
                              upgradeModal({
                                modalType: "upgrade",
                              })
                              return
                            }
                            setDefaultShareTag(ShareAgentTab.TO_MARKETPLACE)
                            setShareDialogVisible(true)
                            track(
                              ILLA_MIXPANEL_EVENT_TYPE.SHOW,
                              ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_EDIT,
                              {
                                element: "share_modal",
                                parameter5: data.agent.aiAgentID,
                              },
                            )
                          } else {
                            if (
                              !openShareAgentModal(
                                currentTeamInfo,
                                currentTeamInfo.myRole,
                                contributeField.value,
                              )
                            ) {
                              upgradeModal({
                                modalType: "upgrade",
                              })
                              return
                            }
                            setContributedDialogVisible(true)
                          }
                        }}
                      />
                    </div>
                  )}
                  name="publishedToMarketplace"
                  control={control}
                />
              )}
            />
          )}
        />
      </div>
      <Controller
        control={control}
        name="aiAgentID"
        render={({ field: idField }) => (
          <Controller
            control={control}
            name="name"
            render={({ field: nameField }) => (
              <Controller
                control={control}
                name="publishedToMarketplace"
                render={({ field }) => (
                  <MixpanelTrackProvider
                    basicTrack={track}
                    pageName={ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_EDIT}
                  >
                    {shareDialogVisible && (
                      <ShareAgentPC
                        itemID={idField.value}
                        onInvitedChange={(userList) => {
                          const memberListInfo: MemberInfo[] = userList.map(
                            (user) => {
                              return {
                                ...user,
                                userID: "",
                                nickname: "",
                                avatar: "",
                                userStatus: USER_STATUS.PENDING,
                                permission: {},
                                createdAt: "",
                                updatedAt: "",
                              }
                            },
                          )
                          dispatch(
                            teamActions.updateInvitedUserReducer(
                              memberListInfo,
                            ),
                          )
                        }}
                        canUseBillingFeature={canUseUpgradeFeature(
                          currentTeamInfo.myRole,
                          getPlanUtils(currentTeamInfo),
                          currentTeamInfo.totalTeamLicense.teamLicensePurchased,
                          currentTeamInfo.totalTeamLicense.teamLicenseAllPaid,
                        )}
                        title={t(
                          "user_management.modal.social_media.default_text.agent",
                          {
                            agentName: nameField.value,
                          },
                        )}
                        redirectURL={`${getILLABuilderURL()}/${
                          currentTeamInfo.identifier
                        }/ai-agent/${idField.value}`}
                        onClose={() => {
                          setShareDialogVisible(false)
                        }}
                        canInvite={canManageInvite(
                          currentTeamInfo.myRole,
                          currentTeamInfo.permission
                            .allowEditorManageTeamMember,
                          currentTeamInfo.permission
                            .allowViewerManageTeamMember,
                        )}
                        defaultTab={defaultShareTag}
                        defaultInviteUserRole={USER_ROLE.VIEWER}
                        teamID={currentTeamInfo.id}
                        currentUserRole={currentTeamInfo.myRole}
                        defaultBalance={
                          currentTeamInfo.currentTeamLicense.balance
                        }
                        defaultAllowInviteLink={
                          currentTeamInfo.permission.inviteLinkEnabled
                        }
                        onInviteLinkStateChange={(enableInviteLink) => {
                          dispatch(
                            teamActions.updateTeamMemberPermissionReducer({
                              teamID: currentTeamInfo.id,
                              newPermission: {
                                ...currentTeamInfo.permission,
                                inviteLinkEnabled: enableInviteLink,
                              },
                            }),
                          )
                        }}
                        agentID={idField.value}
                        defaultAgentContributed={field.value}
                        onAgentContributed={(isAgentContributed) => {
                          field.onChange(isAgentContributed)
                          if (isAgentContributed) {
                            const newUrl = new URL(
                              getAgentPublicLink(idField.value),
                            )
                            newUrl.searchParams.set("token", getAuthToken())
                            window.open(newUrl, "_blank")
                          }
                        }}
                        onCopyInviteLink={(link) => {
                          track(
                            ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                            ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_EDIT,
                            {
                              element: "share_modal_copy_team",
                              parameter5: idField.value,
                            },
                          )
                          copyToClipboard(
                            t(
                              "user_management.modal.custom_copy_text_agent_invite",
                              {
                                userName: currentUserInfo.nickname,
                                teamName: currentTeamInfo.name,
                                inviteLink: link,
                              },
                            ),
                          )
                        }}
                        onCopyAgentMarketLink={(link) => {
                          track(
                            ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                            ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_EDIT,
                            {
                              element: "share_modal_link",
                              parameter5: idField.value,
                            },
                          )
                          copyToClipboard(
                            t(
                              "user_management.modal.contribute.default_text.agent",
                              {
                                agentName: nameField.value,
                                agentLink: link,
                              },
                            ),
                          )
                        }}
                        userRoleForThisAgent={currentTeamInfo.myRole}
                        ownerTeamID={currentTeamInfo.id}
                        onBalanceChange={(balance) => {
                          dispatch(
                            teamActions.updateTeamMemberSubscribeReducer({
                              teamID: currentTeamInfo.id,
                              subscribeInfo: {
                                ...currentTeamInfo.currentTeamLicense,
                                balance: balance,
                              },
                            }),
                          )
                        }}
                        teamPlan={getPlanUtils(currentTeamInfo)}
                        onShare={(platform) => {
                          track(
                            ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                            ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_EDIT,
                            {
                              element: "share_modal_social_media",
                              parameter4: platform,
                              parameter5: idField.value,
                            },
                          )
                        }}
                      />
                    )}
                    {contributedDialogVisible && (
                      <ContributeAgentPC
                        onContributed={(isAgentContributed) => {
                          field.onChange(isAgentContributed)
                          if (isAgentContributed) {
                            const newUrl = new URL(
                              getAgentPublicLink(idField.value),
                            )
                            newUrl.searchParams.set("token", getAuthToken())
                            window.open(newUrl, "_blank")
                          }
                        }}
                        teamID={currentTeamInfo.id}
                        onClose={() => {
                          setContributedDialogVisible(false)
                        }}
                        productID={idField.value}
                        productType={HASHTAG_REQUEST_TYPE.UNIT_TYPE_AI_AGENT}
                        productContributed={field.value}
                      />
                    )}
                  </MixpanelTrackProvider>
                )}
              />
            )}
          />
        )}
      />
    </ChatContext.Provider>
  )
}

AIAgent.displayName = "AIAgent"
