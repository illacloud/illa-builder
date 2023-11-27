import { TransformerAction } from "@illa-public/public-types"
import { FC, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { CodeEditor } from "@/components/CodeEditor"
import {
  CODE_LANG,
  CODE_TYPE,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import {
  realInputValueWithScript,
  wrapperScriptCode,
} from "@/utils/evaluateDynamicString/valueConverter"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { transformerPanelContainerStyle, transformerTipStyle } from "./style"

const TransformerPanel: FC = () => {
  const { t } = useTranslation()

  const action = useSelector(getCachedAction)!!
  const content = action.content as TransformerAction

  const dispatch = useDispatch()

  const realInputValue = useMemo(() => {
    return realInputValueWithScript(content.transformerString)
  }, [content.transformerString])

  return (
    <div css={transformerPanelContainerStyle}>
      <CodeEditor
        value={realInputValue}
        showLineNumbers
        canShowCompleteInfo
        height="88px"
        expectValueType={VALIDATION_TYPES.STRING}
        lang={CODE_LANG.JAVASCRIPT}
        codeType={CODE_TYPE.NO_METHOD_FUNCTION}
        onChange={(value) => {
          dispatch(
            configActions.updateCachedAction({
              ...action,
              content: {
                transformerString: wrapperScriptCode(value),
              },
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
export default TransformerPanel
