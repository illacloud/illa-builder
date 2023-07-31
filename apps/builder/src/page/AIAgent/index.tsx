import axios from "axios"
import { FC, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
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
import { ReactComponent as OpenAIIcon } from "@/assets/agent/modal-openai.svg"
import { FullPageLoading } from "@/components/FullPageLoading"
import { AvatarUpload } from "@/illa-public-component/Cropper"
import { AIAgentBlock } from "@/page/AIAgent/components/AIAgentBlock"
import { PreviewChat } from "@/page/AIAgent/components/PreviewChat"
import {
  aiAgentContainerStyle,
  buttonContainerStyle,
  formContainerStyle,
  labelStyle,
  labelTextStyle,
  leftPanelContainerStyle,
  leftPanelContentContainerStyle,
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
  AgentRaw,
  AgentRawInitial,
} from "@/redux/aiAgent/aiAgentState"
import { createAgent, fetchAgentDetail, putAgentDetail } from "@/services/agent"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { CodeEditor } from "../../illa-public-component/CodeMirror"

export const AIAgent: FC = () => {
  const { agentId } = useParams()

  const { control, handleSubmit } = useForm<AgentRaw>({
    mode: "onSubmit",
  })

  const [pageLoading, setPageLoading] = useState(false)
  const [currentAgent, setCurrentAgent] = useState<Agent>(AgentRawInitial)
  const [saveLoading, setSavingLoading] = useState(false)
  const message = useMessage()

  useEffect(() => {
    const controller = new AbortController()
    if (agentId !== undefined) {
      setPageLoading(true)
      fetchAgentDetail(agentId, controller.signal)
        .then((response) => {
          setCurrentAgent(response.data)
        })
        .catch(() => {
          message.error({
            content: "Get Error",
          })
        })
        .finally(() => {
          setPageLoading(false)
        })
    }
    return () => {
      controller.abort()
    }
  }, [agentId, message])

  return (
    <>
      {pageLoading && <FullPageLoading />}
      {!pageLoading && (
        <div css={aiAgentContainerStyle}>
          <form
            css={formContainerStyle}
            onSubmit={handleSubmit(async (data) => {
              setSavingLoading(true)
              try {
                if (currentAgent.aiAgentID !== "") {
                  const newAgent = await putAgentDetail(
                    currentAgent.aiAgentID,
                    data,
                  )
                  setCurrentAgent(newAgent.data)
                } else {
                  const newAgent = await createAgent(data)
                  setCurrentAgent(newAgent.data)
                }
              } catch (e) {
                if (axios.isAxiosError(e) && e.response) {
                  message.error({
                    content: "save error",
                  })
                }
              } finally {
                setSavingLoading(false)
              }
            })}
          >
            <div css={leftPanelContainerStyle}>
              <div css={leftPanelContentContainerStyle}>
                <div css={[leftPanelTitleStyle, leftPanelTitleTextStyle]}>
                  🧬 Edit tool
                </div>
                <AIAgentBlock title={"Icon"}>
                  <Controller
                    name="icon"
                    control={control}
                    defaultValue={currentAgent.icon}
                    shouldUnregister={false}
                    render={({ field }) => (
                      <AvatarUpload
                        onOk={async (file) => {
                          let reader = new FileReader()
                          reader.onload = () => {
                            field.onChange(reader.result)
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
                <AIAgentBlock title={"Name"}>
                  <Controller
                    name="name"
                    defaultValue={currentAgent.name}
                    control={control}
                    shouldUnregister={false}
                    render={({ field }) => (
                      <Input {...field} colorScheme={"techPurple"} />
                    )}
                  />
                </AIAgentBlock>
                <AIAgentBlock title={"Description"}>
                  <Controller
                    name="description"
                    control={control}
                    defaultValue={currentAgent.description}
                    shouldUnregister={false}
                    render={({ field }) => (
                      <TextArea
                        {...field}
                        minH="64px"
                        colorScheme={"techPurple"}
                      />
                    )}
                  />
                </AIAgentBlock>
                <AIAgentBlock title={"Mode"}>
                  <Controller
                    name="agentType"
                    control={control}
                    shouldUnregister={false}
                    defaultValue={currentAgent.agentType}
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
                <AIAgentBlock title={"Prompt"}>
                  <Controller
                    name="prompt"
                    control={control}
                    defaultValue={currentAgent.prompt}
                    shouldUnregister={false}
                    render={({ field }) => (
                      <CodeEditor
                        {...field}
                        minHeight="200px"
                        completionOptions={[
                          {
                            key: "hahahahahahahahahahahahahahahahahahahahahahahahahahahaha",
                            value:
                              "hahahahahahahahahahahahahahahahahahahahahahahahahahahaha",
                          },
                          { key: "aaa", value: "hhahaha" },
                          { key: "bbb", value: "hhahaha" },
                        ]}
                      />
                    )}
                  />
                </AIAgentBlock>
                <AIAgentBlock title={"Variable"}>
                  <Controller
                    name="variable"
                    control={control}
                    defaultValue={currentAgent.variable}
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
                        onChangeKey={(index, key, value) => {
                          const newVariables = [...field.value]
                          newVariables[index].key = value
                          field.onChange(newVariables)
                        }}
                        onChangeValue={(index, key, value) => {
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
                <AIAgentBlock title={"Modal"}>
                  <Controller
                    name="model"
                    control={control}
                    defaultValue={currentAgent.model}
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
                    name={"modelConfig.maxTokens"}
                    defaultValue={currentAgent.modelConfig.maxTokens}
                    control={control}
                    shouldUnregister={false}
                    render={({ field }) => (
                      <InputNumber
                        {...field}
                        colorScheme={"techPurple"}
                        mode="button"
                        min={0}
                        max={16000}
                      />
                    )}
                  />
                </AIAgentBlock>
                <AIAgentBlock title={"Temperature"}>
                  <Controller
                    name="modelConfig.temperature"
                    defaultValue={currentAgent.modelConfig.temperature}
                    control={control}
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
              <div css={buttonContainerStyle}>
                <Button
                  flexGrow="1"
                  colorScheme="grayBlue"
                  loading={saveLoading}
                >
                  Save
                </Button>
                <Button
                  flexGrow="1"
                  ml="8px"
                  colorScheme={getColor("grayBlue", "02")}
                  leftIcon={<ResetIcon />}
                >
                  Restart
                </Button>
              </div>
            </div>
          </form>
          <div css={rightPanelContainerStyle}>
            <PreviewChat />
          </div>
        </div>
      )}
    </>
  )
}

export default AIAgent

AIAgent.displayName = "AIAgent"
