import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Input, InputNumber } from "@illa-design/react"
import { ReactComponent as ModalOpenAIIcon } from "@/assets/agent/modal-openai.svg"
import { CodeEditor } from "@/components/CodeEditor"
import {
  CODE_LANG,
  CODE_TYPE,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { RecordEditor } from "@/components/RecordEditor"
import { AI_AGENT_MODAL_TYPE_MAP_SHOW_LABEL } from "@/redux/aiAgent/aiAgentState"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { BaseAiAgentActionContent } from "@/redux/currentApp/action/aiAgentAction"
import { Params } from "@/redux/resource/restapiResource"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { AIAgentResourceChoose } from "../AIAgentResourceChoose"
import { ActionEventHandler } from "../ActionEventHandler"
import HorizontalWithLabel from "../Layout/HorizontalWithLabel"
import ActionPanelSpace from "../Layout/Space"
import { TransformerComponent } from "../TransformerComponent"
import { maxTokenInputStyle } from "./style"

const AIAgentPanel: FC = () => {
  const currentAction = useSelector(getCachedAction)!
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const aiAgentContent = currentAction.content as BaseAiAgentActionContent

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
      <AIAgentResourceChoose />
      <ActionPanelSpace />
      <HorizontalWithLabel labelName={t("editor.ai-agent.label.model")}>
        <Input
          prefix={<ModalOpenAIIcon />}
          colorScheme="techPurple"
          readOnly
          value={AI_AGENT_MODAL_TYPE_MAP_SHOW_LABEL[aiAgentContent.model]}
        />
      </HorizontalWithLabel>
      <RecordEditor
        fillOnly
        records={aiAgentContent.variables}
        onChangeValue={handleChangeVariableValue}
        label={t("editor.ai-agent.label.variable")}
      />
      <HorizontalWithLabel
        labelName={t("editor.action.panel.label.ai-agent.input")}
      >
        <CodeEditor
          lang={CODE_LANG.JAVASCRIPT}
          expectValueType={VALIDATION_TYPES.STRING}
          modalTitle={t("editor.action.panel.label.ai-agent.input")}
          codeType={CODE_TYPE.NO_METHOD_FUNCTION}
          canShowCompleteInfo
          value={aiAgentContent.input}
          onChange={handleChangeInput}
        />
      </HorizontalWithLabel>
      <HorizontalWithLabel labelName={t("editor.ai-agent.label.max-token")}>
        <InputNumber
          readOnly
          value={aiAgentContent.modelConfig.maxTokens}
          mode="button"
          colorScheme="techPurple"
          size="large"
          w="320px"
          css={maxTokenInputStyle}
        />
      </HorizontalWithLabel>
      <TransformerComponent />
      <ActionEventHandler />
    </div>
  )
}

AIAgentPanel.displayName = "AIAgentPanel"

export default AIAgentPanel
