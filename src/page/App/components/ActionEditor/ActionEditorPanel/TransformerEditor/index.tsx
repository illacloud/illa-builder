import { forwardRef, useImperativeHandle } from "react"
import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import { getSelectedAction } from "@/redux/config/configSelector"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { CodeEditor } from "@/components/CodeEditor"
import { triggerRunRef } from "@/page/App/components/ActionEditor/ActionEditorPanel/interface"
import { TransformerEditorProps } from "./interface"
import { transformerContainerStyle, transfomerTipsStyle } from "./style"

export const TransformerEditor = forwardRef<
  triggerRunRef,
  TransformerEditorProps
>((props, ref) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const activeActionItem = useSelector(getSelectedAction)

  const { onChangeParam, onSaveParam } = props

  // TODO: eval transformer
  const run = () => {}

  const saveAndRun = () => {
    run()

    dispatch(
      actionActions.updateActionItemReducer({
        ...activeActionItem,
        actionTemplate: {
          ...activeActionItem?.actionTemplate,
          transformer: "",
        },
      }),
    )

    onSaveParam && onSaveParam()
  }

  useImperativeHandle(ref, () => {
    return { run, saveAndRun }
  })

  return (
    <div css={transformerContainerStyle}>
      <CodeEditor
        mode="JAVASCRIPT"
        expectedType="String"
        height={"100px"}
        placeholder={t("editor.action.resource.transformer.placeholder.tip")}
        onChange={onChangeParam}
        lineNumbers
      />
      <dd css={transfomerTipsStyle}>
        {t("editor.action.resource.transformer.tip.external_reference")}
      </dd>
    </div>
  )
})

TransformerEditor.displayName = "TransformerEditor"
