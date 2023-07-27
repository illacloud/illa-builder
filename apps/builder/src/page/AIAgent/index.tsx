import { ChangeEvent, FC, RefObject, useRef } from "react"
import { Controller, useForm } from "react-hook-form"
import {
  Button,
  Input,
  InputNumber,
  RadioGroup,
  ResetIcon,
  Select,
  Slider,
  TextArea,
  getColor,
} from "@illa-design/react"
import { ReactComponent as OpenAIIcon } from "@/assets/agent/modal-openai.svg"
import { AIAgentBlock } from "@/page/AIAgent/components/AIAgentBlock"
import { PreviewChat } from "@/page/AIAgent/components/PreviewChat"
import {
  aiAgentContainerStyle,
  buttonContainerStyle,
  labelStyle,
  labelTextStyle,
  leftPanelContainerStyle,
  leftPanelContentContainerStyle,
  leftPanelTitleStyle,
  leftPanelTitleTextStyle,
  rightPanelContainerStyle,
  uploadContainerStyle,
  uploadInputStyle,
} from "@/page/AIAgent/style"
import { RecordEditor } from "@/page/App/components/Actions/ActionPanel/RecordEditor"
import { Agent } from "@/redux/aiAgent/aiAgentState"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const AIAgent: FC = () => {
  const { control, handleSubmit } = useForm<Agent>({
    mode: "onSubmit",
  })

  const uploadRef = useRef<HTMLInputElement>() as RefObject<HTMLInputElement>

  return (
    <div css={aiAgentContainerStyle}>
      <form
        onSubmit={handleSubmit(async (data) => {
          console.log(data)
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
                shouldUnregister={false}
                render={({ field }) => (
                  <div
                    css={uploadContainerStyle}
                    onClick={() => {
                      if (uploadRef.current) {
                        uploadRef.current.click()
                      }
                    }}
                  >
                    <input
                      ref={uploadRef}
                      css={uploadInputStyle}
                      type="file"
                      accept="image/*"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const files = e.target.files
                        if (!files) return
                        field.onChange(files.item(0))
                        e.target.value = ""
                      }}
                    />
                  </div>
                )}
              />
            </AIAgentBlock>
            <AIAgentBlock title={"Name"}>
              <Controller
                name="name"
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
                shouldUnregister={false}
                render={({ field }) => (
                  <TextArea {...field} minH="64px" colorScheme={"techPurple"} />
                )}
              />
            </AIAgentBlock>
            <AIAgentBlock title={"Mode"}>
              <Controller
                name="mode"
                control={control}
                shouldUnregister={false}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    colorScheme={"techPurple"}
                    defaultValue="chat"
                    w="100%"
                    type="button"
                    forceEqualWidth={true}
                    options={[
                      {
                        value: "chat",
                        label: "Chat",
                      },
                      {
                        value: "text-generation",
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
                shouldUnregister={false}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    minH="200px"
                    colorScheme={"techPurple"}
                  />
                )}
              />
            </AIAgentBlock>
            <AIAgentBlock title={"Variable"}>
              <Controller
                name="variable"
                control={control}
                shouldUnregister={false}
                defaultValue={[
                  {
                    key: "",
                    value: "",
                  },
                ]}
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
                name="modal"
                control={control}
                shouldUnregister={false}
                defaultValue={"gpt-3.5-16k"}
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
                        value: "gpt-3.5",
                      },
                      {
                        label: (
                          <div css={labelStyle}>
                            <OpenAIIcon />
                            <span css={labelTextStyle}>GPT-3.5-16k</span>
                          </div>
                        ),
                        value: "gpt-3.5-16k",
                      },
                      {
                        label: (
                          <div css={labelStyle}>
                            <OpenAIIcon />
                            <span css={labelTextStyle}>GPT-4</span>
                          </div>
                        ),
                        value: "gpt-4",
                      },
                    ]}
                  />
                )}
              />
            </AIAgentBlock>
            <AIAgentBlock title={"Max Token"}>
              <Controller
                name="maxToken"
                defaultValue={4096}
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
                name="temperature"
                defaultValue={0.5}
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
            <Button flexGrow="1" colorScheme="grayBlue">
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
  )
}

export default AIAgent

AIAgent.displayName = "AIAgent"
