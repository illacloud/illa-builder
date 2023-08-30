import { AI_AGENT_MODEL } from "@illa-public/market-agent/MarketAgentCard/interface"
import { FC, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Input } from "@illa-design/react"
import { ReactComponent as ModalOpenAIIcon } from "@/assets/agent/modal-openai.svg"
import { CodeEditor } from "@/components/CodeEditor"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { RecordEditor } from "@/components/RecordEditor"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { AiAgentActionContent } from "@/redux/currentApp/action/aiAgentAction"
import { Params } from "@/redux/resource/restapiResource"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { AIAgentResourceChoose } from "../AIAgentResourceChoose"
import { ActionEventHandler } from "../ActionEventHandler"
import HorizontalWithLabel from "../Layout/HorizontalWithLabel"
import ActionPanelSpace from "../Layout/Space"
import { TransformerComponent } from "../TransformerComponent"

export const AI_AGENT_MODAL_TYPE_MAP_SHOW_LABEL = {
  [AI_AGENT_MODEL.GPT_3_5_TURBO]: "GPT 3.5",
  [AI_AGENT_MODEL.GPT_3_5_TURBO_16K]: "GPT 3.5-16K",
  [AI_AGENT_MODEL.GPT_4]: "GPT 4",
}

const AIAgentPanel: FC = () => {
  const currentAction = useSelector(getCachedAction)!
  const { t } = useTranslation()
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

  const variables = useMemo(() => {
    const resourcesKeys = aiAgentContent.virtualResource.variables.map(
      (item) => item.key,
    )

    let resourcesKeyValues: Record<string, string> = {}
    if (aiAgentContent.virtualResource.variables.length > 0) {
      aiAgentContent.virtualResource.variables.forEach((item) => {
        if (!item) return
        resourcesKeyValues[item.key] = item.value
      })
    }

    let currentActionKeyValues: Record<string, string> = {}

    if (aiAgentContent.variables.length > 0) {
      aiAgentContent.variables.forEach((item) => {
        if (!item) return
        currentActionKeyValues[item.key] = item.value
      })
    }

    const variable = resourcesKeys.map((item) => {
      return {
        key: item,
        value: currentActionKeyValues[item] || resourcesKeyValues[item] || "",
      }
    })
    return variable
  }, [aiAgentContent.variables, aiAgentContent.virtualResource.variables])

  return (
    <div>
      <AIAgentResourceChoose />
      <ActionPanelSpace />
      <HorizontalWithLabel labelName={t("editor.ai-agent.label.model")}>
        <Input
          prefix={<ModalOpenAIIcon />}
          colorScheme="techPurple"
          readOnly
          value={
            AI_AGENT_MODAL_TYPE_MAP_SHOW_LABEL[
              aiAgentContent.virtualResource.model
            ]
          }
        />
      </HorizontalWithLabel>
      {variables.length > 0 && (
        <RecordEditor
          fillOnly
          records={variables}
          onChangeValue={handleChangeVariableValue}
          label={t("editor.ai-agent.label.variable")}
        />
      )}
      <HorizontalWithLabel
        labelName={t("editor.action.panel.label.ai-agent.input")}
      >
        <CodeEditor
          lang={CODE_LANG.JAVASCRIPT}
          expectValueType={VALIDATION_TYPES.STRING}
          modalTitle={t("editor.action.panel.label.ai-agent.input")}
          value={aiAgentContent.input}
          onChange={handleChangeInput}
        />
      </HorizontalWithLabel>
      <TransformerComponent />
      <ActionEventHandler />
    </div>
  )
}

AIAgentPanel.displayName = "AIAgentPanel"

export default AIAgentPanel
