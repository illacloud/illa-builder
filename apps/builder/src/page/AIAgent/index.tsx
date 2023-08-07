import axios from "axios"
import { FC, useCallback, useEffect, useState } from "react"
import { Controller, useForm, useFormState } from "react-hook-form"
import { useSelector } from "react-redux"
import { useLoaderData } from "react-router-dom"
import { v4 } from "uuid"
import {
  Button,
  Image,
  Input,
  InputNumber,
  PlusIcon,
  RadioGroup,
  ResetIcon,
  Select,
  Slider,
  TextArea,
  getColor,
  useMessage,
} from "@illa-design/react"
import { Connection, getTextMessagePayload } from "@/api/ws"
import { WSMessageListener } from "@/api/ws/illaWS"
import { Callback, ILLA_WEBSOCKET_STATUS } from "@/api/ws/interface"
import { TextSignal, TextTarget } from "@/api/ws/textSignal"
import { ReactComponent as AIIcon } from "@/assets/agent/ai.svg"
import { ReactComponent as OpenAIIcon } from "@/assets/agent/modal-openai.svg"
import { CodeEditor } from "@/illa-public-component/CodeMirror"
import { AvatarUpload } from "@/illa-public-component/Cropper"
import { AIAgentBlock } from "@/page/AIAgent/components/AIAgentBlock"
import AILoading from "@/page/AIAgent/components/AILoading"
import { PreviewChat } from "@/page/AIAgent/components/PreviewChat"
import {
  aiAgentContainerStyle,
  buttonContainerStyle,
  descContainerStyle,
  descTextStyle,
  labelStyle,
  labelTextStyle,
  leftLoadingCoverStyle,
  leftPanelContainerStyle,
  leftPanelContentContainerStyle,
  leftPanelCoverContainer,
  leftPanelTitleStyle,
  leftPanelTitleTextStyle,
  rightPanelContainerStyle,
  uploadContainerStyle,
  uploadContentContainerStyle,
  uploadTextStyle,
} from "@/page/AIAgent/style"
import { RecordEditor } from "@/page/App/components/Actions/ActionPanel/RecordEditor"
import {
  AI_AGENT_MODEL,
  AI_AGENT_TYPE,
  Agent,
  ChatMessage,
  ChatSendRequestPayload,
  ChatWsAppendResponse,
  SenderType,
  getModelLimitToken,
} from "@/redux/aiAgent/aiAgentState"
import { configActions } from "@/redux/config/configSlice"
import { CollaboratorsInfo } from "@/redux/currentApp/collaborators/collaboratorsState"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import {
  createAgent,
  generateDescription,
  getAIAgentAnonymousAddress,
  getAIAgentWsAddress,
  putAgentDetail,
  uploadAgentIcon,
} from "@/services/agent"
import store from "@/store"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { ChatContext } from "./components/ChatContext"

