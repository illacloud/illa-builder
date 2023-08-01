import axios from "axios"
import { FC, useState } from "react"
import { Controller, useForm, useFormState } from "react-hook-form"
import { useLoaderData } from "react-router-dom"
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
  SenderType,
  getModelLimitToken,
} from "@/redux/aiAgent/aiAgentState"
import { CollaboratorsInfo } from "@/redux/currentApp/collaborators/collaboratorsState"
import {
  createAgent,
  generateDescription,
  putAgentDetail,
} from "@/services/agent"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { ChatContext } from "./components/ChatContext"

export const AIAgent: FC = () => {
  const data = useLoaderData() as {
    agent: Agent
  }

  const { control, handleSubmit } = useForm<Agent>({
    mode: "onSubmit",
    defaultValues: data.agent,
  })

  const { isSubmitting, isValid } = useFormState({
    control,
  })

  const message = useMessage()
  // page state
  const [generateDescLoading, setGenerateDescLoading] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [isConnecting, setIsConnection] = useState(false)
  // data state
  const [inRoomUsers, setInRoomUsers] = useState<CollaboratorsInfo[]>([])
  const [isReceiving, setIsReceiving] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])

  return (
    <ChatContext.Provider value={{ inRoomUsers }}>
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            if (data.aiAgentID !== "") {
              await putAgentDetail(data.aiAgentID, data)
            } else {
              await createAgent(data)
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
                <Controller
                  name="aiAgentID"
                  control={control}
                  render={({ field: aiAgentIDField }) => (
                    <>
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
                                  const updateRoomUsers = [...inRoomUsers]
                                  let index = -1
                                  if (aiAgentIDField.value === "") {
                                    index = inRoomUsers.findIndex(
                                      (user) =>
                                        user.role ===
                                        SenderType.ANONYMOUS_AGENT,
                                    )
                                  } else {
                                    index = inRoomUsers.findIndex(
                                      (user) =>
                                        user.id === aiAgentIDField.value,
                                    )
                                  }
                                  if (index != -1) {
                                    updateRoomUsers[index].avatar =
                                      reader.result as string
                                    setInRoomUsers(updateRoomUsers)
                                  }
                                }
                                reader.readAsDataURL(file)
                                return true
                              }}
                            >
                              {!field.value ? (
                                <div>
                                  <div css={uploadContainerStyle}>
                                    <div css={uploadContentContainerStyle}>
                                      <PlusIcon
                                        c={getColor("grayBlue", "03")}
                                      />
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
                                const updateRoomUsers = [...inRoomUsers]
                                let index = -1
                                if (aiAgentIDField.value === "") {
                                  index = inRoomUsers.findIndex(
                                    (user) =>
                                      user.role === SenderType.ANONYMOUS_AGENT,
                                  )
                                } else {
                                  index = inRoomUsers.findIndex(
                                    (user) => user.id === aiAgentIDField.value,
                                  )
                                }
                                if (index != -1) {
                                  updateRoomUsers[index].nickname = value
                                  setInRoomUsers(updateRoomUsers)
                                }
                              }}
                            />
                          )}
                        />
                      </AIAgentBlock>
                    </>
                  )}
                />
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
                disabled={!isValid}
                loading={isSubmitting}
              >
                Save
              </Button>
              <Button
                type="button"
                flex="1"
                disabled={!isValid}
                loading={isConnecting}
                ml="8px"
                colorScheme={getColor("grayBlue", "02")}
                leftIcon={<ResetIcon />}
                onClick={() => {
                  setIsConnection(true)
                }}
              >
                {!isRunning ? "Start" : "Restart"}
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
                  mode={field.value}
                  messages={messages}
                  isReceiving={isReceiving}
                  blockInput={!isRunning}
                  onSendMessage={(message) => {
                    setIsReceiving(true)
                    setMessages([...messages, message])
                  }}
                  onCancelReceiving={() => {
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
