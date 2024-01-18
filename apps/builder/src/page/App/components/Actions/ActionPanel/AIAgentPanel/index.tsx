import { getLLM } from "@illa-public/market-agent"
import { AiAgentActionContent, Params } from "@illa-public/public-types"
import { FC, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Input } from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { RecordEditor } from "@/components/RecordEditor"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import HorizontalWithLabel from "../Layout/HorizontalWithLabel"
import { TransformerComponent } from "../TransformerComponent"

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
    const resourcesKeys = (aiAgentContent.virtualResource?.variables ?? []).map(
      (item) => item.key,
    )

    let resourcesKeyValues: Record<string, string> = {}
    if ((aiAgentContent.virtualResource?.variables ?? []).length > 0) {
      ;(aiAgentContent.virtualResource?.variables ?? []).forEach((item) => {
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
  }, [aiAgentContent.variables, aiAgentContent.virtualResource?.variables])

  return (
    <div>
      {aiAgentContent.virtualResource && (
        <HorizontalWithLabel labelName={t("editor.ai-agent.label.model")}>
          <Input
            prefix={getLLM(aiAgentContent.virtualResource.model)?.logo}
            colorScheme="techPurple"
            readOnly
            value={getLLM(aiAgentContent.virtualResource.model)?.name}
          />
        </HorizontalWithLabel>
      )}
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
    </div>
  )
}

AIAgentPanel.displayName = "AIAgentPanel"

export default AIAgentPanel
