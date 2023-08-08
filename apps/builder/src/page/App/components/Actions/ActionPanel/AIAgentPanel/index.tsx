import { FC, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Input, InputNumber } from "@illa-design/react"
import { ReactComponent as ModalOpenAIIcon } from "@/assets/agent/modal-openai.svg"
import { CodeEditor } from "@/components/CodeEditor"
import {
  CODE_LANG,
  CODE_TYPE,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { AI_AGENT_MODAL_TYPE_MAP_SHOW_LABEL } from "@/redux/aiAgent/aiAgentState"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { AiAgentActionContent } from "@/redux/currentApp/action/aiAgentAction"
import { Params } from "@/redux/resource/restapiResource"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import HorizontalWithLabel from "../Layout/HorizontalWithLabel"
import ActionPanelSpace from "../Layout/Space"
import { RecordEditor } from "../RecordEditor"
import { ResourceChoose } from "../ResourceChoose"
import { TransformerComponent } from "../TransformerComponent"
import { maxTokenInputStyle } from "./style"

const AIAgentPanel: FC = () => {
  const currentAction = useSelector(getCachedAction)!
  const dispatch = useDispatch()

  const aiAgentContent = currentAction.content as AiAgentActionContent

  const handleChangeInput = useCallback(
    (value: string) => {
      dispatch(
        configActions.updateCachedAction({
          ...currentAction,
          content: {
            ...aiAgentContent,
            input: value,
          },
        }),
      )
    },
    [currentAction, dispatch, aiAgentContent],
  )

  const handleChangeVariableValue = useCallback(
    (index: number, key: string, value: string) => {
      let newList: Params[] = [...aiAgentContent.variables]
      newList[index] = { key, value }
      dispatch(
        configActions.updateCachedAction({
          ...currentAction,
          content: {
            ...aiAgentContent,
            variables: newList,
          },
        }),
      )
    },
    [aiAgentContent, currentAction, dispatch],
  )

  return (
    <div>
      <ResourceChoose />
      <ActionPanelSpace />
      <HorizontalWithLabel labelName="Model">
        <Input
          prefix={<ModalOpenAIIcon />}
          colorScheme="techPurple"
          readOnly
          value={
            AI_AGENT_MODAL_TYPE_MAP_SHOW_LABEL[aiAgentContent.aiAgentModel]
          }
        />
      </HorizontalWithLabel>
      <RecordEditor
        fillOnly
        records={aiAgentContent.variables}
        onChangeValue={handleChangeVariableValue}
        label="Variable"
      />
      <HorizontalWithLabel labelName="Input">
        <CodeEditor
          lang={CODE_LANG.JAVASCRIPT}
          expectValueType={VALIDATION_TYPES.STRING}
          modalTitle="Input"
          codeType={CODE_TYPE.NO_METHOD_FUNCTION}
          canShowCompleteInfo
          value={aiAgentContent.input}
          onChange={handleChangeInput}
        />
      </HorizontalWithLabel>
      <HorizontalWithLabel labelName="Max Token">
        <InputNumber
          readOnly
          value={aiAgentContent.maxTokens}
          mode="button"
          colorScheme="techPurple"
          size="large"
          w="320px"
          css={maxTokenInputStyle}
        />
      </HorizontalWithLabel>
      <TransformerComponent />
    </div>
  )
}

AIAgentPanel.displayName = "AIAgentPanel"

export default AIAgentPanel
