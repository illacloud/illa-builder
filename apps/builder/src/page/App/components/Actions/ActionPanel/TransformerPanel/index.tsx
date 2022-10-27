import { FC } from "react"
import { CodeEditor } from "@/components/CodeEditor"
import { TransformerAction } from "@/redux/currentApp/action/transformerAction"
import { useTranslation } from "react-i18next"
import {
  transformerEditorStyle,
  transformerPanelContainerStyle,
  transformerTipStyle,
} from "./style"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { Controller, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"

export const TransformerPanel: FC = (props) => {
  const { t } = useTranslation()

  const action = useSelector(getCachedAction)!!
  const content = action.content as TransformerAction

  const dispatch = useDispatch()

  return (
    <div css={transformerPanelContainerStyle}>
      <CodeEditor
        value={content.transformerString}
        css={transformerEditorStyle}
        lineNumbers
        height="88px"
        expectedType={VALIDATION_TYPES.STRING}
        mode="JAVASCRIPT"
        onChange={(value) => {
          dispatch(
            configActions.updateCachedAction({
              ...action,
              content: {
                transformerString: value,
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
