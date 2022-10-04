import { FC, useMemo } from "react"
import { useDispatch } from "react-redux"
import { configActions } from "@/redux/config/configSlice"
import { CodeEditor } from "@/components/CodeEditor"
import { TransformerAction } from "@/redux/currentApp/action/transformerAction"
import { useTranslation } from "react-i18next"
import {
  transformerEditorStyle,
  transformerPanelContainerStyle,
  transformerTipStyle,
} from "./style"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { TransformerPanelProps } from "@/page/App/components/Actions/ActionPanel/interface"

export const TransformerPanel: FC<TransformerPanelProps> = (props) => {
  const action = props.action
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const finalValue = useMemo(() => {
    return (
      action?.content?.transformerString ||
      "// Tip: assign your external references to variables instead of chaining off the curly brackets.\n" +
        "return 5"
    )
  }, [action?.content?.transformerString])

  return (
    <div css={transformerPanelContainerStyle}>
      <CodeEditor
        value={finalValue}
        css={transformerEditorStyle}
        lineNumbers
        height="88px"
        expectedType={VALIDATION_TYPES.STRING}
        mode="JAVASCRIPT"
        onChange={(value) => {
          dispatch(
            configActions.updateSelectedAction({
              ...action,
              content: {
                transformerString: value,
              } as TransformerAction,
            }),
          )
        }}
      />
      <div css={transformerTipStyle}>
        {t("editor.action.resource.transformer.tip.external_reference")}
      </div>
    </div>
  )
}

TransformerPanel.displayName = "TransformerPanel"