export const AIAgent: FC = () => {
  const data = useLoaderData() as {
    agent: Agent
  }

  const { control, handleSubmit, getValues } = useForm<Agent>({
    mode: "onSubmit",
    defaultValues: data.agent,
  })

  const currentTeamInfo = useSelector(getCurrentTeamInfo)
  const currentUserInfo = useSelector(getCurrentUser)

  const { isSubmitting, isValid, isDirty, dirtyFields } = useFormState({
    control,
  })

  const blockInputDirty: boolean =
    Boolean(dirtyFields.variables) ||
    (dirtyFields.agentType ?? false) ||
    (dirtyFields.modelConfig?.maxTokens ?? false) ||
    (dirtyFields.modelConfig?.temperature ?? false) ||
    (dirtyFields.model ?? false) ||
    (dirtyFields.prompt ?? false)

  const message = useMessage()
  // page state
  const [generateDescLoading, setGenerateDescLoading] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  // data state
  const [inRoomUsers, setInRoomUsers] = useState<CollaboratorsInfo[]>([
    {
      id: "",
      nickname: "Anonymous Agent",
      avatar: "",
      role: SenderType.ANONYMOUS_AGENT,
    },
  ])
  const [isReceiving, setIsReceiving] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [generationMessage, setGenerationMessage] = useState<
    ChatMessage | undefined
  >(undefined)

  const sendMessage = useCallback(
    (payload: ChatSendRequestPayload, signal: TextSignal = TextSignal.RUN) => {
      setIsReceiving(true)
      Connection.getTextRoom("ai-agent", "")?.send(
        getTextMessagePayload(
          signal,
          TextTarget.ACTION,
          false,
          null,
          currentTeamInfo?.id ?? "",
          currentUserInfo.userId,
          [payload],
        ),
      )
    },
    [currentTeamInfo?.id, currentUserInfo.userId],
  )

  const updateLocalIcon = useCallback(
    (icon: string) => {
      const updateRoomUsers = [...inRoomUsers]
      let index = -1
      if (
        getValues("aiAgentID") === undefined ||
        getValues("aiAgentID") === ""
      ) {
        index = inRoomUsers.findIndex(
          (user) => user.role === SenderType.ANONYMOUS_AGENT,
        )
      } else {
        index = inRoomUsers.findIndex(
          (user) => user.id === getValues("aiAgentID"),
        )
      }
      if (index != -1) {
        updateRoomUsers[index].avatar = icon
        setInRoomUsers(updateRoomUsers)
      }
    },
    [getValues, inRoomUsers],
  )

  const updateLocalName = useCallback(
    (name: string) => {
      const updateRoomUsers = [...inRoomUsers]
      let index = -1
      if (
        getValues("aiAgentID") === undefined ||
        getValues("aiAgentID") === ""
      ) {
        index = inRoomUsers.findIndex(
          (user) => user.role === SenderType.ANONYMOUS_AGENT,
        )
      } else {
        index = inRoomUsers.findIndex(
          (user) => user.id === getValues("aiAgentID"),
        )
      }
      if (index != -1) {
        updateRoomUsers[index].nickname = name
        setInRoomUsers(updateRoomUsers)
      }
    },
    [getValues, inRoomUsers],
  )

  const connect = useCallback(
    async (aiAgentID: string) => {
      setIsConnecting(true)
      let address = ""
      if (aiAgentID === "") {
        const response = await getAIAgentAnonymousAddress()
        address = response.data.aiAgentConnectionAddress
      } else {
        const response = await getAIAgentWsAddress(aiAgentID)
        address = response.data.aiAgentConnectionAddress
      }
      const messageListener = {
        onMessage: (event, context, ws) => {
          const message = event.data
          if (typeof message !== "string") {
            return
          }
          const dataList = message.split("\n")
          dataList.forEach((data: string) => {
            let callback: Callback<unknown> = JSON.parse(data)

            if (callback.target === TextTarget.ACTION) {
              let chatCallback: Callback<ChatWsAppendResponse> =
                JSON.parse(data)
              switch (chatCallback.errorCode) {
                case 0:
                  if (getValues("agentType") === AI_AGENT_TYPE.CHAT) {
                    const newMessageList = [...chatMessages]
                    const index = newMessageList.findIndex((m) => {
                      return m.threadID === chatCallback.data.threadID
                    })
                    if (index === -1) {
                      newMessageList.push({
                        sender: chatCallback.data.sender,
                        message: chatCallback.data.message,
                        threadID: chatCallback.data.threadID,
                      } as ChatMessage)
                    } else {
                      newMessageList[index].message =
                        newMessageList[index].message +
                        chatCallback.data.message
                    }
                    setChatMessages(newMessageList)
                  } else {
                    if (
                      generationMessage &&
                      generationMessage.threadID === chatCallback.data.threadID
                    ) {
                      const newMessage = {
                        ...generationMessage,
                      }
                      newMessage.message =
                        newMessage.message + chatCallback.data.message
                      setGenerationMessage(newMessage)
                    } else {
                      setGenerationMessage({
                        sender: chatCallback.data.sender,
                        message: chatCallback.data.message,
                        threadID: chatCallback.data.threadID,
                      } as ChatMessage)
                    }
                  }
                  break
                case 14:
                  store.dispatch(
                    configActions.updateWSStatusReducer({
                      context: context,
                      wsStatus: ILLA_WEBSOCKET_STATUS.LOCKING,
                    }),
                  )
                  ws.reconnect()
                  break
                case 15:
                  setIsReceiving(false)
              }
            }
            if (
              callback.signal === TextSignal.ENTER &&
              callback.broadcast.type == "enter/remote"
            ) {
              const { inRoomUsers } = JSON.parse(callback.broadcast.payload)
              setInRoomUsers(inRoomUsers)
              updateLocalIcon(getValues("icon"))
              updateLocalName(getValues("name"))
            }
          })
        },
      } as WSMessageListener
      Connection.enterAgentRoom(address, messageListener)
      setIsConnecting(false)
      setIsRunning(true)
      sendMessage({
        threadID: v4(),
        prompt: getValues("prompt"),
        variables: getValues("variables"),
        modelConfig: getValues("modelConfig"),
      } as ChatSendRequestPayload)
    },
    [
      chatMessages,
      generationMessage,
      getValues,
      sendMessage,
      updateLocalIcon,
      updateLocalName,
    ],
  )

  useEffect(() => {
    return () => {
      Connection.leaveRoom("ai-agent", "")
    }
  }, [])

  const reconnect = useCallback(
    async (aiAgentID: string) => {
      Connection.leaveRoom("ai-agent", "")
      setIsRunning(false)
      setChatMessages([])
      setGenerationMessage(undefined)
      await connect(aiAgentID)
    },
    [connect],
  )

  useEffect(() => {})

  return (
    <ChatContext.Provider value={{ inRoomUsers }}>
      <form
        onSubmit={handleSubmit(async (data) => {
          // icon need to update to cdn then add to agent.
          try {
            let updateIconURL = data.icon
            const iconURL = new URL(data.icon)
            if (iconURL.protocol !== "http:" && iconURL.protocol !== "https:") {
              updateIconURL = await uploadAgentIcon(data.icon)
            }
            if (data.aiAgentID === "") {
              await createAgent({
                ...data,
                icon: updateIconURL,
              })
            } else {
              await putAgentDetail(data.aiAgentID, {
                ...data,
                icon: updateIconURL,
              })
            }
          } catch (e) {
            if (axios.isAxiosError(e)) {
              message.error({
                content: "save error",
              })
            }
          }
        })}
      >
        <div css={aiAgentContainerStyle}>
          <div css={leftPanelContainerStyle}>
            <div css={leftPanelCoverContainer}>
              <div css={[leftPanelTitleStyle, leftPanelTitleTextStyle]}>
                🧬 Edit tool
              </div>
              <div css={leftPanelContentContainerStyle}>
                <AIAgentBlock title={"Icon"}>
                  <Controller
                    name="icon"
                    control={control}
                    shouldUnregister={false}
                    render={({ field }) => (
                      <AvatarUpload
                        onOk={async (file) => {
                          let reader = new FileReader()
                          reader.onload = () => {
                            field.onChange(reader.result)
                            updateLocalIcon(reader.result as string)
                          }
                          reader.readAsDataURL(file)
                          return true
                        }}
                      >
                        {!field.value ? (
                          <div>
                            <div css={uploadContainerStyle}>
                              <div css={uploadContentContainerStyle}>
                                <PlusIcon c={getColor("grayBlue", "03")} />
                                <div css={uploadTextStyle}>Upload</div>
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
                      </AvatarUpload>
                    )}
                  />
                </AIAgentBlock>
                <AIAgentBlock title={"Name"} required>
                  <Controller
                    name="name"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    shouldUnregister={false}
                    render={({ field }) => (
                      <Input
                        {...field}
                        colorScheme={"techPurple"}
                        onChange={(value) => {
                          field.onChange(value)
                          updateLocalName(value)
                        }}
                      />
                    )}
                  />
                </AIAgentBlock>
                <Controller
                  name="description"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  shouldUnregister={false}
                  render={({ field }) => (
                    <AIAgentBlock
                      title={"Description"}
                      tips={"6666"}
                      required
                      subTitle={
                        <div
                          css={descContainerStyle}
                          onClick={async () => {
                            setGenerateDescLoading(true)
                            try {
                              const desc = await generateDescription(
                                field.value,
                              )
                              field.onChange(desc.data.payload)
                            } catch (e) {
                              if (axios.isAxiosError(e)) {
                                message.error({
                                  content: "generate error",
                                })
                              }
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
                          <div css={descTextStyle}>AI generate</div>
                        </div>
                      }
                    >
                      <TextArea
                        {...field}
                        minH="64px"
                        colorScheme={"techPurple"}
                      />
                    </AIAgentBlock>
                  )}
                />
                <AIAgentBlock title={"Mode"} required>
                  <Controller
                    name="agentType"
                    control={control}
                    shouldUnregister={false}
                    render={({ field }) => (
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
                    )}
                  />
                </AIAgentBlock>
                <AIAgentBlock title={"Prompt"} required>
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
                          <CodeEditor
                            {...promptField}
                            minHeight="200px"
                            completionOptions={variables.value}
                          />
                        )}
                      />
                    )}
                  />
                </AIAgentBlock>
                <AIAgentBlock title={"Variables"}>
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
                    render={({ field }) => (
                      <RecordEditor
                        withoutCodeMirror
                        records={field.value}
                        valueInputType={VALIDATION_TYPES.ARRAY}
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
                    )}
                  />
                </AIAgentBlock>
                <AIAgentBlock title={"Modal"} required>
                  <Controller
                    name="model"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    shouldUnregister={false}
                    render={({ field }) => (
                      <Select
                        {...field}
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
                    )}
                  />
                </AIAgentBlock>
                <AIAgentBlock title={"Max Token"}>
                  <Controller
                    control={control}
                    name={"model"}
                    render={({ field: modelField }) => (
                      <Controller
                        name={"modelConfig.maxTokens"}
                        control={control}
                        rules={{
                          required: true,
                          min: 0,
                          max: getModelLimitToken(modelField.value),
                        }}
                        shouldUnregister={false}
                        render={({ field }) => (
                          <InputNumber
                            {...field}
                            colorScheme={"techPurple"}
                            mode="button"
                            min={0}
                            max={getModelLimitToken(modelField.value)}
                          />
                        )}
                      />
                    )}
                  />
                </AIAgentBlock>
                <AIAgentBlock title={"Temperature"}>
                  <Controller
                    name="modelConfig.temperature"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    shouldUnregister={false}
                    render={({ field }) => (
                      <Slider
                        {...field}
                        colorScheme={getColor("grayBlue", "02")}
                        step={0.1}
                        min={0}
                        max={1}
                      />
                    )}
                  />
                </AIAgentBlock>
              </div>
              {(isConnecting || isSubmitting) && (
                <div css={leftLoadingCoverStyle} />
              )}
            </div>
            <div css={buttonContainerStyle}>
              <Button
                flex="1"
                colorScheme="grayBlue"
                disabled={!isValid && !isDirty}
                loading={isSubmitting}
              >
                Save
              </Button>
              <Controller
                control={control}
                name="aiAgentID"
                render={({ field }) => (
                  <Button
                    type="button"
                    flex="1"
                    disabled={!isValid}
                    loading={isConnecting}
                    ml="8px"
                    colorScheme={getColor("grayBlue", "02")}
                    leftIcon={<ResetIcon />}
                    onClick={async () => {
                      isRunning
                        ? await reconnect(field.value)
                        : await connect(field.value)
                    }}
                  >
                    {!isRunning ? "Start" : "Restart"}
                  </Button>
                )}
              />
            </div>
          </div>
          <Controller
            name="agentType"
            control={control}
            shouldUnregister={false}
            render={({ field }) => (
              <div css={rightPanelContainerStyle}>
                <PreviewChat
                  agentType={field.value}
                  chatMessages={chatMessages}
                  generationMessage={generationMessage}
                  isReceiving={isReceiving}
                  blockInput={!isRunning || blockInputDirty}
                  onSendMessage={(message, agentType: AI_AGENT_TYPE) => {
                    sendMessage({
                      threadID: message.threadID,
                      prompt: message.message,
                      variables: [],
                      modelConfig: getValues("modelConfig"),
                    } as ChatSendRequestPayload)
                    switch (agentType) {
                      case AI_AGENT_TYPE.CHAT:
                        setChatMessages([...chatMessages, message])
                        break
                      case AI_AGENT_TYPE.TEXT_GENERATION:
                        setGenerationMessage(undefined)
                        break
                    }
                  }}
                  onCancelReceiving={() => {
                    sendMessage(
                      {} as ChatSendRequestPayload,
                      TextSignal.STOP_RUN,
                    )
                    setIsReceiving(false)
                  }}
                />
              </div>
            )}
          />
        </div>
      </form>
    </ChatContext.Provider>
  )
}

export default AIAgent

AIAgent.displayName = "AIAgent"
