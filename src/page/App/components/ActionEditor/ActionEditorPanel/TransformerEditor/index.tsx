import { forwardRef, useImperativeHandle, useContext } from "react"
import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import { selectAllActionItem } from "@/redux/currentApp/action/actionList/actionListSelector"
import { actionListActions } from "@/redux/currentApp/action/actionList/actionListSlice"
import { EditorInput } from "@/components/EditorInput"
import { triggerRunRef } from "@/page/App/components/ActionEditor/ActionEditorPanel/interface"
import { ActionEditorContext } from "@/page/App/components/ActionEditor/context"
import { TransformerEditorProps } from "./interface"
import { transformerContainerStyle, transfomerTipsStyle } from "./style"

export const TransformerEditor = forwardRef<
  triggerRunRef,
  TransformerEditorProps
>((props, ref) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { activeActionItemId } = useContext(ActionEditorContext)
  const activeActionItem = useSelector(selectAllActionItem).find(
    ({ actionId: id }) => id === activeActionItemId,
  )
  const { onChangeParam, onSaveParam } = props

  // TODO: eval transformer
  const run = () => {}

  const saveAndRun = () => {
    run()

    dispatch(
      actionListActions.updateActionItemReducer({
        ...activeActionItem,
        config: {
          ...activeActionItem?.config,
          general: "",
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
      <EditorInput
        mode="javascript"
        height={"100px"}
        placeholder={t("editor.action.resource.transformer.placeholder.tip")}
        onChange={onChangeParam}
      />
      <dd css={transfomerTipsStyle}>
        {t("editor.action.resource.transformer.tip.external_reference")}
      </dd>
    </div>
  )
})

TransformerEditor.displayName = "TransformerEditor"
