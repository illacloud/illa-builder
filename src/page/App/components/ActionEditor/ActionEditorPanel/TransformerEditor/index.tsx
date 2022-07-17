import { FC, useContext } from "react"
import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import { configActions } from "@/redux/config/configSlice"
import { getSelectedAction } from "@/redux/config/configSelector"
import { CodeEditor } from "@/components/CodeEditor"
import { ActionEditorContext } from "@/page/App/components/ActionEditor/context"
import { TransformerEditorProps } from "./interface"
import { transformerContainerStyle, transfomerTipsStyle } from "./style"

export const TransformerEditor: FC<TransformerEditorProps> = () => {
  const { t } = useTranslation()
  const { setIsActionDirty } = useContext(ActionEditorContext)
  const dispatch = useDispatch()
  const activeActionItem = useSelector(getSelectedAction)
  const transformer = activeActionItem.actionTemplate?.transformer ?? ""

  return (
    <div css={transformerContainerStyle}>
      <CodeEditor
        mode="JAVASCRIPT"
        expectedType="String"
        height={"100px"}
        value={transformer}
        placeholder={t("editor.action.resource.transformer.placeholder.tip")}
        lineNumbers
        onChange={(value) => {
          setIsActionDirty?.(true)
          dispatch(
            configActions.updateSelectedAction({
              ...activeActionItem,
              actionTemplate: {
                ...activeActionItem.actionTemplate,
                transformer: value,
              },
            }),
          )
        }}
      />
      <dd css={transfomerTipsStyle}>
        {t("editor.action.resource.transformer.tip.external_reference")}
      </dd>
    </div>
  )
}

TransformerEditor.displayName = "TransformerEditor"
